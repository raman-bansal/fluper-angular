import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  getMessage(message) {
    alert(`get message from ${message}`)
  }

}


