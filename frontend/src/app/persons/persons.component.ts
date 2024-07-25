import { Component } from '@angular/core';
import {PersonTableComponent} from '../person-table/person-table.component';
import {DefaultService, Person} from '../../../generated-src/person-api';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [
    PersonTableComponent,
    MatPaginator
  ],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss'
})
export class PersonsComponent {
  persons: Person[] = []

  constructor(private readonly defaultService: DefaultService) {
    defaultService.pagedPersons().subscribe(page => {
      this.persons = page.content
      console.log(page)
    })
  }
}
