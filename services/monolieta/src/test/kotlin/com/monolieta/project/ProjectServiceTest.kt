package com.monolieta.project

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.mockito.Mockito.mock
import java.util.*

internal class ProjectServiceTest {

    private lateinit var projectService: ProjectService
    private lateinit var projectRepository: ProjectRepository

    @BeforeEach
    fun setUp() {
        projectRepository = mock(ProjectRepository::class.java)
        projectService = ProjectService(projectRepository = projectRepository)
    }
}
