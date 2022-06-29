package com.monolieta.starter.http

import java.time.LocalDateTime
import java.time.ZoneId

data class HttpResponse<T>(
    val timestamp: Long = LocalDateTime.now()
        .atZone(ZoneId.systemDefault())
        .toEpochSecond(),
    val body: T
)