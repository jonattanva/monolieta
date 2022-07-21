package com.monolieta.user

import org.hibernate.validator.constraints.Length
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Pattern

@Entity
@Table(
    name = "users", uniqueConstraints = [
        UniqueConstraint(name = "uq_users_bde433a1", columnNames = ["username"])
    ]
)
open class User(

    @field:Id
    @field:Column(name = "id")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USERS_SEQ")
    @field:SequenceGenerator(name = "USERS_SEQ", sequenceName = "users_id_seq")
    open val id: Long? = null,

    @field:Length(max = 255, message = "the.username.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.username.is.required")
    @field:Column(name = "username", nullable = false, length = 255)
    open val username: String,

    @field:Length(max = 255, message = "the.password.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.password.is.required")
    @field:Column(name = "password", nullable = false, length = 255)
    open val password: String,

    @field:Length(max = 255, message = "the.email.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.email.is.required")
    @field:Pattern(
        message = "the.email.is.not.valid",
        regexp = "^[_A-Za-z\\d-+]+(\\.[_A-Za-z\\d-]+)*@[A-Za-z\\d-]+(\\.[A-Za-z\\d]+)*(\\.[A-Za-z]{2,})$"
    )
    @field:Column(name = "email", nullable = false, length = 255)
    open val email: String,

    @field:Column(name = "enabled", nullable = false)
    open val enabled: Boolean = false,

    @field:Column(name = "created_at", nullable = false, updatable = false)
    open val createdAt: LocalDateTime = LocalDateTime.now(),

    @field:Column(name = "updated_at", nullable = true)
    open var updatedAt: LocalDateTime? = null
)