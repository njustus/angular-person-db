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
import {PersonDetailComponent} from '../person-table/person-detail/person-detail.component';

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

export interface EditablePerson extends Person {
  wasEdited?: boolean
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
    MatFormFieldModule, MatInputModule, MatDatepickerModule, PersonDetailComponent
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

  persons: EditablePerson[] = []

  totalItems: number = 0
  offset: PaginatorOffset = PaginatorOffset.default()

  personFilter?: PersonFilter;
  selectedPerson: Person | null = null;

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
    this.defaultService.pagedPersons(this.offset.pageSize, this.offset.pageIndex, this.personFilter).subscribe(page => {
      this.persons = page.content
      this.totalItems = page.totalElements
      this.offset = PaginatorOffset.default()

      this.cdr.detectChanges()
      // console.log(page)
    })
  }

  handleSelected($event: Person) {
    this.selectedPerson = $event;
  }

  handleUpdate(updatedPerson: Person) {
    console.log('updating', updatedPerson)
    const idx = this.persons.findIndex(it => it.id === updatedPerson.id)
    this.persons = this.persons.map(it => it.id !== updatedPerson.id ? it : {...updatedPerson, wasEdited: true})
    this.selectedPerson = null
  }
}
