package com.monolieta.project

import com.monolieta.backbone.extension.normalize
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import java.time.LocalDateTime
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
}