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
        SELECT p
        FROM Person p
        WHERE (:lastName IS NULL OR p.lastName LIKE CONCAT(:lastName, '%'))
          AND (:birthDate IS NULL OR p.birthDate >= :birthDate)
          AND (:city IS NULL OR p.address.city LIKE CONCAT(:city, '%'))
            """
    )
    fun findBySearch(lastName: String?, birthDate: LocalDate?, city: String?, pageable: Pageable): Page<Person>


    fun findAll(pageable: Pageable): Page<Person>
}
