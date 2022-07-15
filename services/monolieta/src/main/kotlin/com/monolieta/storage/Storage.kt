package com.monolieta.storage

import org.apache.tika.mime.MediaType

data class Storage(
    val name: String,
    val type: MediaType?,
    val size: Long,
    val path: String
)