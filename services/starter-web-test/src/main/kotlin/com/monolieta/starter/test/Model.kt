package com.monolieta.starter.test

import org.hibernate.validator.constraints.Length
import org.junit.jupiter.api.Assertions.assertNotNull
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.MessageSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.test.context.ContextConfiguration
import java.lang.reflect.Field
import java.util.*
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull
import javax.validation.constraints.Pattern

@WebMvcTest
@ContextConfiguration(classes = [Runner::class])
abstract class Model {

    companion object {
        val ES: Locale = Locale("es", "CO")
        val US: Locale = Locale.US
    }

    @Autowired
    private lateinit var messageSource: MessageSource

    @Suppress("FunctionName")
    abstract fun `spanish language`()

    @Suppress("FunctionName")
    abstract fun `english language`()

    protected fun checkConstraints(fields: Array<Field>, locale: Locale = LocaleContextHolder.getLocale()) {
        fields.forEach { field ->
            field.annotations.forEach { annotation ->
                when (annotation) {
                    is Length -> {
                        assertNotNull(
                            annotation.message, messageSource.getMessage(annotation.message, null, locale)
                        )
                    }

                    is NotNull -> {
                        assertNotNull(
                            annotation.message, messageSource.getMessage(annotation.message, null, locale)
                        )
                    }

                    is NotEmpty -> {
                        assertNotNull(
                            annotation.message, messageSource.getMessage(annotation.message, null, locale)
                        )
                    }

                    is Pattern -> {
                        assertNotNull(
                            annotation.message, messageSource.getMessage(annotation.message, null, locale)
                        )
                    }
                }
            }
        }
    }

}