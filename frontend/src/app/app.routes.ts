import { Routes } from '@angular/router';
import {PersonsComponent} from './persons/persons.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "persons",
    pathMatch: "full"
  },
  {
    path: "persons",
    component: PersonsComponent
  }
];
