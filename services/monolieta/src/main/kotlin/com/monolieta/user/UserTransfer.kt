package com.monolieta.user

import com.monolieta.starter.http.Transfer
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class UserTransfer : Transfer<User, UserTransfer.Model>() {

    data class Model(
        val id: Long?,
        val url: String,
        val username: String,
        val email: String,
        val createdAt: LocalDateTime,
        val updatedAt: LocalDateTime?,
        val enabled: Boolean
    )

    override fun convert(entity: User): Model {
        return Model(
            id = entity.id,
            url = "$url/user/${entity.id}",
            username = entity.username,
            email = entity.email,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt,
            enabled = entity.enabled
        )
    }
}