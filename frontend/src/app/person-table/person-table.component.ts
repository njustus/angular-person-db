import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Person} from '../../../generated-src/person-api';
import {MatTab} from '@angular/material/tabs';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {EditablePerson} from '../persons/persons.component';

@Component({
  selector: 'app-person-table',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatIcon,
  ],
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.scss'
})
export class PersonTableComponent {
  @Input({required: true})
  public persons: EditablePerson[] = []

  public readonly displayedColumns =
    [
      'id',
      'firstName',
      'lastName',
      'address.city',
      'birthDate',
      'edit'
    ];

  @Output()
  public readonly selected = new EventEmitter<Person>();

  select(p: Person) {
    this.selected.emit(p)
  }

  isEditable(row: any) {
    return row.wasEdited
  }
}
