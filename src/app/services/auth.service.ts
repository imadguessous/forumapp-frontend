import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  loggedIn: boolean = false;
  // loggedIn: boolean = true;

  constructor(private userService: UserService, private router: Router) { }

  setUserToImad(){
    this.userService.getUserByIdFromBackend("5fe7694afe2d1e3e8cd83834").subscribe(
      (data) => {
        this.user = data;
       } ,
      (err) => console.log(err.message)

    );
  }
  isAuth(): boolean {
    return this.loggedIn;
    // return true;
  }

  logIn(login: string, pwd: string){

    this.userService.getUsersFromBackend().subscribe(
      (users) => {
        for (let user of users){
          console.log(user);

          if (user.login === login && user.password === pwd){
            console.log('In');

            this.loggedIn = true;
            this.user = user;
            this.router.navigate(['forums']);
          }
        }
      }
    )
  }

  initUserById(){
    if (this.isAuth && this.user){
      this.userService.getUserByIdFromBackend(this.user._id).subscribe(
        (data) => {
          this.user = data;
         } ,
        (err) => console.log(err.message)

      );
    }
  }

  disconnect(): void{
    this.loggedIn = false;
  }



}
