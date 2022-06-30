package com.monolieta

import com.monolieta.namespace.NamespaceController
import com.monolieta.project.ProjectController
import com.monolieta.starter.filter.FilterException
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType
import org.springframework.web.servlet.function.router

@Configuration
class Router(
    private val filterException: FilterException
) {

    @Bean
    fun namespace(
        namespaceController: NamespaceController
    ) = router {
        "/namespace".nest {
            POST("", accept(MediaType.APPLICATION_JSON), namespaceController::create)
        }
    }.filter(filterException::handler)

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