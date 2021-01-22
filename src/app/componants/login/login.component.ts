import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: string;
  pwd: string;

  constructor(private messageService: MessageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    // this.messageService.add({key: 'tc', severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.authService.logIn(this.login, this.pwd);
    // if (this.authService.logIn(this.login,this.pwd)){
    //   this.messageService.add({ severity:'success', summary:'Success', detail:'Login Successful'});
    //   this.router.navigate(['forums']);
    // }
    // else{
    //   this.messageService.add({severity:'error', summary: 'Login Failed', detail: 'Login Or Password Incorrect'});
    // }



  }

}
