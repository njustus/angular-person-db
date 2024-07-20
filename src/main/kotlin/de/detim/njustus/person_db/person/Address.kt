package de.detim.njustus.person_db.person

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "address")
class Address(
    var street: String?,
    var city: String,
    @Id
    @GeneratedValue
    var id: Long? = null,
) {
}
