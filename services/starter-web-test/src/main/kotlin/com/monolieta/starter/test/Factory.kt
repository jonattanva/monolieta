package com.monolieta.starter.test

abstract class Factory<T> {

    abstract fun definition(): T

    abstract fun make(entity: T): T

    abstract fun cleanup()

    fun create(): T {
        return create(definition())
    }

    fun create(entity: T): T {
        return make(entity)
    }
}