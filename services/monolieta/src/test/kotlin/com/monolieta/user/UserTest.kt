package com.monolieta.user

import com.monolieta.starter.test.Model
import org.junit.jupiter.api.Test
import org.springframework.context.i18n.LocaleContextHolder

internal class UserTest : Model() {

    @Test
    override fun `spanish language`() {
        LocaleContextHolder.setLocale(ES)
        checkConstraints(fields = User::class.java.declaredFields)
    }

    @Test
    override fun `english language`() {
        LocaleContextHolder.setLocale(US)
        checkConstraints(fields = User::class.java.declaredFields)
    }
}