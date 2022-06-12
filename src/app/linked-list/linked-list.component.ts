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
    list.push('fine');
    console.log(list);
    list.pop();
    console.log(list);
    this.editDistance();
  }

  editDistance(){
let str1="sunday";
let str2="saturday";
console.log('edit distance')
console.log(this.editDis(str1,str2,str1.length,str2.length));
  }

  min(x,y,z){
if(x<=y && x<=z){
  return x;
}
if(y<=x && y<=z){
  return y;
}
return z;
  }

editDis(str1,str2,m,n){
if(m==0){
  return n;
}
if(n==0){
  return m;
}
if(str1[m-1]==str2[n-1]){
  return this.editDis(str1,str2,m-1,n-1);
}
return 1 + this.min(this.editDis(str1,str2,m,n-1),this.editDis(str1,str2,m-1,n),this.editDis(str1,str2,m-1,n-1))

}

  ngOnInit(): void {
    this.addTwoLinkList();
    console.log(this.parenthesis());
    this.vowel();
  }

  vowel(){
    let list = {
      "head": {
        "val": "a",
        "next": {
          "val": "g",
          "next": {
            "val": "e",
            "next": {
              val:'h',
              next:{
                val:'j',
                next:null
              }
            }
          }
        }
      },
      length:5,
      tail:{
        val:'j',
        next:null
      }
    }

    let node=list.head;
    let arr=[];
while(node){
arr.push(node.val);
node=node.next;
}
console.log('vowel');
console.log(arr);
let arrangeList=arr.reduce((accu,ele)=>{
if(ele=='a' || ele=='e'){
  accu.push(ele);
}else{
  accu.unshift(ele);
}
  return accu;
},[])
console.log(arrangeList);
let list2=new singleLinkedList();
for(let ele of arrangeList){
list2.push(ele);
}
console.log(list2);
}

parenthesis(){
  let expr='{{[()]}}{{()}}';
  let stack = [];
  for(let i = 0; i < expr.length; i++){
      let x = expr[i];
      if (x == '(' || x == '[' || x == '{'){
          stack.push(x);
          continue;
      }
      if (stack.length == 0)
          return false;
      let check;
      switch (x){
      case ')':
          check = stack.pop();
          if (check == '{' || check == '[')
              return false;
          break;

      case '}':
          check = stack.pop();
          if (check == '(' || check == '[')
              return false;
          break;

      case ']':
          check = stack.pop();
          if (check == '(' || check == '{')
              return false;
          break;
      }
  }

  // Check Empty Stack
  return (stack.length == 0);
}
reverseLinkList(list){
  //   "head": {
    //     "val": "8", /// 1
    //     "next": {
    //       "val": "9",
    //       "next": {
    //         "val": "5",
    //         "next": {
    //         "val": "1",  /// 8
    //         "next":null
//}
    //       }
    //     }
    //   },
let node=list.head;
list.head=list.tail;
list.tail=node;
let next;
let prev=null;
for(let i=0;i<list.length;i++){
  next=node.next; //9
  node.next=prev; // 8=null
  prev=node; // 8
  node=next; // 9
}
// [8 ,  9,    5,  1]
// prev node  next
// 1 -> 5 -> 9 -> 8
return list;
}

  addTwoLinkList(){
    var list1=new singleLinkedList();
    list1.push(1);
    list1.push(2);
    list1.push(9);
    list1.push(3);
    list1.push(4);
    list1.push(5);

    var list2=new singleLinkedList();
    list2.push(8);
    list2.push(9);
    list2.push(5);
    list2.push(1);
    console.log('latest');
    console.log(this.reverseLinkList(list2));
    console.log(list1);
    console.log(list2);
    var reverseList1=this.reverse(list1);
    var reverseList2=this.reverse(list2);
    console.log(reverseList1);
    console.log(reverseList2);
    // 543999
    //    198

    let cl1=reverseList1;
    let cl2=reverseList2;
    let carry=0;
    let sum=0;
    let num;
    while(cl1 || cl2){
    sum=(cl1?cl1.val:0) + (cl2?cl2.val:0) + carry;
    carry=Math.floor(sum/10);
    sum=sum>9?sum%10:sum;
num=num?`${sum.toString()}${num}`:sum.toString();
    cl1=cl1?cl1.next: null;
    cl2=cl2?cl2.next:null;
  }

  console.log(carry?`${carry}${num}`:num);
}


  reverse(linkList){
    var head=null;
    var current=linkList.head;
    var tail=linkList.head;
    while(current.next){
      if(!head){
        head=new Node(current.val);
      }else{
        tail=head;
        head=new Node(current.val);
        head.next=tail;
      }
      current=current.next;
    }
    tail=head;
    head=new Node(current.val);
    head.next=tail;
    return head;
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
