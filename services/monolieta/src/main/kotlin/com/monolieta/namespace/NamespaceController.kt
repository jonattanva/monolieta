package com.monolieta.namespace

import com.monolieta.starter.exception.NotFoundException
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class NamespaceController(
    private val namespaceService: NamespaceService,
    private val namespaceTransfer: NamespaceTransfer
) {

    fun create(request: ServerRequest): ServerResponse {
        val body = request.body(NamespaceAccess::class.java)
        val result = namespaceService.save(
            Namespace(
                id = null,
                name = body.name,
                path = body.path,
                description = body.description,
                owner = 1
            )
        )

        return ServerResponse.created(request.uri())
            .contentType(MediaType.APPLICATION_JSON)
            .body(namespaceTransfer.convert(result))
    }

    fun detail(request: ServerRequest): ServerResponse {
        val namespace = request.pathVariable("namespace")

        val result = namespaceService.findBy(namespace)
            ?: throw NotFoundException("the.namespace.does.not.exist")

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(namespaceTransfer.convert(result))
    }
}