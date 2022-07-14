package com.monolieta

import com.monolieta.namespace.NamespaceController
import com.monolieta.project.ProjectController
import com.monolieta.resource.ResourceController
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
            GET("/{namespace}", namespaceController::detail)
            POST("", accept(MediaType.APPLICATION_JSON), namespaceController::create)
        }
    }.filter(filterException::handler)

    @Bean
    fun project(
        projectController: ProjectController
    ) = router {
        "/project".nest {
            GET("/{namespace}/{project}", projectController::detail)
            POST("", accept(MediaType.APPLICATION_JSON), projectController::create)

        }
    }.filter(filterException::handler)

    @Bean
    fun resource(
        resourceController: ResourceController
    ) = router {
        "/resource".nest {
            GET("/{namespace}/{project}", resourceController::paginate)
            POST("/{namespace}/{project}", resourceController::upload)
        }
    }.filter(filterException::handler)
}