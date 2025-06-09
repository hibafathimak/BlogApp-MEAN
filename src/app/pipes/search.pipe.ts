import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allBlogs: any[], searchKey: string): any[] {
    if (!allBlogs || searchKey.trim() === "") {
      return allBlogs;
    }

    const key = searchKey.toLowerCase();

    return allBlogs.filter((item: any) => {
      const titleMatch = item.title?.toLowerCase().includes(key);
      const tagsMatch = item.tags?.some((tag: string) => tag.toLowerCase().includes(key));
      return titleMatch || tagsMatch;
    });
  }
}
