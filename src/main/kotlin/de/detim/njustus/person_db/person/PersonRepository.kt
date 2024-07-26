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
        SELECT p.*
        FROM PERSON p
        JOIN ADDRESS ON P.ADDRESS_ID = ADDRESS.ID
        WHERE (:lastName IS NULL OR p.LAST_NAME LIKE CONCAT(:lastName, '%'))
          AND (:birthDate IS NULL OR p.BIRTH_DATE >= :birthDate)
          AND (:city IS NULL OR ADDRESS.CITY LIKE CONCAT(:city, '%'))
            """, nativeQuery = true
    )
    fun findBySearch(lastName: String?, birthDate: LocalDate?, city: String?, pageable: Pageable): Page<Person>


    fun findAll(pageable: Pageable): Page<Person>
}
