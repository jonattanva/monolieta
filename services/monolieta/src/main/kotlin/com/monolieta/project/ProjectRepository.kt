package com.monolieta.project

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ProjectRepository : JpaRepository<Project, Long> {
    @Query("SELECT P FROM Project P WHERE P.namespace.owner = :owner AND P.name = :name")
    fun findByName(@Param("owner") owner: Long, @Param("name") name: String): Project?
}