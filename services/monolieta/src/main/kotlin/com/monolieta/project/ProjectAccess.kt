package com.monolieta.project

data class ProjectAccess(
    val name: String,
    val path: String,
    val description: String? = null,
    val archived: Boolean = false,
    val privacy: String?
)