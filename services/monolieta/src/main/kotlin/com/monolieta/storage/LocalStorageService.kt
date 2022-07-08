package com.monolieta.storage

import com.monolieta.domain.File
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.InputStream
import java.nio.file.Files
import java.nio.file.Path

@Service("LocalService")
class LocalStorageService : StorageService() {

    private val logger: Logger = LoggerFactory.getLogger(LocalStorageService::class.java)

    @Value("\${monolieta.location:/var/tmp}")
    private var location: String = "/var/tmp"

    override fun exists(name: String): Boolean {
        try {
            if (name.isNotEmpty()) {
                return Files.exists(Path.of("$location/$name"))
            }
            return false
        } catch (exception: Exception) {
            logger.error("The file does not exists ($name)", exception)
            return false
        }
    }

    override fun createFolder(name: String): Boolean {
        return try {
            if (name.isEmpty()) {
                throw Exception("The folder name is required")
            }

            if (exists(name)) {
                throw Exception("The folder name already exists")
            }

            Files.createDirectory(Path.of("$location/$name"))
            true
        } catch (exception: Exception) {
            logger.error("Could not create folder ($name)", exception)
            false
        }
    }

    override fun upload(folder: String, inputStream: InputStream): File {
        try {
            val stream = copy(inputStream)
            val type = getContentType(stream)
                ?: throw Exception("Could not determine the content type")

            val extension = getExtension(type)
                ?: throw Exception("Could not determine the extension")

            val hash = generateHash()
            val size = stream.length

            val name = "$hash$extension"
            val path = "$folder/$name"

            Files.copy(stream, Path.of("$location/$path"))
            stream.close()

            return File(
                name = name,
                size = size,
                type = type,
                path = path
            )
        } catch (exception: Exception) {
            logger.error("Could not upload the file", exception)
            throw exception
        }
    }
}