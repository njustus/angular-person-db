import { Component } from '@angular/core';
import {PersonTableComponent} from '../person-table/person-table.component';
import {DefaultService, Person} from '../../../generated-src/person-api';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

export class PaginatorOffset {
  constructor(
  public readonly pageSize: number,
  public readonly pageIndex: number,
  ) {
  }

  static fromPaginationEvent(event: PageEvent): PaginatorOffset {
    return new PaginatorOffset(
      event.pageSize,
      event.pageIndex
    )
  }

  static default(): PaginatorOffset {
    return new PaginatorOffset(10,0)
  }
}

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

  totalItems: number = 0
  offset: PaginatorOffset = PaginatorOffset.default()

  constructor(private readonly defaultService: DefaultService) {
    this.loadPaginatedData()
  }

  handlePageEvent(event: PageEvent) {
    this.offset = PaginatorOffset.fromPaginationEvent(event)
    this.loadPaginatedData()
  }

  private loadPaginatedData() {
    this.defaultService.pagedPersons(this.offset.pageSize, this.offset.pageIndex).subscribe(page => {
      this.persons = page.content
      this.totalItems = page.totalElements
      console.log(page)
    })
  }
}
