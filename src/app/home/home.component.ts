import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedProduct;
  productList = [{ name: "An item" },
  { name: "A second item" },
  { name: "A third item" },
  { name: "A fourth item" },
  { name: "And a fifth one" }
  ]
  constructor(
    private readonly homeService: HomeService
  ) {
    this.homeService.getMessage('Home module');
  }

  ngOnInit(): void {
  }


  getListEvent(event) {
    this.selectedProduct = event;
  }
}
