package de.detim.njustus.person_db

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PersonDbApplication

fun main(args: Array<String>) {
	runApplication<PersonDbApplication>(*args)
}
