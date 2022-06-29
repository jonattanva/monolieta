package com.monolieta.starter.http

data class HttpError(
    val message: String,
    val errors: List<String> = emptyList()
)