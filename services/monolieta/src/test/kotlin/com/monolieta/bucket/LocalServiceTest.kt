package com.monolieta.bucket

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class LocalServiceTest {

    private lateinit var localService: LocalService

    @BeforeEach
    fun setUp() {
        localService = LocalService()
    }

    @Test
    fun `create new bucket`() {
        assertNotNull(localService)

        localService.createBucket("resources")
        assertTrue(localService.exists("resources"))
    }

    @Test
    fun `create new bucket with invalid name`() {
        assertNotNull(localService)

        localService.createBucket("")
        assertFalse(localService.exists(""))
    }
}
