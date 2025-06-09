import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
})
  
export class AllMessagesComponent {
  AllMessages: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getMessages();

  }

  getMessages() {
    this.api.getMessages().subscribe((res: any) => {
      this.AllMessages = res;
      console.log(this.AllMessages);
    });
  }


  deleteMessage(id: string) {
    const confirmResult = confirm("Do you want to delete this Message?");
    if (confirmResult) {
      this.api.deleteMessage(id).subscribe((res: any) => {
        alert(res);
        this.getMessages(); 
      });
    }
  }
}
