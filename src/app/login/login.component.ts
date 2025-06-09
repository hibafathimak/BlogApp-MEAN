import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("[a-zA-z0-9]*")]]
    })
  }
  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      this.api.loginApi({ email, password }).subscribe({
        next: (res: any) => {
          alert("Login Successful")
          sessionStorage.setItem("token",res.token)
          if (res.user.role == "admin") {
            this.router.navigateByUrl('/admin')

          }else{
            this.router.navigateByUrl('/')
            sessionStorage.setItem("user",JSON.stringify(res.user))
          }
          this.loginForm.reset()
        },
        error: (reason: any)=>{
          alert(reason.error)
          this.loginForm.reset()
        }
      })
    } else {
      alert("Invalid Form")
    }
  }
}