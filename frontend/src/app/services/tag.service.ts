import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:8000/api/tags'; // Update with your API endpoint

  constructor(private http: HttpClient, private token: TokenService) { }

  createTag(tagData: { name: string }) {
    const token = this.token.get();
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, tagData, { headers });
  }

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}