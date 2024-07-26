import {Component} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PersonFilter} from '../../../../generated-src/person-api';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {

  constructor() {

  }
}
