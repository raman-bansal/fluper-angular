import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  constructor() {
    let tree = new BinarySearchTree();
    tree.insert(10);
    tree.insert(5);
    tree.insert(13);
    tree.insert(2);
    tree.insert(3);
    tree.insert(11);
    tree.insert(16);
    console.log(tree);
    // treeView like this in object
    // let treeObj = {
    //   value: 10,
    //   left: {  /// smaller than value
    //     value: 6,
    //     left: {},
    //     right: {}
    //   },
    //   right: {  /// greater than value
    //     value: 13,
    //     left: {},
    //     right: {}
    //   }
    // }
  }

  ngOnInit(): void {
  }

}

class BinarySearchTree {
  root
  constructor() {
    this.root = null;
  }

  //        10
  //   5          13
  // 2   7      11    16
  insert(value) {
    var newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this.root;
    } else {
      let current = this.root;
      while (true) {
        if (value == current.value) return undefined;
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else {
          if (!current.right) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }

  find(value) {
    if (!this.root) return false;
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return current;
  }


  dfsPreOrder() {
    var data = [];
    this.preTraverse(data, this.root);
    return data;
  }

  preTraverse(data, node) {
    data.push(node.value);
    if (node.left) this.preTraverse(data, node.left);
    if (node.right) this.preTraverse(data, node.right);
  }


  dfsPostOrder() {
    var data = [];
    this.postTraverse(data, this.root);
    return data;
  }

  postTraverse(data, node) {
    if (node.left) this.postTraverse(data, node.left);
    if (node.right) this.postTraverse(data, node.right);
    data.push(node.value);
  }

  dfsInOrder() {
    var data = [];
    this.inTraverse(data, this.root);
    return data;
  }

  inTraverse(data, node) {
    if (node.left) this.inTraverse(data, node.left);
    data.push(node.value);
    if (node.right) this.inTraverse(data, node.right);
  }
}

class Node {
  value;
  left;
  right;
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}
