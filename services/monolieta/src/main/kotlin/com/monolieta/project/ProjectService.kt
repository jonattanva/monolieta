package com.monolieta.project

import com.monolieta.starter.extension.md5
import com.monolieta.starter.extension.normalize
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*
import javax.validation.Valid

@Validated
@Service(value = "ProjectService")
@Transactional(propagation = Propagation.MANDATORY)
class ProjectService(
    private val projectRepository: ProjectRepository
) {
    @Transactional(propagation = Propagation.REQUIRED)
    fun save(@Valid project: Project): Project {
        project.path = project.path.normalize()
        project.updated = if (project.id != null) {
            LocalDateTime.now()
        } else null

        return projectRepository.save(project)
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    fun findByNamespaceAndProject(namespace: String, project: String): Project? {
        return if (namespace.isNotEmpty() && project.isNotEmpty()) {
            projectRepository.findByNamespaceAndProject(namespace, project)
        } else null
    }

    @Transactional(propagation = Propagation.NEVER)
    fun generateKey(): String {
        val key = UUID.randomUUID().toString()
        val now = LocalDateTime.now()
            .atZone(ZoneId.systemDefault())
            .toInstant()
            .toEpochMilli()

        return "${key}-${now}".md5()
    }
}