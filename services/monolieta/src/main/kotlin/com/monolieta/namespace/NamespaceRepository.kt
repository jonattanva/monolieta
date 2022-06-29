package com.monolieta.namespace

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface NamespaceRepository : JpaRepository<Namespace, Long> {
    @Query("SELECT * FROM Namespace WHERE owner = :owner")
    fun getNamespace(@Param("owner") owner: Long): Namespace?
}