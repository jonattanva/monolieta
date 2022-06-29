package com.monolieta

import com.monolieta.project.ProjectController
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType
import org.springframework.web.servlet.function.router

@Configuration
class Router {

    @Bean
    fun project(
        projectHandle: ProjectController
    ) = router {
        "/project".nest {
            POST("", accept(MediaType.APPLICATION_JSON), projectHandle::create)
            GET("/{namespace}/{project}", projectHandle::detail)
        }
    }
}