import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule,NgIf],
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent {
  profilePic: string =
    'https://i.pinimg.com/564x/18/1c/57/181c572058c6dfef0998df3799128dd1.jpg';
  userDetailsForm!: FormGroup;
  userId: any = '';
  selectedFile: File | null = null;
  loading: boolean = false;
  submitting: boolean = false
  
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userDetailsForm = this.fb.group({
      username: [''],
      email: [''],
      bio: [''],
    });
  }

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user)._id;
      this.getUserDetails();
    }
  }
  getUserDetails() {
    this.loading=true
    this.api.getProfile().subscribe((res: any) => {
      this.userDetailsForm.patchValue(res);
      if (res.profilePic) {
        this.profilePic = res.profilePic
      }
      this.loading=false
    });
  }
  getFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = (e: any) => {
        this.profilePic = e.target.result;
      };
    }
  }

  updateProfile() {
      this.submitting=true
    if (this.userDetailsForm.valid) {
      const formData = new FormData();
      formData.append('username', this.userDetailsForm.value.username);
      formData.append('email', this.userDetailsForm.value.email);
      formData.append('bio', this.userDetailsForm.value.bio);

      if (this.selectedFile) {
        formData.append('profilePic', this.selectedFile);
      }

      this.api.updateProfile(formData).subscribe({
         
        next: (res: any) => {
           this.submitting=false
          alert('Profile updated successfully!');
          this.router.navigateByUrl('/profile');
        },
        error: (err: any) => alert('Failed to update profile'),
      });
    }
  }
}
