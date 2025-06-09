import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',

})
export class AllUsersComponent {
  users: any[] = [];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.api.getAllUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  deleteUser(id: string, name: string) {
    const confirmResult = confirm(`Do You Want to Delete User :${name} ?`);
    if (confirmResult) {
      this.api.deleteUser(id).subscribe((res: any) => {
        alert(res);
        this.getUsers();
      });
    }
  }
}
