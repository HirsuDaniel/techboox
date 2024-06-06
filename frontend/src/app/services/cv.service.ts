import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private baseUrl = 'http://localhost:8000/api/cvs'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createCV(cvData: FormData): Observable<any> {
    // Get the token from local storage or wherever it is stored after login
    const token = localStorage.getItem('token');

    // Set the authorization header with the bearer token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Include headers in the HTTP request
    return this.http.post<any>(this.baseUrl, cvData, { headers });
  }
}
