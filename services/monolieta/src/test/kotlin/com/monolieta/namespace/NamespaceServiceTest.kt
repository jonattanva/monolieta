package com.monolieta.namespace

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.mockito.Mockito.mock

internal class NamespaceServiceTest {

    private lateinit var namespaceRepository: NamespaceRepository
    private lateinit var namespaceService: NamespaceService

    @BeforeEach
    fun setUp() {
        namespaceRepository = mock(NamespaceRepository::class.java)
        namespaceService = NamespaceService(namespaceRepository)
    }

    @Test
    fun `create new namespace`() {
        assertNotNull(namespaceService)
        assertNotNull(namespaceRepository)

        val namespace = Namespace(
            id = null,
            name = "monolieta",
            path = "Monolieta",
            description = "the example namespace",
            owner = 1
        )

        given(namespaceRepository.save(namespace)).willReturn(
            Namespace(
                id = 34,
                name = "monolieta",
                path = "monolieta",
                description = "the example namespace",
                owner = 1
            )
        )

        namespace.path = "Monolieta"
        val result = namespaceService.save(namespace)

        assertNotNull(result)
        assertEquals(34, result.id)
    }

    @Test
    fun `update namespaces`() {
        assertNotNull(namespaceService)
        assertNotNull(namespaceRepository)

        val namespace = Namespace(
            id = 1,
            name = "monolieta",
            path = "monolieta",
            description = "the example namespace",
            owner = 1
        )

        given(namespaceRepository.save(namespace)).willReturn(
            Namespace(
                id = 1,
                name = "monolieta",
                path = "monolieta",
                description = "the example namespace",
                owner = 1
            )
        )

        namespace.path = "Monolieta"
        val result = namespaceService.save(namespace)

        assertNotNull(result)
        assertEquals(1, result.id)
    }

    @Test
    fun `get namespace`() {
        assertNotNull(namespaceService)
        assertNotNull(namespaceRepository)

        given(namespaceRepository.getNamespace(1L)).willReturn(
            Namespace(
                id = 1,
                name = "monolieta",
                path = "monolieta",
                description = "the example namespace",
                owner = 1
            )
        )

        val result = namespaceService.getNamespace()
        assertNotNull(result)
        assertEquals(1, result!!.id)
    }
}