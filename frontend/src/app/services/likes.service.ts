import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  likePost(postId: number): Observable<any> {
    const token = this.tokenService.get();
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`http://127.0.0.1:8000/api/posts/${postId}/like`, {}, { headers });
  }

  unlikePost(postId: number): Observable<any> {
    const token = this.tokenService.get();
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<any>(`http://127.0.0.1:8000/api/posts/${postId}/unlike`, { headers });
  }
}