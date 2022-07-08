package com.monolieta.resource

import com.monolieta.starter.test.Model
import org.junit.jupiter.api.Test
import org.springframework.context.i18n.LocaleContextHolder

internal class ResourceTest : Model() {

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