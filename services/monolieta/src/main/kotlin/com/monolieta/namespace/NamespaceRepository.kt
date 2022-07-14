package com.monolieta.namespace

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface NamespaceRepository : JpaRepository<Namespace, Long> {

    @Query("SELECT N FROM Namespace N WHERE N.owner = :owner")
    fun current(@Param("owner") owner: Long): Namespace?

    @Query("SELECT N FROM Namespace N WHERE N.path = :path")
    fun findBy(@Param("path") namespace: String): Namespace?
}