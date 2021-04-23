import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() productList;
  @Output() action = new EventEmitter();
  selectedProduct;
  constructor() { }

  ngOnInit(): void {
  }

  highLight(product) {
    this.selectedProduct = product.name;
    this.action.emit(product);
  }

}
