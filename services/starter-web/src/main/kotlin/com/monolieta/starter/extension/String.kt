package com.monolieta.starter.extension

import java.math.BigInteger
import java.security.MessageDigest
import java.text.Normalizer

fun String.normalize(): String {
    val result = this.filter {
        it.isLetterOrDigit() || it.isWhitespace()
    }.lowercase()

    return Normalizer.normalize(result, Normalizer.Form.NFD)
        .replace("[^\\p{ASCII}]", "")
        .replace("\\s+".toRegex(), "-")
}

fun String.md5(): String {
    val encrypt = MessageDigest.getInstance("MD5")
    val magnitude = encrypt.digest(this.toByteArray(Charsets.UTF_8))

    return String.format("%032x", BigInteger(1, magnitude))
}