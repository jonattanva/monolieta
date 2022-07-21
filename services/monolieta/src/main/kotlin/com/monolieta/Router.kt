package com.monolieta

import com.monolieta.namespace.NamespaceController
import com.monolieta.project.ProjectController
import com.monolieta.resource.ResourceController
import com.monolieta.user.UserController
import com.monolieta.starter.filter.FilterException
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.web.servlet.function.router

@Configuration
class Router(
    private val filterException: FilterException
) {
    @Bean
    fun user(
        controller: UserController
    ) = router {
        "/user".nest {
            GET("/{id}", controller::detail)
            POST(accept(APPLICATION_JSON), controller::register)
        }
    }.filter(filterException::handler)

    @Bean
    fun namespace(
        controller: NamespaceController
    ) = router {
        "/namespace".nest {
            GET("/{namespace}", controller::detail)
            POST(accept(APPLICATION_JSON), controller::create)
        }
    }.filter(filterException::handler)

    @Bean
    fun project(
        projectController: ProjectController
    ) = router {
        "/project".nest {
            GET("/{namespace}/{project}", projectController::detail)
            POST("", accept(APPLICATION_JSON), projectController::create)

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