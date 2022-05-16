package com.monolieta.entity

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(
    name = "projects", uniqueConstraints = [
        UniqueConstraint(name = "uq_projects_30ec1788", columnNames = ["name", "path"])
    ]
)
open class Project(

    @field:Id
    @field:Column(name = "id")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROJECTS_SEQ")
    @field:SequenceGenerator(name = "PROJECTS_SEQ", sequenceName = "projects_id_seq")
    open val id: Long? = null,

    @field:Column(name = "name", nullable = false)
    open val name: String,

    @field:Column(name = "path", nullable = false)
    open var path: String,

    @field:Column(name = "description")
    open val description: String? = null,

    @field:Column(name = "created_at", nullable = false, updatable = false)
    open val created: LocalDateTime = LocalDateTime.now(),

    @field:Column(name = "updated_at")
    open var updated: LocalDateTime? = null,

    @field:Column(name = "archived", nullable = false)
    open var archived: Boolean = false
)