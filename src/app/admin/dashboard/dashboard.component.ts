import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  blogCount: number = 0;
  commentCount: number = 0;
  reportCount: number = 0;

  latestMessages: any[] = [];
  topPosts: any[] = [];

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.getBlogCount()
    this.getUserCount()
    this.getCommentCount()
    this.getReportCount()
    this.getTopPosts()
    this.getMessages()
  }

  getUserCount() {
    this.api.getAllUsers().subscribe((res: any) => {
      this.userCount = res.length;
    });
  }
  
  getBlogCount() {
    this.api.getAllPosts().subscribe((res: any) => {
      this.blogCount = res.length;
    });
  }
  
  getCommentCount() {
    this.api.getAllComments().subscribe((res: any) => {
      this.commentCount = res.length;
    });
  }
  
  getReportCount() {
    this.api.getReportedPosts().subscribe((res: any) => {
      this.reportCount = res.reportedPostCount;
    });
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
  
      this.topPosts = sortedPosts.slice(0, 3);
    });
  }
  
  
  getMessages() {
    this.api.getMessages().subscribe((res: any) => {
      const latest = res.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.latestMessages = latest.slice(0, 3)
    });
  }
  

}
