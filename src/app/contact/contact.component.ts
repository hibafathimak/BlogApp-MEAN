import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  formData = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    description: ''
  };
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private api: ApiService) {}

  onSubmit() {
    if (
      !this.formData.firstname ||
      !this.formData.lastname ||
      !this.formData.email ||
      !this.formData.phone ||
      !this.formData.description
    ) {
      this.errorMessage = "All fields are required.";
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.api.sendMessage(this.formData).subscribe({
      next: (res: any) => {
        this.successMessage = "Your message has been sent successfully!";
        this.formData = { firstname: '', lastname: '', email: '', phone: '', description: '' };
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = "Something went wrong. Please try again.";
        console.error(err);
        this.isSubmitting = false;
      },
    });
  }
}
