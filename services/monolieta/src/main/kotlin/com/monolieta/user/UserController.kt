package com.monolieta.user

import com.monolieta.starter.exception.NotFoundException
import org.springframework.http.MediaType
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.function.ServerResponse

@Component
class UserController(
    private val userService: UserService,
    private val userTransfer: UserTransfer,
    private val passwordEncoder: PasswordEncoder
) {

    fun register(request: ServerRequest): ServerResponse {
        val body = request.body(UserAccess::class.java)

        val secret = passwordEncoder.encode(body.password)
        val result = userService.save(
            User(
                id = null,
                username = body.username,
                password = secret,
                email = body.email,
                enabled = true
            )
        )

        return ServerResponse.created(request.uri())
            .contentType(MediaType.APPLICATION_JSON)
            .body(userTransfer.convert(result))
    }

    fun detail(request: ServerRequest): ServerResponse {
        val id = request.pathVariable("id").toLongOrNull()
            ?: throw NotFoundException("the.user.does.not.exist")

        val result = userService.findById(id)
            ?: throw NotFoundException("the.user.does.not.exist")

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userTransfer.convert(result))
    }
}