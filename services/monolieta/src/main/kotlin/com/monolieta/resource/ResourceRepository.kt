package com.monolieta.resource

import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Slice
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ResourceRepository : JpaRepository<Resource, Long> {
    @Query("SELECT R FROM Resource R")
    fun paginate(pageable: Pageable): Slice<Resource>
}