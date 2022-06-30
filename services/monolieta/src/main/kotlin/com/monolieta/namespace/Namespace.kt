package com.monolieta.namespace

import com.monolieta.project.Project
import org.hibernate.validator.constraints.Length
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

@Entity
@Table(
    name = "namespace", uniqueConstraints = [
        UniqueConstraint(name = "uq_namespace_2b3475fe", columnNames = ["name", "path"])
    ]
)
open class Namespace(

    @field:Id
    @field:Column(name = "id")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NAMESPACE_SEQ")
    @field:SequenceGenerator(name = "NAMESPACE_SEQ", sequenceName = "namespace_id_seq")
    open val id: Long? = null,

    @field:Length(max = 255, message = "the.name.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.name.is.required")
    @field:Column(name = "name", nullable = false, length = 255)
    open val name: String,

    @field:Length(max = 255, message = "the.path.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.path.is.required")
    @field:Column(name = "path", nullable = false, length = 255)
    open var path: String,

    @field:Column(name = "description")
    open val description: String? = null,

    @field:Column(name = "owner_id")
    @field:NotNull(message = "the.owner.is.required")
    open val owner: Long,

    @field:OneToMany(
        mappedBy = "namespace",
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