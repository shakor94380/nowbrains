import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  loginInfo: any;

  constructor(
    private authService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
    ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getInfoLog();
  }

  login() {
    this.clearStorage();
    const username = this.formLogin.get('username')?.value;
    const password = this.formLogin.get('password')?.value;
    this.authService.login(username, password)
    .subscribe((res : any) => {
      localStorage.setItem('token', res?.token);
      localStorage.setItem('username', res.account.username);
      localStorage.setItem('userLevel', res.account.userLevel);
      this.getInfoLog();
      this.router.navigate(['/products']);
      this.toast.success(`Welcome ${username}`);
    });
  }

  logout(){
    this.authService.logout();
    this.loginInfo = null;
    this.toast.success('Adieu');
  }

  clearStorage(){
    localStorage.clear();
  }

  getInfoLog(){
    if (localStorage.getItem('token')) {
      const userLevel = localStorage.getItem('userLevel');
      const username = localStorage.getItem('username');
      this.loginInfo = {
        userLevel: userLevel,
        username: username
      };
    };
  }
}
