package de.detim.njustus.person_db.person

import jakarta.persistence.EntityManager
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils

@Service
class PersonService(
    private val personRepository: PersonRepository,
    private val entityManager: EntityManager
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun saveAll(xs: List<Person>): List<Person> {
        log.info("saving {} persons", xs.size)
        return personRepository.saveAll(xs).toList()
    }

    fun isEmpty(): Boolean = personRepository.count() <= 0

    fun findAll(filter: PersonFilter?, pageable: Pageable): Page<Person> {
        log.info("searching with: {} - page: {}", filter, pageable)

        return when (filter) {
            null -> personRepository.findAll(pageable)
            else -> personRepository.findBySearch(if(StringUtils.hasText(filter.lastName)) filter.lastName else null,
                filter.birthDate,
                if(StringUtils.hasText(filter.city)) filter.city else null,
                pageable)
        }
    }
}
