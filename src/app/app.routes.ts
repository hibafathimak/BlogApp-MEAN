import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { BlogComponent } from './blog/blog.component';
import { ManageBlogComponent } from './manage-blog/manage-blog.component';

export const routes: Routes = [
    {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./admin/admin.module').then((m) => m.AdminModule),
    },
    { path: '', component: HomeComponent, title: 'OneBlog - Home Page' },
    { path: 'login',component: LoginComponent, title: 'OneBlog - Login Page' },
    { path: 'register', component: RegisterComponent, title: 'OneBlog - Register Page' },
    { path: 'about',component: AboutComponent, title: 'OneBlog - About Us' },
    { path: 'contact', component: ContactComponent, title: 'OneBlog - Contact' },
    { path: 'all-blogs', component: AllBlogsComponent, title: 'OneBlog - Blogs' },
    { path: 'blogs/:id',canActivate: [authGuard], component: BlogComponent, title: 'OneBlog - Blog Page' },
    { path: 'profile',canActivate: [authGuard], component: ProfileComponent, title: 'OneBlog - Profile Page' },
    { path: 'profile/edit',canActivate: [authGuard], component: EditProfileComponent, title: 'OneBlog - Edit Profile Page' },
    { path: 'blog/add', canActivate: [authGuard], component: ManageBlogComponent, title: 'OneBlog - Add Blogs' },
    { path: 'blog/edit/:id',canActivate: [authGuard], component: ManageBlogComponent, title: 'OneBlog - Edit Blogs' },

];
