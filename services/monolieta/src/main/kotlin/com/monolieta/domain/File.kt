package com.monolieta.domain

import org.apache.tika.mime.MediaType

data class File(
    val name: String,
    val type: MediaType?,
    val size: Long,
    val path: String
)