package com.monolieta.bucket

import org.apache.tika.detect.DefaultDetector
import org.apache.tika.detect.Detector
import org.apache.tika.metadata.Metadata
import org.apache.tika.mime.MediaType
import org.springframework.web.multipart.MultipartFile
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.math.BigInteger
import java.security.MessageDigest
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream

abstract class BucketService {

    private val encrypt = MessageDigest.getInstance("MD5")

    abstract fun exists(name: String): Boolean

    abstract fun createBucket(name: String): Boolean

    abstract fun upload(bucket: String, input: InputStream)

    fun getContentType(inputStream: InputStream): MediaType? {
        val metadata = Metadata()

        val detector: Detector = DefaultDetector()
        return detector.detect(inputStream, metadata)
    }

    fun generateNewName(): String {
        val random = Random().nextLong()
        val now = LocalDateTime.now()
            .atZone(ZoneId.systemDefault())
            .toInstant()
            .toEpochMilli()

        val name = "${now + random}"
        val magnitude = encrypt.digest(name.toByteArray(Charsets.UTF_8))

        return String.format("%032x", BigInteger(1, magnitude))
    }

    fun isImage(type: String): Boolean {
        return when (type) {
            "image/png", "image/jpeg" -> true
            else -> false
        }
    }

    fun isZip(multipartFile: MultipartFile): Boolean {
        try {
            val inputStream = ZipInputStream(multipartFile.inputStream)
            if (inputStream.nextEntry == null) {
                inputStream.close()
                return false
            }
            inputStream.close()
            return true
        } catch (exception: Exception) {
            return false
        }
    }

    fun extract(file: MultipartFile): MutableList<InputStream> {
        val inputs = mutableListOf<InputStream>()
        ZipInputStream(file.inputStream).use {
            var entry: ZipEntry? = it.nextEntry
            while (entry != null) {
                if (!entry.isDirectory && !isIgnoreFile(entry)) {
                    ByteArrayOutputStream().use { out ->
                        it.transferTo(out)
                        ByteArrayInputStream(out.toByteArray()).use { input ->
                            inputs.add(input)
                        }
                    }
                }
                entry = it.nextEntry
            }
        }
        return inputs
    }

    private fun isIgnoreFile(entry: ZipEntry): Boolean {
        return entry.name.indexOf("__MACOSX") != -1
            || entry.name.indexOf(".DS_Store") != -1
    }
}