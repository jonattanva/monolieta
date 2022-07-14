package com.monolieta.project

import com.monolieta.Application
import com.monolieta.namespace.NamespaceRepository
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@SpringBootTest(
    classes = [Application::class],
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ExtendWith(SpringExtension::class)
internal class ProjectControllerTest {

    private lateinit var request: MockMvc

    @Autowired
    private lateinit var webApplicationContext: WebApplicationContext

    @Autowired
    private lateinit var namespaceRepository: NamespaceRepository

    @Autowired
    private lateinit var projectRepository: ProjectRepository

    @BeforeEach
    fun setUp() {
        request = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .build()
    }

    @AfterEach
    fun cleanup() {
        projectRepository.deleteAll()
        namespaceRepository.deleteAll()
    }

    @Test
    fun `create new project`() {
        createNewNamespace()

        val json = """{ 
            "name": "edge",
            "path": "edge",
            "description": "The description..."
        }""".trimIndent()

        val builder = post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.url").value("http://localhost:8000/monolieta/edge"))
            .andExpect(jsonPath("$.name").value("edge"))
            .andExpect(jsonPath("$.path").value("edge"))
            .andExpect(jsonPath("$.description").value("The description..."))
            .andExpect(jsonPath("$.archived").value(false))
    }

    @Test
    fun `create new project without namespace`() {
        val json = """{ 
            "name": "edge",
            "path": "edge"
        }""".trimIndent()

        val builder = post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isNotFound)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace does not exist"))
    }

    @Test

    fun `project detail`() {
        createNewNamespace("Monolieta")
        createNew()

        request.perform(get("/project/monolieta/edge"))
            .andDo(MockMvcResultHandlers.print())
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.url").value("http://localhost:8000/monolieta/edge"))
            .andExpect(jsonPath("$.name").value("edge"))
            .andExpect(jsonPath("$.path").value("edge"))
            .andExpect(jsonPath("$.description").value("The description..."))
            .andExpect(jsonPath("$.archived").value(false))
    }

    @Test
    fun `project detail not found`() {
        request.perform(get("/namespace/monolieta"))
            .andExpect(status().isNotFound)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace does not exist"))
    }

    @Test
    fun `create new project with duplicate path`() {
        createNewNamespace("Monolieta")
        createNew()

        val json = """{ 
            "name": "edge",
            "path": "edge"
        }""".trimIndent()

        val builder = post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project already exists"))
    }

    @Test
    fun `create new project with name invalid`() {
        createNewNamespace("Monolieta")

        val name = (1..500)
            .map { it }

        val json = """{ 
            "name": "$name",
            "path": "edge"
        }""".trimIndent()

        val builder = post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body[0]").value("The name must contain a maximum of 255 characters"))
    }

    @Test
    fun `create new project with long description`() {
        createNewNamespace()

        val description = (1..2000)
            .map { it }

        val json = """{ 
            "name": "edge",
            "path": "edge",
            "description": "$description"
        }""".trimIndent()

        val builder = post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.url").value("http://localhost:8000/monolieta/edge"))
            .andExpect(jsonPath("$.name").value("edge"))
            .andExpect(jsonPath("$.path").value("edge"))
            .andExpect(jsonPath("$.archived").value(false))
    }

    private fun createNewNamespace(name: String = "Monolieta") {
        val json = """{
            "name": "$name",
            "path": "$name",
            "description": "The description..."
        }""".trimMargin()

        val builder = post("/namespace")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isCreated)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }

    private fun createNew(name: String = "edge") {
        val json = """{ 
            "name": "$name",
            "path": "$name",
            "description": "The description..."
        }""".trimIndent()

        val builder = post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }
}