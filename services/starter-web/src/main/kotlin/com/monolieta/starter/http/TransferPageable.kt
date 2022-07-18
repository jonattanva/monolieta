package com.monolieta.starter.http

import org.springframework.data.domain.Slice

abstract class TransferPageable<T, K> : Transfer<T, K>() {

    data class Pageable<K>(
        val next: String?,
        val previous: String?,
        val body: List<K>
    )

    abstract fun convert(entity: Slice<T>): Pageable<K>
}