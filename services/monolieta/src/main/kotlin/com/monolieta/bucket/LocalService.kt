package com.monolieta.bucket

import com.monolieta.starter.extension.normalize
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.InputStream
import java.nio.file.Files
import java.nio.file.Path

@Service("LocalService")
class LocalService : BucketService() {

    private val logger: Logger = LoggerFactory.getLogger(LocalService::class.java)

    @Value("\${monolieta.location:/var/tmp}")
    private var location: String = "/var/tmp"

    override fun exists(name: String): Boolean {
        return try {
            Files.exists(Path.of("$location/$name"))
        } catch (exception: Exception) {
            logger.error("The file does not exists ($name)", exception)
            false
        }
    }

    override fun createBucket(name: String): Boolean {
        try {
            if (name.isNotEmpty()) {
                Files.createDirectory(Path.of("$location/$name"))
                return true
            }
            return false
        } catch (exception: Exception) {
            logger.error("Could not create folder ($name)", exception)
            return false
        }
    }

    override fun upload(bucket: String, input: InputStream) {
        try {
            val name = generateNewName()
            Files.copy(input, Path.of("$location/$bucket/$name"))
        } catch (exception: Exception) {
            logger.error("Could not upload the file", exception)
        }
    }
}