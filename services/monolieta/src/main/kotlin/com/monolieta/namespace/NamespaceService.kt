package com.monolieta.namespace

import com.monolieta.backbone.extension.normalize
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import java.time.LocalDateTime

@Validated
@Service(value = "NamespaceService")
@Transactional(propagation = Propagation.MANDATORY)
class NamespaceService(
    private val namespaceRepository: NamespaceRepository
) {
    @Transactional(propagation = Propagation.REQUIRED)
    fun save(namespace: Namespace): Namespace {
        namespace.path = namespace.path.normalize()
        namespace.updated = if (namespace.id != null) {
            LocalDateTime.now()
        } else null

        return namespaceRepository.save(namespace)
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    fun findByPath(path: String): Namespace? = namespaceRepository.findByPath(path)
}