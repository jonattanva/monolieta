package com.monolieta.starter.http

import org.springframework.beans.factory.annotation.Value

abstract class Transfer<T, K> {

    @Value("\${monolieta.app-url}")
    protected lateinit var url: String

    abstract fun convert(entity: T): K
}