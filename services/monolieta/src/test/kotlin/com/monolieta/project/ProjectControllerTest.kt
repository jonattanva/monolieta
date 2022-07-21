package com.monolieta.project

import com.monolieta.Application
import com.monolieta.namespace.NamespaceFactory
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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@SpringBootTest(
    classes = [Application::class],
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ExtendWith(SpringExtension::class)
internal class ProjectControllerTest @Autowired constructor(
    private val projectFactory: ProjectFactory,
    private val namespaceFactory: NamespaceFactory,
    private var webApplicationContext: WebApplicationContext,
) {

    private lateinit var mockMvc: MockMvc

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .build()
    }

    @AfterEach
    fun cleanup() {
        projectFactory.cleanup()
    }

    @Test
    fun `create new project`() {
        namespaceFactory.create()

        val json = """{ 
            "name": "edge",
            "path": "edge",
            "description": "The description..."
        }""".trimIndent()

        val builder = post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        mockMvc.perform(builder)
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
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

        mockMvc.perform(builder)
            .andExpect(status().isNotFound)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace does not exist"))
    }

    @Test

    fun detail() {
        projectFactory.create()

        mockMvc.perform(get("/project/monolieta/edge"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.url").value("http://localhost:8000/monolieta/edge"))
            .andExpect(jsonPath("$.name").value("edge"))
            .andExpect(jsonPath("$.path").value("edge"))
            .andExpect(jsonPath("$.description").value("This is a description"))
            .andExpect(jsonPath("$.archived").value(false))
    }

    @Test
    fun `project detail not found`() {
        mockMvc.perform(get("/namespace/monolieta"))
            .andExpect(status().isNotFound)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace does not exist"))
    }

    @Test
    fun `create new project with duplicate path`() {
        projectFactory.create()

        val json = """{ 
            "name": "edge",
            "path": "edge"
        }""".trimIndent()

        val builder = post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        mockMvc.perform(builder)
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project already exists"))
    }

    @Test
    fun `create new project with name invalid`() {
        namespaceFactory.create()

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

        mockMvc.perform(builder)
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body[0]").value("The name must contain a maximum of 255 characters"))
    }

    @Test
    fun `create new project with long description`() {
        namespaceFactory.create()

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

        mockMvc.perform(builder)
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.url").value("http://localhost:8000/monolieta/edge"))
            .andExpect(jsonPath("$.name").value("edge"))
            .andExpect(jsonPath("$.path").value("edge"))
            .andExpect(jsonPath("$.archived").value(false))
    }
}