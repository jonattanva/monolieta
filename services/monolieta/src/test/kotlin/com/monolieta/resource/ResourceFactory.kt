package com.monolieta.resource

import com.monolieta.project.ProjectFactory
import com.monolieta.starter.test.Factory
import org.springframework.mock.web.MockMultipartFile
import org.springframework.stereotype.Component
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart
import java.io.FileInputStream
import java.nio.file.Path

@Component
internal class ResourceFactory(
    private val projectFactory: ProjectFactory,
    private val resourceService: ResourceService,
    private val resourceRepository: ResourceRepository
) : Factory<Resource, List<Resource>>() {

    override fun definition(): Resource {
        val project = projectFactory.definition()
        return Resource(
            id = null,
            name = "202cb962ac59075b964b07152d234b70",
            size = 10,
            type = "image/png",
            path = "/resources/202cb962ac59075b964b07152d234b70.png",
            project = project
        )
    }

    override fun cleanup() {
        resourceRepository.deleteAll()
        projectFactory.cleanup()
    }

    override fun make(entity: Resource): List<Resource> {
        val path = Path.of("src/test/resources/dataset.zip")
            .toFile()
        val input = FileInputStream(path)

        val file = MockMultipartFile(
            "files", "dataset.zip", "application/zip", input
        )

        val project = projectFactory.make(entity.project)
        entity.project.id = project.id

        return resourceService.upload(entity.project, file.inputStream)
    }
}