import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service'; // Import TokenService to handle JWT token

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private http: HttpClient, private token: TokenService) { }

  getSurveyQuestions() {
    // Make an HTTP request to fetch survey questions from the backend
    return this.http.get<any[]>('http://127.0.0.1:8000/api/survey/questions');
  }

  submitSurveyResponses(responses: any[]) {

    const token = this.token.get();
    if (!token) {
      throw new Error('No token available');
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    // Make an HTTP request to submit survey responses to the backend
    return this.http.post<any>('http://127.0.0.1:8000/api/survey/responses', { responses }, { headers });
  }

  checkSurveyStatus() {
    const token = this.token.get();
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<{ completed: boolean }>('http://127.0.0.1:8000/api/survey/status', { headers });
  }
}