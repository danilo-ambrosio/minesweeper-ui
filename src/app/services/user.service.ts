import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly STORAGE_KEY = "user"; 

  private endpoint : string;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.endpoint = `${environment.serverUrl}/users`;
   }

  register(user: User) : Observable<any> {
    return this.http.post<any>(this.endpoint, user);
  }

  manageAuthenticatedUser(user: User) {
    this.localStorageService.set(UserService.STORAGE_KEY, user);
  }

  authenticate(user: User) : Observable<any> {
    return this.http.get<any>(`${this.endpoint}?username=${user.username}&password=${user.password}`);
  }

  hasAuthenticatedUser() : Boolean {
    return this.localStorageService.has(UserService.STORAGE_KEY);
  }

  authenticatedUserId() : string {
    return this.localStorageService.get(UserService.STORAGE_KEY).id;
  }

  enpoint() {
    return this.endpoint;
  }
}
