package com.monolieta.security

import org.hibernate.validator.constraints.Length
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.NotEmpty

@Entity
@Table(
    name = "user", uniqueConstraints = [
        UniqueConstraint(name = "uq_user_d9c33cca", columnNames = ["username"])
    ]
)
open class User(

    @field:Id
    @field:Column(name = "id")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SEQ")
    @field:SequenceGenerator(name = "USER_SEQ", sequenceName = "user_id_seq")
    val id: Long? = null,

    @field:Valid
    @field:ManyToOne(fetch = FetchType.LAZY)
    @field:JoinColumn(
        name = "person_id",
        nullable = false,
        foreignKey = ForeignKey(name = "fk_user_person")
    )
    val person: Person,

    @field:Length(max = 255, message = "the.username.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.username.is.required")
    @field:Column(name = "username", nullable = false, length = 255)
    val username: String,

    @field:Length(max = 255, message = "the.secret.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.secret.is.required")
    @field:Column(name = "secret", nullable = false, length = 255)
    val secret: String,

    @field:Column(name = "enabled", nullable = false)
    val enabled: Boolean,

    @field:Column(name = "created_at", nullable = false, updatable = false)
    open val created: LocalDateTime = LocalDateTime.now(),

    @field:Column(name = "updated_at")
    open var updated: LocalDateTime? = null,
)