package de.detim.njustus.person_db.person

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "person")
class Person(
    var firstName: String,
    var lastName: String,
    var email: String,
    var birthDate: LocalDate,

    @OneToOne(cascade = [CascadeType.ALL])
    var address: Address,

    @Id
    @GeneratedValue
    var id: Long? = null,
) {
}
