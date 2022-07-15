package com.monolieta.resource

import com.monolieta.starter.TransferPageable
import org.springframework.data.domain.Slice
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class ResourceTransfer : TransferPageable<Resource, ResourceTransfer.Model>() {

    data class Model(
        val id: Long?,
        val url: String,
        val name: String,
        val size: Long,
        val type: String,
        val path: String,
        val created: LocalDateTime,
        val updated: LocalDateTime?,
    )

    override fun convert(entity: Resource): Model {
        return Model(
            id = entity.id,
            url = "$url/${entity.path}",
            name = entity.name,
            size = entity.size,
            type = entity.type,
            path = entity.path,
            created = entity.created,
            updated = entity.updated
        )
    }

    override fun convert(entity: Slice<Resource>): Pageable<Model> {
        val content = entity.content.map {
            convert(it)
        }

        val next = if (entity.hasNext()) {
            "$url/resources?page=${entity.nextPageable().pageNumber}"
        } else null

        val previous = if (entity.hasPrevious()) {
            "$url/resources?page=${entity.previousPageable().pageNumber}"
        } else null

        return Pageable(
            body = content,
            next = next,
            previous = previous
        )
    }
}