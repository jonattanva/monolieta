package com.monolieta.service

import com.monolieta.entity.Project
import com.monolieta.repository.ProjectRepository
import org.springframework.stereotype.Service

@Service(value = "ProjectService")
class ProjectService(
    private val projectRepository: ProjectRepository
) {
    fun findById(id: Long): Project? = projectRepository.findById(id).orElseGet(null)
}