package com.monolieta.starter.extension

import org.springframework.context.MessageSource
import org.springframework.context.i18n.LocaleContextHolder

fun MessageSource.getMessage(value: String): String {
    return this.getMessage(value, null, LocaleContextHolder.getLocale())
}

fun MessageSource.getMessage(value: String, defaultMessage: String): String {
    return getMessage(value, null, defaultMessage, LocaleContextHolder.getLocale()) ?: ""
}
