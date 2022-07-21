package com.monolieta.user

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface UserRepository : JpaRepository<User, Long> {

    @Query("SELECT U FROM User U WHERE U.username = :username")
    fun findByUsername(@Param("username") username: String): User?
}