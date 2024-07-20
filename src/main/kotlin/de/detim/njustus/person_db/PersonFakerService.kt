package de.detim.njustus.person_db

import de.detim.njustus.person_db.person.Address
import de.detim.njustus.person_db.person.Person
import de.detim.njustus.person_db.person.PersonService
import io.github.serpro69.kfaker.Faker
import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Service

@Service
class PersonFakerService(
    val faker: Faker,
    val personService: PersonService
) : CommandLineRunner {
    private val log = LoggerFactory.getLogger(this.javaClass)

    override fun run(vararg args: String?) {
        if(!personService.isEmpty()) {
            log.info("db already filled")
            return
        }
        log.info("generating {} fake persons", LIMIT)

        val persons = (0 until LIMIT).map { fakePerson() }.toList()
        personService.saveAll(persons)
        log.info("{} fake persons saved", LIMIT)
    }

    private fun fakePerson(): Person {
        val lastName = faker.name.lastName()

        return Person(
            faker.name.firstName(),
            lastName,
            faker.internet.email(lastName),
            faker.person.birthDate(25),
            fakeAddress()
        )
    }

    private fun fakeAddress(): Address =
        Address(
            faker.address.streetAddress(),
            faker.address.city()
        )

    companion object {
        const val LIMIT = 5000
    }
}
