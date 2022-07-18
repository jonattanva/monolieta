package com.monolieta.security

import com.monolieta.resource.Resource
import com.monolieta.starter.test.Model
import org.junit.jupiter.api.Test
import org.springframework.context.i18n.LocaleContextHolder

internal class PersonTest : Model() {

    @Test
    override fun `spanish language`() {
        LocaleContextHolder.setLocale(ES)
        checkConstraints(fields = Resource::class.java.declaredFields)
    }

    @Test
    override fun `english language`() {
        LocaleContextHolder.setLocale(US)
        checkConstraints(fields = Resource::class.java.declaredFields)
    }
}