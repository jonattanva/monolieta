package com.monolieta.project

import com.monolieta.starter.extension.getMessage
import com.monolieta.starter.http.HttpMessage
import com.monolieta.namespace.NamespaceService
import org.springframework.context.MessageSource
import org.springframework.http.MediaType
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerResponse

@Component
class ProjectController(
    private val messageSource: MessageSource,
    private val projectService: ProjectService,
    private val namespaceService: NamespaceService
) {
    fun detail(request: ServerRequest): ServerResponse {
        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body("message")
    }

    fun create(request: ServerRequest): ServerResponse {
        val body = request.body(Project.Request::class.java)

        val namespace = namespaceService.getNamespace()
            ?: throw Exception("the.namespace.does.not.exist")

        projectService.save(
            Project(
                id = null,
                name = body.name,
                path = body.path,
                description = body.description,
                namespace = namespace
            )
        )

        val message = HttpMessage(
            messageSource.getMessage("the.project.has.been.created")
        )

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(message)
    }
}