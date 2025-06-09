import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, DatePipe,NgIf],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  blogs: any[] = [];
  blogsPart1: any[] = [];
  blogsPart2: any[] = [];
  loading: boolean = false;
  dividePostsIntoParts() {}

  constructor(private api: ApiService) {}
  ngOnInit() {
    this.getBlogs()
    this.getTopPosts()
  }
  getTopPosts() {
    this.api.getBlogsApi().subscribe((res: any) => {
      const filteredPosts = res.filter((post: any) => 
        post.likes.length > 0 || post.comments.length > 0
      );
  
      const sortedPosts = filteredPosts.sort((a: any, b: any) => {
        const likesDifference = b.likes.length - a.likes.length;
        if (likesDifference !== 0) {
          return likesDifference;
        }
        return b.comments.length - a.comments.length;
      });
  
      this.blogsPart1 = sortedPosts.slice(0, 3);
    });
  }
  getBlogs() {
    this.loading=true
    this.api.getFeaturedPost().subscribe((res: any) => {
      this.blogs = res;
      this.blogsPart2 = this.blogs.slice(3,9);
      this.loading=false
    });
  }
}
