import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup
  
  constructor(private fb: FormBuilder, private api: ApiService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern("[a-zA-z ]*")]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("[a-zA-z0-9]*")]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      this.api.registerApi({ username, email, password }).subscribe({
        next: (res: any) => {
          alert("Register Successful")
          this.router.navigateByUrl('/login')
          this.registerForm.reset()
        },
        error: (reason: any) => {
          alert(reason.error)
          this.router.navigateByUrl('/login')
          this.registerForm.reset()
        }
      })
    }
    else {
      alert("invalid form")
    }
  }
}
