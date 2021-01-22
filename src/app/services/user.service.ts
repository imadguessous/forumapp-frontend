import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<User> = new Array<User>();
  url: string  = environment.URL_API + "users/";
  // url: string = "http://localhost:3000/users/";

  constructor(private http: HttpClient) { }

  initUsers(): void {
  }

  getUsersFromBackend(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.url);

  }
  getUserByIdFromBackend(id: String): Observable<User> {
    return this.http.get<User>(this.url + id);
  }

  createUserInBackend(user:User): Observable<User>{
    return this.http.post<User>(this.url,user);
  }




}
