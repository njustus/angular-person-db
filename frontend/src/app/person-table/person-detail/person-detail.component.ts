import {Component, Input} from '@angular/core';
import {Person} from '../../../../generated-src/person-api';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent {
  @Input({required: true})
  person!: Person;
}
