package com.monolieta.project

import com.monolieta.Application
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
internal class ProjectControllerTest {
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var webApplicationContext: WebApplicationContext

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .build()
    }
/*exit

    @Test
    fun `create new project`() {
        val json = """{ 
            "name": "Lorem ipsum dolor sit amet",
            "path": "Lorem ipsum dolor sit amet",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. In egestas erat imperdiet sed euismod nisi porta. Lorem 
                            donec massa sapien faucibus et molestie. Eget est lorem ipsum dolor sit. Purus non enim 
                            praesent elementum facilisis leo vel. Leo in vitae turpis massa sed elementum tempus.
                            Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Donec ac odio tempor 
                            orci dapibus ultrices in iaculis nunc. Aliquam eleifend mi in nulla posuere sollicitudin 
                            aliquam. Maecenas ultricies mi eget mauris pharetra. Lacus sed turpis tincidunt id aliquet 
                            risus feugiat in. Tristique sollicitudin nibh sit amet commodo. Amet cursus sit amet dictum 
                            sit amet. Tortor at risus viverra adipiscing."
        }""".trimIndent()

        mockMvc.perform(post("/project")
            .content(json)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.body.message").value("The project has been created"))
    }
    */
}