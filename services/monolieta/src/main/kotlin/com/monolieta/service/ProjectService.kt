package com.monolieta.service

import com.monolieta.entity.Project
import com.monolieta.repository.ProjectRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import java.text.Normalizer
import java.time.LocalDateTime
import javax.validation.Valid

@Validated
@Service(value = "ProjectService")
@Transactional(propagation = Propagation.MANDATORY)
class ProjectService(
    private val projectRepository: ProjectRepository
) {

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    fun findById(id: Long): Project? = projectRepository.findById(id)
        .orElse(null)

    @Transactional(propagation = Propagation.REQUIRED)
    fun save(@Valid project: Project): Project {
        project.path = prepare(project.path)
        project.updated = if (project.id != null) {
            LocalDateTime.now()
        } else null

        return projectRepository.save(project)
    }

    private fun prepare(path: String): String {
        val result = path.filter {
            it.isLetterOrDigit() || it.isWhitespace()
        }.lowercase()

        return Normalizer.normalize(result, Normalizer.Form.NFD)
            .replace("[^\\p{ASCII}]", "")
            .replace("\\s", "-")
    }
}