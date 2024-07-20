package de.detim.njustus.person_db.person

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class PersonService(
    private val personRepository: PersonRepository,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun saveAll(xs: List<Person>): List<Person> {
        log.info("saving {} persons", xs.size)
        return personRepository.saveAll(xs).toList()
    }

    fun isEmpty(): Boolean = personRepository.count() <= 0
}
