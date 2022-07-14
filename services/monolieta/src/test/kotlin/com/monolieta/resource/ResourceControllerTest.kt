package com.monolieta.resource

import com.monolieta.Application
import com.monolieta.namespace.Namespace
import com.monolieta.namespace.NamespaceRepository
import com.monolieta.project.Project
import com.monolieta.project.ProjectRepository
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.mock.web.MockMultipartFile
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import java.io.FileInputStream
import java.nio.file.Path

@SpringBootTest(
    classes = [Application::class],
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ExtendWith(SpringExtension::class)
internal class ResourceControllerTest {

    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var webApplicationContext: WebApplicationContext

    @Autowired
    private lateinit var namespaceRepository: NamespaceRepository

    @Autowired
    private lateinit var projectRepository: ProjectRepository

    @Autowired
    private lateinit var resourceRepository: ResourceRepository

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .build()
    }

    @AfterEach
    fun cleanup() {
        resourceRepository.deleteAll()
        projectRepository.deleteAll()
        namespaceRepository.deleteAll()
    }

    @Test
    fun `upload empty files`() {
        val namespace = createNamespace()
        val project = createProject(namespace)

        mockMvc.perform(multipart("/resource/${namespace.name}/${project.name}"))
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("You must attach one or more files"))
    }

    @Test
    fun `temporal sad`() {
        val namespace = createNamespace()
        val project = createProject(namespace)

        val input = FileInputStream(
            Path.of("src/test/resources/dataset.zip")
                .toFile()
        )

        val file = MockMultipartFile(
            "files", "dataset.zip", "application/zip", input
        )

        mockMvc.perform(multipart("/resource/${namespace.name}/${project.name}")
            .file(file))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("New resource have been added"))


        mockMvc.perform(get("/resource/${namespace.name}/${project.name}"))
            .andDo(MockMvcResultHandlers.print())
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }

    @Test
    fun `upload zip file`() {
        val namespace = createNamespace()
        val project = createProject(namespace)

        val input = FileInputStream(
            Path.of("src/test/resources/dataset.zip")
                .toFile()
        )

        val file = MockMultipartFile(
            "files", "dataset.zip", "application/zip", input
        )

        mockMvc.perform(multipart("/resource/${namespace.name}/${project.name}")
            .file(file))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("New resource have been added"))
    }

    @Test
    fun `upload not found`() {
        val input = FileInputStream(
            Path.of("src/test/resources/dataset.zip")
                .toFile()
        )

        val file = MockMultipartFile(
            "files", "dataset.zip", "application/zip", input
        )

        mockMvc.perform(multipart("/resource/namespace/project")
            .file(file))
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project does not exist"))
    }

    private fun createNamespace(): Namespace {
        return namespaceRepository.save(
            Namespace(
                id = null,
                name = "monolieta",
                path = "monolieta",
                owner = 1
            )
        )
    }

    private fun createProject(namespace: Namespace): Project {
        return projectRepository.save(
            Project(
                id = null,
                namespace = namespace,
                key = "123456789",
                name = "edge",
                path = "edge"
            )
        )
    }

}