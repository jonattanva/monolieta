package com.monolieta.service

import com.monolieta.entity.Project
import com.monolieta.repository.ProjectRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.mockito.Mockito.mock
import java.util.*

internal class ProjectServiceTest {

    private lateinit var projectService: ProjectService
    private lateinit var projectRepository: ProjectRepository

    @BeforeAll
    fun setUp() {
        projectRepository = mock(ProjectRepository::class.java)
        projectService = ProjectService(projectRepository = projectRepository)
    }

    @Test
    fun `find by id`() {
        assertNotNull(projectService)
        assertNotNull(projectRepository)

        val project = Project(
            id = 1,
            name = "The demo",
            path = "the-demo"
        )

        given(projectRepository.findById(1))
            .willReturn(Optional.of(project))

        val result = projectService.findById(1)
        assertNotNull(result)
        assertEquals(1, result!!.id)
        assertEquals("The demo", result.name)
        assertEquals("the-demo", result.path)
        assertFalse(result.archived)
    }

    @Test
    fun `find by id is null`() {
        assertNotNull(projectService)
        assertNotNull(projectRepository)

        given(projectRepository.findById(1))
            .willReturn(Optional.empty())

        assertNull(projectService.findById(1))
    }

    @Test
    fun `create new project`() {
        assertNotNull(projectService)
        assertNotNull(projectRepository)
    }
}
