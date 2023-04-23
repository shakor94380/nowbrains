import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister!: FormGroup;
  userLevels = [1,2,3];

  constructor(
    private authService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userLevel: ['', Validators.required]
    });
  }

  register() {
    this.authService.register(this.formRegister.value)
    .subscribe(()=>{
      this.router.navigate(['/login']);
      this.toast.success(`Account created`);
    })
  }

}
