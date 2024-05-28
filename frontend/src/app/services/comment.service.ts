import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private token: TokenService) { }

  createComment(postId: number, content: string){
    const token = this.token.get();
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}/posts/${postId}/comments`, { content }, { headers });
  }

  getComments(postId: number){
    return this.http.get<any[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }
}