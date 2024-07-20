package de.detim.njustus.person_db.person


import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface PersonRepository : CrudRepository<Person, Long> {
    @Query("""
        SELECT person.*
        FROM person
                 JOIN address ON person.ADDRESS_ID = address.ID
        WHERE (:lastName IS NULL OR LAST_NAME LIKE :lastName)
          AND (:birthDate IS NULL OR BIRTH_DATE = :birthDate)
          AND (:city IS NULL OR CITY LIKE :city)
            """, nativeQuery = true
    )
    fun findBySearch(lastName: String?, birthDate: LocalDate?, city: String?, pageable: Pageable): Page<Person>
    fun findAll(pageable: Pageable): Page<Person>
}
