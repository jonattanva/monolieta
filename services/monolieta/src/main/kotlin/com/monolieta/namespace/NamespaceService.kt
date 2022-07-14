package com.monolieta.namespace

import com.monolieta.starter.extension.normalize
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import java.time.LocalDateTime
import javax.validation.Valid

@Validated
@Service(value = "NamespaceService")
@Transactional(propagation = Propagation.MANDATORY)
class NamespaceService(
    private val namespaceRepository: NamespaceRepository
) {
    @Transactional(propagation = Propagation.REQUIRED)
    fun save(@Valid namespace: Namespace): Namespace {
        namespace.path = namespace.path.normalize()
        namespace.updated = if (namespace.id != null) {
            LocalDateTime.now()
        } else null

        return namespaceRepository.save(namespace)
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    fun current(): Namespace? {
        return namespaceRepository.current(1L)
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    fun findBy(namespace: String): Namespace? {
        return if (namespace.isNotEmpty()) {
            namespaceRepository.findBy(namespace = namespace)
        } else null
    }
}