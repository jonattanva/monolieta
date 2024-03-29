package com.monolieta.storage

import org.apache.tika.config.TikaConfig
import org.apache.tika.io.TikaInputStream
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

abstract class StorageService {

    private val config = TikaConfig.getDefaultConfig()
    private val encrypt = MessageDigest.getInstance("MD5")

    abstract fun exists(name: String): Boolean

    abstract fun createFolder(name: String): Boolean

    abstract fun upload(folder: String, inputStream: InputStream): Storage

    fun getContentType(inputStream: InputStream): MediaType? {
        return config.mimeRepository.detect(inputStream, Metadata())
    }

    fun getExtension(mediaType: MediaType): String? {
        return config.mimeRepository.forName(mediaType.toString()).extension
    }

    fun copy(inputStream: InputStream): TikaInputStream {
        return TikaInputStream.get(inputStream)
    }

    fun generateHash(): String {
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

    fun isZip(multipartFile: MultipartFile): Boolean = isZip(multipartFile.inputStream)

    fun isZip(inputStream: InputStream): Boolean {
        try {
            val zipInputStream = ZipInputStream(inputStream)
            if (zipInputStream.nextEntry == null) {
                zipInputStream.close()
                return false
            }
            zipInputStream.close()
            return true
        } catch (exception: Exception) {
            return false
        }
    }

    fun extract(multipartFile: MultipartFile): MutableList<InputStream> = extract(multipartFile.inputStream)

    fun extract(inputStream: InputStream): MutableList<InputStream> {
        val inputs = mutableListOf<InputStream>()
        ZipInputStream(inputStream).use {
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