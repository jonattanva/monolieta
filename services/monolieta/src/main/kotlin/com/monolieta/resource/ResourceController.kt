package com.monolieta.resource

import com.monolieta.project.ProjectService
import com.monolieta.starter.extension.getMessage
import com.monolieta.starter.http.HttpMessage
import com.monolieta.starter.http.HttpResponse
import org.springframework.context.MessageSource
import org.springframework.data.domain.PageRequest
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartHttpServletRequest
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class ResourceController(
    private val messageSource: MessageSource,
    private val projectService: ProjectService,
    private val resourceService: ResourceService
) {
    fun paginate(request: ServerRequest): ServerResponse {
        val pageable = PageRequest.of(0, 10)
        val result = resourceService.paginate(pageable)

        println(result.content)

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(HttpResponse(body = HttpResponse(body = "result")))
    }

    fun upload(request: ServerRequest): ServerResponse {
        val multipart = request.servletRequest() as MultipartHttpServletRequest
        val files = multipart.getFiles("files")

        if (files.isEmpty()) {
            throw Exception("you.must.attach.one.or.more.files")
        }

        val project = request.pathVariable("project")
        val namespace = request.pathVariable("namespace")

        val result = projectService.findBy(namespace, project)
            ?: throw Exception("the.project.does.not.exist")

        resourceService.upload(result, files)
        val message = HttpMessage(
            messageSource.getMessage("new.resource.have.been.added")
        )

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(HttpResponse(body = message))
    }
}