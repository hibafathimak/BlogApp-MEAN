import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
})
export class AllCommentsComponent {
  Allcomments: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getComments();

  }

  getComments() {
    this.api.getAllComments().subscribe((res: any) => {
      this.Allcomments = res;
      console.log(this.Allcomments);
    });
  }


  deleteComment(postId: string, CommentId: string) {
    const confirmResult = confirm("Do you want to delete this Comment?");
    if (confirmResult) {
      this.api.deleteAdminComment(postId, CommentId).subscribe((res: any) => {
        alert(res);
        this.getComments(); 
      });
    }
  }
}
