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
    // this.homeService.getMessage('App module');
    let arr = [2, 3, 8, 10, 15, 20];
    let elem = 15
    // console.log(this.linearSearch(arr, elem));
    let char = "omg"
    // console.log(this.nativeSearch(char))
    // this.depthGraphVisited();
    // this.main([4, 20]);
    // this.main([2, 8]);
    // this.main([5, 9]);

    // this.findK();
    // this.insertionSort();
    // console.log(this.bubbleSort());
  }

  bubbleSort() {
    let inputArr = [34, 36, 2, 1, 9, 76, 4];
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (inputArr[j] > inputArr[j + 1]) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
        }
      }
    }
    return inputArr;
  }


  selectionSort() {
    let arr = [34, 36, 2, 1, 9, 76, 4];
    for (let i = 0; i < arr.length; i++) {
      let lowest = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[lowest]) {
          lowest = j;
        }
      }
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;
    }
    console.log(arr);
    return arr;
  }

  insertionSort() {
    let arr = [34, 36, 2, 1, 9, 76, 4];
    for (let i = 1; i < arr.length; i++) {
      let currentValue = arr[i];  // 1
      for (let j = i - 1; j >= 0 && arr[j] > currentValue; j--) {  // 2>1   // arr[0]=2 
        arr[j + 1] = arr[j];
        arr[j] = currentValue;
      }
    }
    console.log(arr);
    return arr;
  }

  findK() {
    let arr = [4, 7, 18, 16, 14];
    let size = arr.length;
    let power = Math.pow(2, 32) - 1;
    for (let i = 0; i < size; i++) {
      let power1 = power;
      let value = this.getValue(arr);
      const max = Math.max(...arr)
      arr = arr.filter(number => number !== max);
      console.log(power1 - value);
    }
  }

  getValue(arr) {
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
      num = num ^ arr[i];
    }
    return num;
  }

  main(input) {
    let start: any = this.compute(input[0]);  // 3
    console.log("start " + start);
    let i = input[0]; // 2
    let next = start; // 3
    while (i < input[1]) {  // (2 < 4)
      console.log("i " + i);
      // console.log("start " + start + "\n" + "next " + next);
      start = start ^ ++i;  // 3 ^ 3 =0  // 0 ^ 4 = 4
      next = next ^ start;  // 3 ^ 0 = 3  // 3 ^ 4 = 7
      console.log("start " + start + "\n" + "next " + next);
    }
    console.log(next + "\n");
  }

  compute(n) {
    switch (n & 3) {
      case 0:
        return n;
      case 1:
        return 1;
      case 2:
        return n + 1;
      default:
        return 0;
    }
  }

  depthGraphVisited() {
    let adjacenyList = {
      a: ['b', 'c'],
      b: ['a', 'd'],
      c: ['a', 'e'],
      d: ['b', 'e', 'f'],
      e: ['c', 'd', 'f'],
      f: ['d', 'e']
    }
    let start = 'a'
    const stack = [start];
    const visited = {};
    const result = [];
    let currentVertex
    visited[start] = true;
    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex);
      adjacenyList[currentVertex].forEach((neighbour) => {
        if (!visited[neighbour]) {
          visited[neighbour] = true;
          stack.push(neighbour);
        }
      });
    }
    console.log(result);
  }


  nativeSearch(ele) {
    let alpha = "wowomgzomg";
    let count = 0;
    for (let i = 0; i < alpha.length; i++) {
      let newChar = `${alpha[i]}${alpha[i + 1]}${alpha[i + 2]}`
      if (newChar == ele) {
        count++
      }
    }
    console.log(count);
    return count;
  }

  linearSearch(arr, elem) {
    // first ascending order
    let start = 0;
    let end = arr.length - 1;
    let middle = Math.floor((start + end) / 2);
    while (arr[middle] != elem && start <= end) {
      if (elem < arr[middle]) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
      middle = Math.floor((start + end) / 2);
      console.log(start, middle, end);
    }
    return arr[middle] === elem ? middle : console.log(-1);

  }

}
