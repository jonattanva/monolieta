package com.monolieta.namespace

import com.monolieta.starter.test.Factory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
internal class NamespaceFactory @Autowired constructor(
    private val namespaceService: NamespaceService,
    private val namespaceRepository: NamespaceRepository
) : Factory<Namespace, Namespace>() {

    override fun make(entity: Namespace): Namespace {
        return namespaceService.save(entity)
    }

    override fun definition(): Namespace {
        return Namespace(
            id = null,
            name = "Monolieta",
            path = "Monolieta",
            description = "This is a description",
            owner = 1
        )
    }

    override fun cleanup() {
        namespaceRepository.deleteAll()
    }
}