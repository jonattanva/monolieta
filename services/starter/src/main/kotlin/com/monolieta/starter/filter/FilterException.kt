package com.monolieta.starter.filter

import com.monolieta.starter.extension.getMessage
import com.monolieta.starter.http.HttpMessage
import com.monolieta.starter.http.HttpResponse
import org.hibernate.exception.ConstraintViolationException
import org.springframework.context.MessageSource
import org.springframework.context.annotation.Configuration
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.MediaType
import org.springframework.web.servlet.function.HandlerFunction
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Configuration
class FilterException(
    private val messageSource: MessageSource
) {
    fun handler(request: ServerRequest, next: HandlerFunction<ServerResponse>): ServerResponse {
        return try {
            next.handle(request)
        } catch (dataIntegrityViolationException: DataIntegrityViolationException) {
            handle(dataIntegrityViolationException)
        } catch (constraintViolationException: javax.validation.ConstraintViolationException) {
            handle(constraintViolationException)
        } catch (exception: Exception) {
            println(exception)
            handle(exception)
        }
    }

    private fun handle(exception: Exception): ServerResponse {
        val body = HttpMessage(
            messageSource.getMessage(
                exception.message ?: "",
                messageSource.getMessage("an.error.occurred.in.the.requested.action")
            )
        )

        return ServerResponse.badRequest()
            .contentType(MediaType.APPLICATION_JSON)
            .body(HttpResponse(body = body))
    }

    private fun handle(dataIntegrityViolationException: DataIntegrityViolationException): ServerResponse {
        val exception = dataIntegrityViolationException.cause
        var message = messageSource.getMessage("an.error.occurred.in.the.requested.action")

        if (exception is ConstraintViolationException) {
            message = messageSource.getMessage(exception.constraintName)
        }

        val body = HttpMessage(message)
        return ServerResponse.badRequest()
            .contentType(MediaType.APPLICATION_JSON)
            .body(HttpResponse(body = body))
    }

    private fun handle(constraintViolationException: javax.validation.ConstraintViolationException): ServerResponse {
        val locale = LocaleContextHolder.getLocale()
        val body = constraintViolationException.constraintViolations.stream()
            .map { messageSource.getMessage(it.message, null, locale) }
            .toList()

        return ServerResponse.badRequest()
            .contentType(MediaType.APPLICATION_JSON)
            .body(HttpResponse(body = body))
    }
}
