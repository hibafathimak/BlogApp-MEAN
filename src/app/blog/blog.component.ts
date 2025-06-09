import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
    NgClass,
  ],
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  blogId: string | null = null;
  blog: any = {};
  commentText = '';
  loading: boolean = false;
  currentUserId: any = '';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      if (this.blogId) this.getBlog();
    });
    const user = sessionStorage.getItem('user');
    if (user) {
      this.currentUserId = JSON.parse(user).id;
    }
  }

  getBlog() {
    if (!this.blogId) return;
    this.loading = true;
    this.api.getSingleBlogApi(this.blogId).subscribe((res: any) => {
      this.blog = res;
      console.log(res);
      this.loading = false;
    });
  }

  isReportedByUser(): boolean {
    return this.blog?.reports?.includes(this.currentUserId);
  }

  isLikedByUser(): boolean {
    return this.blog?.likes?.includes(this.currentUserId);
  }
  toggleLike() {
    if (!this.blogId) return;
    this.api.likeorUnlikePost(this.blogId).subscribe(() => {
      this.getBlog();
    });
  }

  reportPost() {
    if (!this.blogId || this.isReportedByUser()) return;

    const confirmReport = confirm(
      'Are you sure you want to report this post? This action cannot be undone.'
    );

    if (!confirmReport) return;

    this.api.reportPost(this.blogId).subscribe({
      next: () => this.getBlog(),
      error: (err) => {
        if (err.status === 400) {
          alert('You already reported this post');
        } else {
          alert('Something went wrong while reporting the post.');
        }
      },
    });
  }

  postComment() {
    if (!this.commentText.trim() || !this.blogId) return;
    this.api
      .addComment(this.blogId, { comment: this.commentText })
      .subscribe(() => {
        this.commentText = '';
        this.getBlog();
      });
  }

  deleteComment(commentId: string) {
    if (!this.blogId || !commentId) return;
    this.api.deleteComment(this.blogId, commentId).subscribe(() => {
      this.getBlog();
    });
  }
}
