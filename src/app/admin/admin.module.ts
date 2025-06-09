import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { AllMessagesComponent } from './all-messages/all-messages.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { NavComponent } from './nav/nav.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DashboardComponent,
    AllUsersComponent,
    AllPostsComponent,
    AllCommentsComponent,
    AllMessagesComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe,
    NgxPaginationModule
  ]
})
export class AdminModule { }
