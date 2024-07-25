package de.detim.njustus.person_db.person

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

data class PersonFilter(
//    val firstName: String?,
    val lastName: String?,
    val birthDate: LocalDate?,
    val city: String?
)

data class MyPaginator(
    val pageSize: Int = 10,
    val pageIndex: Int = 0,
)

@RestController("/persons")
class PersonController(
    private val personService: PersonService
) {

    @PostMapping("/paged")
    fun pagedPersons(
        @RequestBody(required = false) filter: PersonFilter?,
        @RequestParam(required = false, defaultValue = "10") pageSize: Int,
        @RequestParam(required = false, defaultValue = "0") pageIndex: Int
    ): Page<Person> {
        val pageable = PageRequest.of(pageIndex+1, pageSize)
        return personService.findAll(filter, pageable)
    }
}
