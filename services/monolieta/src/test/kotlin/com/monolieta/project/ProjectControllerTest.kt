package com.monolieta.project

import com.monolieta.Application
import com.monolieta.namespace.Namespace
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

    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var webApplicationContext: WebApplicationContext

    @Autowired
    private lateinit var namespaceRepository: NamespaceRepository

    @Autowired
    private lateinit var projectRepository: ProjectRepository

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .build()
    }

    @AfterEach
    fun cleanup() {
        projectRepository.deleteAll()
        namespaceRepository.deleteAll()
    }

    @Test
    fun `create new project without namespace`() {
        val json = """{ 
            "name": "Lorem ipsum dolor sit amet",
            "path": "Lorem ipsum dolor sit amet"
        }""".trimIndent()

        mockMvc.perform(
            post("/project")
                .content(json)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace does not exist"))
    }

    @Test
    fun `create new project`() {
        createNamespace()

        val json = """{ 
            "name": "Lorem ipsum dolor sit amet",
            "path": "Lorem ipsum dolor sit amet"
        }""".trimIndent()

        mockMvc.perform(
            post("/project")
                .content(json)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project has been created"))
    }

    @Test
    fun `create new project with duplicate path`() {
        createNamespace()

        val json = """{ 
            "name": "edge",
            "path": "edge"
        }""".trimIndent()

        mockMvc.perform(
            post("/project")
                .content(json)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project has been created"))

        mockMvc.perform(
            post("/project")
                .content(json)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project already exists"))
    }

    @Test
    fun `create new project with name invalid`() {
        createNamespace()

        val name = (1..500)
            .map { it }

        val json = """{ 
            "name": "$name",
            "path": "Lorem ipsum dolor sit amet"
        }""".trimIndent()

        mockMvc.perform(
            post("/project")
                .content(json)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body[0]").value("The name must contain a maximum of 255 characters"))
    }

    @Test

    fun `get project detail`() {
        createNamespace()

        val json = """{ 
            "name": "edge",
            "path": "edge",
            "description": "The demo project"
        }""".trimIndent()

        mockMvc.perform(post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project has been created"))

        mockMvc.perform(get("/project/monolieta/edge"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.namespace").value("Monolieta"))
            .andExpect(jsonPath("$.body.name").value("edge"))
            .andExpect(jsonPath("$.body.description").value("The demo project"))
            .andExpect(jsonPath("$.body.archived").value(false))
    }

    @Test
    fun `project not found`() {
        mockMvc.perform(get("/project/monolieta/noting"))
            .andDo(MockMvcResultHandlers.print())
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project does not exist"))
    }

    @Test
    fun `create new project with long description`() {
        createNamespace()

        val description = (1..2000)
            .map { it }

        val json = """{ 
            "name": "edge",
            "path": "edge",
            "description": "$description"
        }""".trimIndent()

        mockMvc.perform(post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project has been created"))
    }

    private fun createNamespace() {
        namespaceRepository.save(
            Namespace(
                id = null,
                name = "Monolieta",
                path = "monolieta",
                owner = 1
            )
        )
    }
}