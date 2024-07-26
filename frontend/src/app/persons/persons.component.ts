import {ChangeDetectorRef, Component} from '@angular/core';
import {PersonTableComponent} from '../person-table/person-table.component';
import {DefaultService, Person, PersonFilter} from '../../../generated-src/person-api';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {SearchFormComponent} from '../person-table/search-form/search-form.component';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

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
    return new PaginatorOffset(10, 0)
  }
}

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [
    PersonTableComponent,
    MatPaginator,
    SearchFormComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss'
})
export class PersonsComponent {
  form = new FormGroup({
    lastName: new FormControl(),
    birthDate: new FormControl(),
    city: new FormControl(),
  })

  persons: Person[] = []

  totalItems: number = 0
  offset: PaginatorOffset = PaginatorOffset.default()

  personFilter?: PersonFilter;

  constructor(private readonly defaultService: DefaultService,
              private readonly cdr: ChangeDetectorRef
  ) {
    this.loadPaginatedData()

    this.form.valueChanges
      .subscribe(value => {
        console.log("form", value)
        this.personFilter = value
        this.offset = PaginatorOffset.default()
        this.loadPaginatedData()
      })
  }

  handlePageEvent(event: PageEvent) {
    this.offset = PaginatorOffset.fromPaginationEvent(event)
    this.loadPaginatedData()
  }

  private loadPaginatedData() {
    //TODO date filter geht nicht
    this.defaultService.pagedPersons(this.offset.pageSize, this.offset.pageIndex, this.personFilter).subscribe(page => {
      this.persons = page.content
      this.totalItems = page.totalElements
      this.offset = PaginatorOffset.default()

      this.cdr.detectChanges()
      console.log(page)
    })
  }
}
