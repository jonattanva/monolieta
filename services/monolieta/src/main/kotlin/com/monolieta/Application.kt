package com.monolieta

import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@EnableWebSecurity
@SpringBootApplication
@EnableJpaRepositories
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args) {
        setBannerMode(Banner.Mode.OFF)
    }
}
