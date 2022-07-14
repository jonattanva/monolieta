package com.monolieta.namespace

import com.monolieta.starter.Transfer
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class NamespaceTransfer : Transfer<Namespace, NamespaceTransfer.Model>() {

    data class Model(
        val id: Long? = null,
        val url: String,
        val name: String,
        val path: String,
        val description: String? = null,
        val owner: Long,
        val created: LocalDateTime,
        val updated: LocalDateTime? = null
    )

    override fun convert(entity: Namespace): Model {
        return Model(
            id = entity.id,
            url = "$url/${entity.path}",
            name = entity.name,
            path = entity.path,
            description = entity.description,
            owner = entity.owner,
            created = entity.created,
            updated = entity.updated
        )
    }
}