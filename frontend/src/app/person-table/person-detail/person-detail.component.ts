import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Person} from '../../../../generated-src/person-api';
import {JsonPipe} from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {SearchFormComponent} from '../search-form/search-form.component';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [
    JsonPipe,
    MatPaginator,
    SearchFormComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButton
  ],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent {
  _person?: Person;

  form = new FormGroup<any>({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    birthDate: new FormControl(),
    id: new FormControl()
  })

  @Output()
  updated = new EventEmitter<Person>();

  @Input()
  set person(p: Person) {
    this._person = p;
    this.form.setValue({
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      birthDate: p.birthDate,
      id: p.id,
    });
  }

  save() {
    const value = {
      ...this._person,
      ...this.form.value,
    };

    // console.log('emitting', value)
    this.updated.emit(value)
  }
}
