import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linked-list',
  templateUrl: './linked-list.component.html',
  styleUrls: ['./linked-list.component.scss']
})

export class LinkedListComponent implements OnInit {
  constructor() {
    // linked list look like this
    // let linkList = {
    //   "head": {
    //     "val": "hello",
    //     "next": {
    //       "val": "raman",
    //       "next": {
    //         "val": "how r u",
    //         "next": null
    //       }
    //     }
    //   },
    //   "tail": {
    //     "val": "how r u",
    //     "next": null
    //   },
    //   "length": 3
    // }
    console.log("hi")
    var list = new singleLinkedList();
    list.push('hello');
    list.push('raman');
    list.push('how r u');
    console.log(list);
  }

  ngOnInit(): void {
  }

}


class Node {
  val
  next;
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class singleLinkedList {
  head;
  tail;
  length;
  constructor() {
    this.head = null
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;
    var current = this.head;
    var newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
}
