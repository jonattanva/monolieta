package com.monolieta.starter.test

abstract class Factory<T, R> {

    abstract fun definition(): T

    abstract fun make(entity: T): R

    abstract fun cleanup()

    fun create(): R = create(definition())

    fun create(entity: T): R = make(entity)
}