package com.monolieta.project

import com.monolieta.namespace.NamespaceFactory
import com.monolieta.starter.test.Factory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
internal class ProjectFactory @Autowired constructor(
    private val projectService: ProjectService,
    private val namespaceFactory: NamespaceFactory,
    private val projectRepository: ProjectRepository,
) : Factory<Project>() {

    override fun definition(): Project {
        return Project(
            id = null,
            key = "key",
            name = "edge",
            path = "edge",
            description = "This is a description",
            namespace = namespaceFactory.definition()
        )
    }

    override fun cleanup() {
        projectRepository.deleteAll()
        namespaceFactory.cleanup()
    }

    override fun make(entity: Project): Project {
        val namespace = namespaceFactory.create(entity.namespace)
        entity.namespace.id = namespace.id

        return projectService.save(entity)
    }
}