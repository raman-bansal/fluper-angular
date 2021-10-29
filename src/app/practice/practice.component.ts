import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // let arr = [2, 3, [2, 4, [2, 1]], [2, 5], [2, 5], 6, 7];
    // let list = [];
    // this.nestedArray(arr, list);
    // console.log(list);
    // this.starPattern();
    this.starPattern2();
  }

  nestedArray(arr, list) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        this.nestedArray(arr[i], list)
      } else {
        list.push(arr[i]);
      }
    }
  }
  starPattern2() {
    let n = 5; // you can take input from prompt or change the value
    let string = "";
    // External loop
    for (let i = 1; i <= n; i++) {
      // printing spaces
      for (let j = 1; j <= n - i; j++) {
        string += " ";
      }
      // printing star
      for (let k = 0; k < 2 * i - 1; k++) {
        string += "*";
      }
      string += "\n";
    }
    console.log(string);
  }

  starPattern() {
    let n = 5;
    let string = "";
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        string += "*";
      }
      string += "\n";
    }
    console.log(string);
  }

}
