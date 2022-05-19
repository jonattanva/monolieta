package com.monolieta.backbone.extension

import java.text.Normalizer

fun String.normalize(): String {
    val result = this.filter {
        it.isLetterOrDigit() || it.isWhitespace()
    }.lowercase()

    return Normalizer.normalize(result, Normalizer.Form.NFD)
        .replace("[^\\p{ASCII}]", "")
        .replace("\\s+".toRegex(), "-")
}