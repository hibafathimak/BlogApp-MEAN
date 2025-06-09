import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../service/api.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgxPaginationModule,
    NgClass,
    NgFor,
    DatePipe,
    NgIf,
    RouterLink,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.css'
})
export class AllBlogsComponent {
  filtersVisible = true;
  blogs: any = [];
  allBlogsDummy: any = [];
  allCategory: any = [];
  loading: boolean = false;
  searchKey: string = '';
  sortOrder: string = '';
  p: number = 1;
  selectedCategory: string = '';

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.loading = true;
    this.api.getBlogsApi().subscribe({
      next: (res: any) => {
        this.blogs = res;
        this.blogs = this.shuffleArray(this.blogs);
        this.blogs.forEach((item: any) => {
          if (!this.allCategory.includes(item.category.toLowerCase())) {
            this.allCategory.push(item.category.toLowerCase());
          }
        });
        this.allBlogsDummy = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }

  filterCategory(value: string) {
    this.selectedCategory = value;
    this.blogs = this.allBlogsDummy.filter((item: any) => {
      return item.category.toLowerCase() === value.toLowerCase();
    });
  }

  sortBlogs() {
    if (this.sortOrder === 'newest') {
      this.blogs.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      this.blogs.sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  resetFilter() {
    this.blogs = [...this.allBlogsDummy];
    this.searchKey = '';
    this.selectedCategory = '';
  }
}
