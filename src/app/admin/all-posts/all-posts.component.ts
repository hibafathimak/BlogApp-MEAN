import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})
export class AllPostsComponent {
  AllBlogs: any;
  searchKey: string = '';
  p: number = 1; 

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getBlogs();
  }


  toggleContent(blog: any): void {
    blog.expanded = !blog.expanded;
  }
  

  getBlogs() {
    this.api.getBlogsApi().subscribe((res: any) => {
      this.AllBlogs = res;
      console.log(this.AllBlogs);
    });
  }

  deleteBlog(blogId: string) {
    const confirmResult = confirm('Do you want to delete this Blog?');
    if (confirmResult) {
      this.api.deleteBlogApi(blogId).subscribe((res: any) => {
        alert(res);
        this.getBlogs();
      });
    }
  }
}
