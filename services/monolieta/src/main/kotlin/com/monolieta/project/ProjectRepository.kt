package com.monolieta.project

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ProjectRepository : JpaRepository<Project, Long> {
    @Query("SELECT P FROM Project P " +
        "INNER JOIN FETCH P.namespace N " +
        "WHERE P.namespace.path = :namespace AND P.path = :project")
    fun findBy(@Param("namespace") namespace: String, @Param("project") project: String): Project?
}