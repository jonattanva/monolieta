package com.monolieta.entity

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "projects")
open class Project(

    @field:Id
    @field:Column(name = "id")
    open val id: Long? = null,

    @field:Column(name = "name", nullable = false)
    open val name: String,

    @field:Column(name = "path", nullable = false)
    open val path: String,

    @field:Column(name = "description")
    open val description: String? = null,

    @field:Column(name = "created_at", nullable = false)
    open val created: LocalDateTime = LocalDateTime.now(),

    @field:Column(name = "updated_at")
    open val updated: LocalDateTime? = null,

    @field:Column(name = "archived", nullable = false)
    open val archived: Boolean = false
)