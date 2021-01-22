import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { UserService } from './../../services/user.service';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      userName: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      isAdmin: new FormControl(false),
      login: new FormControl(''),
      password: new FormControl('')

    })
  }

  saveUser(user){
    console.log(user);
    this.userService.createUserInBackend(user).subscribe(
      (data) =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account Added Successfuly' });
        this.router.navigate(['/login']);
      }
    );

  }

}
