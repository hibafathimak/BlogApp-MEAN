import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl: string = 'https://mean-blog-server.onrender.com';

  constructor(private http: HttpClient) {}

  private appendToken() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  // Auth APIs
  loginApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/login`, reqBody);
  }

  registerApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/register`, reqBody);
  }

  // Profile APIs
  getProfile() {
    return this.http.get(`${this.serverUrl}/profile`, this.appendToken());
  }

  updateProfile(formData: FormData) {
    return this.http.put(`${this.serverUrl}/profile`, formData, this.appendToken());
  }

  // Post APIs
  getBlogsApi() {
    return this.http.get(`${this.serverUrl}/all-posts`);
  }

  getUserBlogsApi() {
    return this.http.get(`${this.serverUrl}/user-posts`,this.appendToken());
  }

  createBlogsApi(formData: FormData) {
    return this.http.post(`${this.serverUrl}/create-post`, formData, this.appendToken());
  }

  getSingleBlogApi(id: any) {
    return this.http.get(`${this.serverUrl}/posts/${id}`, this.appendToken());
  }

  updateBlogApi(id: string, formData: FormData) {
    return this.http.put(`${this.serverUrl}/update/${id}`, formData, this.appendToken());
  }

  deleteBlogApi(id: string) {
    return this.http.delete(`${this.serverUrl}/delete/${id}`, this.appendToken());
  }

  // Post interactions
  likeorUnlikePost(id: string) {
    return this.http.post(`${this.serverUrl}/${id}/likeorUnlike`, {}, this.appendToken());
  }

  addComment(postId: string, commentBody: any) {
    return this.http.post(`${this.serverUrl}/${postId}/comment`, commentBody, this.appendToken());
  }

  deleteComment(postId: string, commentId: string) {
    return this.http.delete(`${this.serverUrl}/delete/${postId}/${commentId}`, this.appendToken());
  }

  reportPost(id: string) {
    return this.http.post(`${this.serverUrl}/post/report/${id}`,{}, this.appendToken());
  }

  // Featured
  getFeaturedPost() {
    return this.http.get(`${this.serverUrl}/featured/random`);
  }

  // Admin APIs
  getAllUsers() {
    return this.http.get(`${this.serverUrl}/admin/users`, this.appendToken());
  }

  getAllPosts() {
    return this.http.get(`${this.serverUrl}/admin/posts`, this.appendToken());
  }

  getAllComments() {
    return this.http.get(`${this.serverUrl}/admin/comments`, this.appendToken());
  }

  getReportedPosts() {
    return this.http.get(`${this.serverUrl}/reported-posts`, this.appendToken());
  }

  deleteAdminPost(id: string) {
    return this.http.delete(`${this.serverUrl}/admin/post/${id}`, this.appendToken());
  }

  deleteAdminComment(postId: string, commentId: string) {
    return this.http.delete(`${this.serverUrl}/admin/comment/${postId}/${commentId}`, this.appendToken());
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.serverUrl}/admin/user/${id}`, this.appendToken());
  }

  // Messages 
  getMessages() {
    return this.http.get(`${this.serverUrl}/messages`, this.appendToken());
  }

  sendMessage( body: any) {
    return this.http.post(`${this.serverUrl}/messages`, body);
  }

  deleteMessage(id: string) {
    return this.http.delete(`${this.serverUrl}/messages/delete/${id}`, this.appendToken());
  }
}