package com.monolieta.project

import com.monolieta.namespace.Namespace
import org.hibernate.validator.constraints.Length
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.NotEmpty

@Entity
@Table(
    name = "project", uniqueConstraints = [
        UniqueConstraint(name = "uq_project_30ec1788", columnNames = ["name", "path"])
    ]
)
open class Project(

    @field:Id
    @field:Column(name = "id")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROJECT_SEQ")
    @field:SequenceGenerator(name = "PROJECT_SEQ", sequenceName = "project_id_seq")
    open val id: Long? = null,

    @field:Length(max = 100, message = "the.key.must.contain.a.maximum.of.100.characters")
    @field:NotEmpty(message = "the.key.is.required")
    @field:Column(name = "key", nullable = false, length = 100)
    open val key: String,

    @field:Length(max = 255, message = "the.name.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.name.is.required")
    @field:Column(name = "name", nullable = false, length = 255)
    open val name: String,

    @field:Length(max = 255, message = "the.path.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.path.is.required")
    @field:Column(name = "path", nullable = false, length = 255)
    open var path: String,

    @field:Column(name = "description", columnDefinition = "text")
    open val description: String? = null,

    @field:Valid
    @field:ManyToOne(fetch = FetchType.LAZY)
    @field:JoinColumn(
        name = "id_namespace",
        nullable = false,
        foreignKey = ForeignKey(name = "fk_project_namespace")
    )
    open val namespace: Namespace,

    @field:Column(name = "created_at", nullable = false, updatable = false)
    open val created: LocalDateTime = LocalDateTime.now(),

    @field:Column(name = "updated_at")
    open var updated: LocalDateTime? = null,

    @field:Column(name = "archived", nullable = false)
    open var archived: Boolean = false
) {
    data class Request(
        val name: String,
        val path: String,
        val description: String? = null,
        val archived: Boolean = false,
        val privacy: String?
    )

    data class Response(
        val id: Long?,
        val key: String,
        val namespace: String,
        val created: String,
        val updated: String?,
        val name: String,
        val description: String?,
        val archived: Boolean
    )

    fun toResponse(): Response {
        return Response(
            id = id,
            key = key,
            created = created.toString(),
            updated = updated.toString(),
            name = name,
            description = description,
            namespace = namespace.name,
            archived = archived
        )
    }
}