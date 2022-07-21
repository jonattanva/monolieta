package com.monolieta.user

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import java.time.LocalDateTime
import javax.validation.Valid
import org.springframework.security.core.userdetails.User as Internal

@Validated
@Service("UserService")
@Transactional(propagation = Propagation.MANDATORY)
class UserService(
    private val userRepository: UserRepository
) : UserDetailsService {

    @Transactional(propagation = Propagation.REQUIRED)
    fun save(@Valid user: User): User {
        user.updatedAt = if (user.id != null) {
            LocalDateTime.now()
        } else null
        return userRepository.save(user)
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    fun findById(id: Long): User? {
        return userRepository.findById(id).orElse(null)
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    fun findByUsername(username: String?): User? {
        return if (username != null && username.isNotEmpty()) {
            userRepository.findByUsername(username)
        } else null
    }

    override fun loadUserByUsername(username: String?): UserDetails {
        val user = findByUsername(username)
            ?: throw UsernameNotFoundException("User not found: $username")
        return Internal(user.username, user.password, listOf())
    }
}