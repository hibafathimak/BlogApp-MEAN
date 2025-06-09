import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-blog',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './manage-blog.component.html',
})
export class ManageBlogComponent  {

  loading: boolean = false
  submitting:boolean=false
  blogForm!: FormGroup;
  selectedcoverImg: File | null = null;
  coverImageUrl: string = '';
  id!: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.blogForm = this.fb.group({
      title: [''],
      content: [''],
      category: [''],
      tags: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.getBlogDetails();
    });
  }
  getBlogDetails() {
    this.id ? this.loading=true : this.loading=false
    if (this.id) {
      this.api.getSingleBlogApi(this.id).subscribe((res: any) => {
        this.blogForm.patchValue(res);
        if (res.coverImage) {
          this.coverImageUrl = res.coverImage
        }
        this.loading=false
      });
    }
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedcoverImg = file;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

  submitForm() {

    if (this.blogForm.valid) {
        this.submitting=true
      const formData = new FormData();
      formData.append('title', this.blogForm.value.title);
      formData.append('content', this.blogForm.value.content);
      formData.append('category', this.blogForm.value.category);
      formData.append('tags', this.blogForm.value.tags);

      if (this.selectedcoverImg) {
        formData.append('coverImage', this.selectedcoverImg);
      }

      if (this.id) {
      
        this.api.updateBlogApi(this.id, formData).subscribe({
          next: (res) => {
            this.submitting=false
            alert('Blog updated successfully')
            this.router.navigateByUrl('/profile')
          },
          error: (err) => alert('Failed to update blog',)
        });
      } else {
        this.api.createBlogsApi(formData).subscribe({
          next: (res) => {
            this.submitting=false
            alert('Blog created successfully')
            this.router.navigateByUrl('/profile')
          },
          error: (err) => alert('Failed to create blog')
        });
      }
    }
  }
}
