package com.monolieta.storage

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Value
import java.io.FileInputStream
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.exists

internal class LocalStorageServiceTest {

    companion object {
        const val image = "001.jpeg"
        const val folder = "resources"
    }

    @Value("\${monolieta.location:/var/tmp}")
    private var location: String = "/var/tmp"

    private lateinit var localStorageService: LocalStorageService

    @BeforeEach
    fun setUp() {
        localStorageService = LocalStorageService()
    }

    @AfterEach
    fun cleanup() {
        val path = Path.of("$location/$folder")
        if (path.exists()) {
            Files.walk(Path.of("$location/$folder"))
                .sorted(Comparator.reverseOrder())
                .forEach { Files.deleteIfExists(it) }
        }
    }

    @Test
    fun `create new folder`() {
        assertNotNull(localStorageService)
        assertTrue(localStorageService.createFolder(folder))
    }

    @Test
    fun `create new folder with invalid name`() {
        assertNotNull(localStorageService)
        assertFalse(localStorageService.createFolder(""))
    }

    @Test
    fun `create existing folder`() {
        assertNotNull(localStorageService)

        assertTrue(localStorageService.createFolder(folder))
        assertFalse(localStorageService.createFolder(folder))
    }

    @Test
    fun `the folder exists`() {
        assertNotNull(localStorageService)

        assertTrue(localStorageService.createFolder(folder))
        assertTrue(localStorageService.exists(folder))
    }

    @Test
    fun `the file does not exists`() {
        assertNotNull(localStorageService)

        assertFalse(localStorageService.exists(""))
        assertFalse(localStorageService.exists("temp"))
    }

    @Test
    fun `upload file`() {
        assertNotNull(localStorageService)
        localStorageService.createFolder(folder)

        val inputStream = FileInputStream(
            Path.of("src/test/resources/$image")
                .toFile()
        )
        val result = localStorageService.upload(folder, inputStream)

        assertTrue(result.name.contains(".jpg"))
        assertEquals(result.type?.toString(), "image/jpeg")
        assertEquals(result.size, 20375)
        assertTrue(result.path.contains(folder))
    }
}