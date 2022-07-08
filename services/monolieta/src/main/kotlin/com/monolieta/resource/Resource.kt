package com.monolieta.resource

import com.monolieta.project.Project
import org.hibernate.validator.constraints.Length
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.Valid
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

@Entity
@Table(name = "resource")
open class Resource(

    @field:Id
    @field:Column(name = "id")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RESOURCE_SEQ")
    @field:SequenceGenerator(name = "RESOURCE_SEQ", sequenceName = "resource_id_seq")
    open val id: Long? = null,

    @field:Length(max = 255, message = "the.name.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.name.is.required")
    @field:Column(name = "name", nullable = false, length = 255)
    open val name: String,

    @field:NotNull(message = "the.size.is.required")
    @field:Column(name = "size", nullable = false)
    open val size: Long,

    @field:Length(max = 255, message = "the.type.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.type.is.required")
    @field:Column(name = "type", nullable = false, length = 255)
    open val type: String,

    @field:Length(max = 255, message = "the.path.must.contain.a.maximum.of.255.characters")
    @field:NotEmpty(message = "the.path.is.required")
    @field:Column(name = "path", nullable = false, length = 255)
    open val path: String,

    @field:Valid
    @field:ManyToOne(fetch = FetchType.LAZY)
    @field:JoinColumn(
        name = "id_project",
        nullable = false,
        foreignKey = ForeignKey(name = "fk_resource_project")
    )
    open val project: Project,

    @field:Column(name = "created_at", nullable = false, updatable = false)
    open val created: LocalDateTime = LocalDateTime.now(),

    @field:Column(name = "updated_at")
    open var updated: LocalDateTime? = null,
)