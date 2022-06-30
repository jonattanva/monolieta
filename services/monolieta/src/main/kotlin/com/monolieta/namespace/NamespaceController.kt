package com.monolieta.namespace

import com.monolieta.starter.extension.getMessage
import com.monolieta.starter.http.HttpMessage
import com.monolieta.starter.http.HttpResponse
import org.springframework.context.MessageSource
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class NamespaceController(
    private val messageSource: MessageSource,
    private val namespaceService: NamespaceService
) {
    fun create(request: ServerRequest): ServerResponse {
        val body = request.body(Namespace.Request::class.java)
        namespaceService.save(
            Namespace(
                id = null,
                name = body.name,
                path = body.path,
                description = body.description,
                owner = 1 // TODO: get current user!
            )
        )

        val message = HttpMessage(
            messageSource.getMessage("the.namespace.has.been.created")
        )

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(HttpResponse(body = message))
    }
}