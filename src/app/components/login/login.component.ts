import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/model/user.module';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFormGroup!: FormGroup;
  errorMessage: any;


  constructor(private fb: FormBuilder,
    private router: Router,

    private authService: AuthentificationService) {

  }
  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      userName: this.fb.control(""),
      password: this.fb.control("")
    })

    // this.userFormGroup = this.fb.group({
    //   userName: [null, Validators.required],
    //   password: ["", Validators.compose([Validators.required, Validators.minLength(4)])]
    // })

  }
  get f() {
    return this.userFormGroup.controls
  }
  handleLogin() {
    let userName = this.userFormGroup.value.userName;
    let password = this.userFormGroup.value.password;
    this.authService.login(userName, password).subscribe({
      next: (appUser: AppUser) => {
        this.authService.authenticateUsers(appUser).subscribe({
          next: (data) => {
            this.router.navigateByUrl
              ("/admin/products")
          }
        })
      },
      error: (err) => {
        this.errorMessage = err;
      }
    })
  }
}
