import { Component } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fluper-test';
  constructor(
    private readonly homeService: HomeService
  ) {
    this.homeService.getMessage('App module');
  }
}
