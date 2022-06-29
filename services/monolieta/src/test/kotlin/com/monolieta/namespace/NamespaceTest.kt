package com.monolieta.namespace

import com.monolieta.starter.test.Model
import org.junit.jupiter.api.Test
import org.springframework.context.i18n.LocaleContextHolder

internal class NamespaceTest : Model() {

    @Test
    override fun `spanish language`() {
        LocaleContextHolder.setLocale(ES)
        checkConstraints(fields = Namespace::class.java.declaredFields)
    }

    @Test
    override fun `english language`() {
        LocaleContextHolder.setLocale(US)
        checkConstraints(fields = Namespace::class.java.declaredFields)
    }
}