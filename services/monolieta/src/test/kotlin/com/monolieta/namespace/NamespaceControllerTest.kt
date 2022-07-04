package com.monolieta.namespace

import com.monolieta.Application
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@SpringBootTest(
    classes = [Application::class],
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ExtendWith(SpringExtension::class)
internal class NamespaceControllerTest {

    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var namespaceRepository: NamespaceRepository

    @Autowired
    private lateinit var webApplicationContext: WebApplicationContext

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .build()
    }

    @AfterEach
    fun cleanup() {
        namespaceRepository.deleteAll()
    }

    @Test
    fun `create new namespace`() {
        val json = """{
         "name": "Monolieta",
         "path": "Monolieta",
         "description": "The example namespace"
        }""".trimMargin()

        mockMvc.perform(post("/namespace")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace has been created"))
    }

    @Test
    fun `create new namespace with duplicate path`() {
        val json = """{
         "name": "Monolieta",
         "path": "Mono",
         "description": "The example namespace"
        }""".trimMargin()

        mockMvc.perform(post("/namespace")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace has been created"))

        mockMvc.perform(post("/namespace")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace already exists"))
    }

    @Test
    fun `create new namespace with long description`() {
        val description = (1..2000)
            .map { it }

        val json = """{
         "name": "Monolieta",
         "path": "Monolieta",
         "description": "$description"
        }""".trimMargin()

        mockMvc.perform(post("/namespace")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The namespace has been created"))
    }

    @Test
    fun `create new namespace with invalid name`() {
        val name = (1..500)
            .map { it }

        val json = """{
         "name": "$name",
         "path": "Mono",
         "description": "The example namespace"
        }""".trimMargin()

        mockMvc.perform(post("/namespace")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body[0]").value("The name must contain a maximum of 255 characters"))
    }
}