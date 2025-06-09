import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink,DatePipe,NgFor,NgIf],
  templateUrl: './profile.component.html',

})
export class ProfileComponent {
  profileImg: string ='https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small_2x/user-icon-member-login-isolated-vector.jpg'; 
  userDetails: any = {};
  posts: any[] = [];
 
  loading: boolean = false;
  
  constructor(private api: ApiService, private router: Router) { }
  
  ngOnInit() {
    this.getProfile();
    this.getPosts()
  }
  
  getProfile() {
    this.loading=true
    this.api.getProfile().subscribe({
      next: (res: any) => {
        this.userDetails = res;
        if (this.userDetails.profilePic) {
          this.profileImg=this.userDetails.profilePic
        }
        this.loading=false
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.loading=false
      }
    });
  }
  getPosts() {
    this.api.getUserBlogsApi().subscribe((res: any) => {
      this.posts = res
    });
  }
  deleteBlog(id:any) {
    this.api.deleteBlogApi(id).subscribe((res: any) => {
      alert(res)
      this.getPosts()
    })
  }
}