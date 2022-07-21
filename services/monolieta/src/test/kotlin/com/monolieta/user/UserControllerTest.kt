package com.monolieta.user

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
internal class UserControllerTest @Autowired constructor(
    private val userRepository: UserRepository,
    private var webApplicationContext: WebApplicationContext
) {
    private lateinit var request: MockMvc

    @BeforeEach
    fun setUp() {
        request = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .build()
    }

    @AfterEach
    fun cleanup() {
        userRepository.deleteAll()
    }

    @Test
    fun `register new user`() {
        val json = """{
            "username": "solid.snake",
            "password": "12346789",
            "email": "solid.snake@gmail.com"
        }""".trimMargin()

        val builder = post("/user")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isCreated)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.url").value("http://localhost:8000/user/1"))
            .andExpect(jsonPath("$.username").value("solid.snake"))
            .andExpect(jsonPath("$.email").value("solid.snake@gmail.com"))
            .andExpect(jsonPath("$.enabled").value(true))
    }

    @Test
    fun `detail not found`() {
        request.perform(get("/user/1"))
            .andExpect(status().isNotFound)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The user does not exist"))
    }

    /*
    @Test
    fun `create new user with duplicate username`() {
        val json = """{
            "username": "solid.snake",
            "password": "12346789",
            "email": "solid.snake@gmail.com"
        }""".trimMargin()

        val builder = post("/user")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)

        request.perform(builder)
            .andExpect(status().isCreated)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.url").value("http://localhost:8000/user/1"))
            .andExpect(jsonPath("$.username").value("solid.snake"))
            .andExpect(jsonPath("$.email").value("solid.snake@gmail.com"))
            .andExpect(jsonPath("$.enabled").value(true))
    }*/
}