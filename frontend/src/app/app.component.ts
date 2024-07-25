import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DefaultService} from '../../generated-src/person-api';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'person-db';

  constructor(private readonly defaultService: DefaultService) {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);

    defaultService.pagedPersons().subscribe(page => console.log(page))
  }
}
