import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() { 
    this.storage = window.localStorage;
  }

  set(key: string, value: Object) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return JSON.parse(this.storage.getItem(key));
  }

  has(key: string) {
    return this.storage.getItem(key) != null;
  }


}
