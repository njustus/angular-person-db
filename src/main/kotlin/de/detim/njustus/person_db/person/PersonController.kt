package de.detim.njustus.person_db.person

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

data class PersonFilter(
//    val firstName: String?,
    val lastName: String?,
    val birthDate: LocalDate?,
    val city: String?
)

@RestController("/persons")
class PersonController(
    private val personService: PersonService
) {

    @PostMapping("/paged")
    fun pagedPersons(@RequestBody(required = false) filter: PersonFilter?, pageable: Pageable): Page<Person> = personService.findAll(filter, pageable)
}
