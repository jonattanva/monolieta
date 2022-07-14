package com.monolieta.project

import com.monolieta.starter.Transfer
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class ProjectTransfer : Transfer<Project, ProjectTransfer.Model>() {

    data class Model(
        val id: Long? = null,
        val url: String,
        val key: String,
        val name: String,
        val path: String,
        val description: String? = null,
        val created: LocalDateTime,
        val updated: LocalDateTime? = null,
        val archived: Boolean = false
    )

    override fun convert(entity: Project): Model {
        return Model(
            id = entity.id,
            url = "$url/${entity.namespace.path}/${entity.path}",
            key = entity.key,
            name = entity.name,
            path = entity.path,
            description = entity.description,
            created = entity.created,
            updated = entity.updated,
            archived = entity.archived
        )
    }
}