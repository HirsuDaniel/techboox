import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private token: TokenService) { }

  createPost(postData: { title: string, content: string, tags: number[] }) {
    
    const token = this.token.get();
    if (!token) {
      throw new Error('No token available');
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>('http://127.0.0.1:8000/api/posts', postData, { headers });
  }

  getPosts() {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/posts');
  }
}