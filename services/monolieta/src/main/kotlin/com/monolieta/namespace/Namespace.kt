package com.monolieta.namespace

import com.monolieta.project.Project
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotEmpty

@Entity
@Table(
    name = "namespaces", uniqueConstraints = [
        UniqueConstraint(name = "uq_namespaces_2b3475fe", columnNames = ["name", "path"])
    ]
)
open class Namespace(

    @field:Id
    @field:Column(name = "id")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NAMESPACES_SEQ")
    @field:SequenceGenerator(name = "NAMESPACES_SEQ", sequenceName = "namespaces_id_seq")
    open val id: Long? = null,

    @field:NotEmpty(message = "the.namespace.name.is.required")
    @field:Column(name = "name", nullable = false)
    open val name: String,

    @field:NotEmpty(message = "the.namespace.path.is.required")
    @field:Column(name = "path", nullable = false)
    open var path: String,

    @field:Column(name = "description")
    open val description: String? = null,

    @field:Column(name = "owner_id")
    open val owner: Long,

    @field:OneToMany(
        mappedBy = "namespaces",
        fetch = FetchType.LAZY,
        orphanRemoval = true,
        cascade = [CascadeType.ALL]
    )
    open var project: MutableSet<Project> = mutableSetOf(),

    @field:Column(name = "created_at", nullable = false, updatable = false)
    open val created: LocalDateTime = LocalDateTime.now(),

    @field:Column(name = "updated_at")
    open var updated: LocalDateTime? = null,
) {
    data class Request(
        val name: String,
        val path: String,
        val description: String?
    )
}