package com.monolieta.backbone.http

data class HttpError(
    val message: String,
    val errors: List<String> = emptyList()
)