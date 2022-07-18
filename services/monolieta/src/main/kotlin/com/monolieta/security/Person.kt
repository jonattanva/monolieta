package com.monolieta.security

import org.hibernate.validator.constraints.Length
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Pattern

@Entity
@Table(
    name = "person", uniqueConstraints = [
        UniqueConstraint(name = "uq_person_d9c33cca", columnNames = ["name"])
    ]
)
open class Person(

    @field:Id
    @field:Column(name = "id")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PERSON_SEQ")
    @field:SequenceGenerator(name = "PERSON_SEQ", sequenceName = "person_id_seq")
    val id: Long? = null,

    @field:Length(max = 255, message = "the.name.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.name.is.required")
    @field:Column(name = "name", nullable = false, length = 255)
    val name: String,

    @field:Length(max = 255, message = "the.email.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.email.is.required")
    @field:Pattern(
        message = "Person.Validate.Pattern.Email",
        regexp = "^[_A-Za-z0-9-+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
    )
    @field:Column(name = "email", nullable = false, length = 255)
    val email: String,

    @field:Column(name = "created_at", nullable = false, updatable = false)
    open val created: LocalDateTime = LocalDateTime.now(),

    @field:Column(name = "updated_at")
    open var updated: LocalDateTime? = null,
)