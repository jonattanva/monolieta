package com.monolieta.namespace

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface NamespaceRepository : JpaRepository<Namespace, Long> {
    @Query("SELECT * FROM Namespace WHERE path = :path")
    fun findByPath(@Param("path") path: String): Namespace?
}