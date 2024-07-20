package de.detim.njustus.person_db

import io.github.serpro69.kfaker.Faker
import io.github.serpro69.kfaker.faker
import io.github.serpro69.kfaker.fakerConfig
import org.springframework.beans.factory.annotation.Configurable
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class PersonDbConfig {
    @Bean
    fun faker(): Faker {
        return faker {
            fakerConfig {
                locale = "de"
                randomSeed = 51
            }
        }
    }
}
