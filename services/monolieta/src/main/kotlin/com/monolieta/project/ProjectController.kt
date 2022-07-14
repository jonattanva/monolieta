package com.monolieta.project

import com.monolieta.namespace.NamespaceService
import com.monolieta.starter.exception.NotFoundException
import org.springframework.http.MediaType
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerResponse

@Component
class ProjectController(
    private val projectService: ProjectService,
    private val projectTransfer: ProjectTransfer,
    private val namespaceService: NamespaceService,
) {

    fun create(request: ServerRequest): ServerResponse {
        val body = request.body(ProjectAccess::class.java)

        val namespace = namespaceService.current()
            ?: throw NotFoundException("the.namespace.does.not.exist")

        val result = projectService.save(
            Project(
                id = null,
                key = projectService.generateKey(),
                name = body.name,
                path = body.path,
                description = body.description,
                namespace = namespace,
                archived = false
            )
        )

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(projectTransfer.convert(result))
    }

    fun detail(request: ServerRequest): ServerResponse {
        val namespace = request.pathVariable("namespace")
        val project = request.pathVariable("project")

        val result = projectService.findBy(namespace, project)
            ?: throw NotFoundException("the.project.does.not.exist")

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(projectTransfer.convert(result))
    }
}