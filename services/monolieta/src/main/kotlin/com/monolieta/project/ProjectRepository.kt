package com.monolieta.project

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ProjectRepository : JpaRepository<Project, Long> {
    @Query("SELECT * FROM Project WHERE namespace.owner = :owner AND name = :name")
    fun findByName(@Param("owner") owner: Long, @Param("name") name: String): Project?
}