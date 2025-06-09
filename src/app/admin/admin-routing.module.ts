import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AllMessagesComponent } from './all-messages/all-messages.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, title: "Admin Dashboard" },
  { path: 'users', component: AllUsersComponent, title: "Users List" },
  { path: 'comments', component: AllCommentsComponent, title: "Comments" },
  { path: 'blogs', component: AllPostsComponent, title: "All Blogs" },
  { path: 'messages', component: AllMessagesComponent, title: "Messages" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

 }
