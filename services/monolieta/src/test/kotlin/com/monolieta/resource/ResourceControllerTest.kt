package com.monolieta.resource

import com.monolieta.Application
import com.monolieta.namespace.NamespaceRepository
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
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

    private lateinit var request: MockMvc

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
        request = MockMvcBuilders.webAppContextSetup(webApplicationContext)
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
        createNewNamespace()
        createNewProject()

        val builder = multipart("/resource/monolieta/edge")

        request.perform(builder)
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("You must attach one or more files"))
    }

    @Test
    fun `upload zip file`() {
        createNewNamespace()
        createNewProject()

        val path = Path.of("src/test/resources/dataset.zip")
            .toFile()
        val input = FileInputStream(path)

        val file = MockMultipartFile("files", "dataset.zip", "application/zip", input)
        val builder = multipart("/resource/monolieta/edge")
            .file(file)

        request.perform(builder)
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("New resource have been added"))
    }

    @Test
    fun `upload not found`() {
        val path = Path.of("src/test/resources/dataset.zip").toFile()
        val input = FileInputStream(path)

        val file = MockMultipartFile("files", "dataset.zip", "application/zip", input)
        val builder = multipart("/resource/namespace/project")
            .file(file)

        request.perform(builder)
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project does not exist"))
    }

    @Test
    fun paginate() {
        createNewNamespace()
        createNewProject()
        createNew()

        request.perform(get("/resource/monolieta/edge"))
            .andDo(MockMvcResultHandlers.print())
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.length()").value(8))
            .andExpect(jsonPath("$.previous").value(null))
            .andExpect(jsonPath("$.next").value(null))
    }

    private fun createNew(namespace: String = "monolieta", project: String = "edge") {
        val path = Path.of("src/test/resources/dataset.zip")
            .toFile()
        val input = FileInputStream(path)

        val file = MockMultipartFile("files", "dataset.zip", "application/zip", input)
        val builder = multipart("/resource/${namespace}/${project}").file(file)

        request.perform(builder)
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("New resource have been added"))
    }

    private fun createNewNamespace(name: String = "Monolieta") {
        val json = """{
            "name": "$name",
            "path": "$name",
            "description": "The description..."
        }""".trimMargin()

        val builder = MockMvcRequestBuilders.post("/namespace")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isCreated)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }

    private fun createNewProject(name: String = "edge") {
        val json = """{ 
            "name": "$name",
            "path": "$name",
            "description": "The description..."
        }""".trimIndent()

        val builder = MockMvcRequestBuilders.post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }
}