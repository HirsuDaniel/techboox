import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };

  public error: any = [];
  public showSurveyModal: boolean = false;
  public surveyQuestions: any[] = [];

  constructor(
    private backend: BackendService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {}

  submitLogin() {
    return this.backend.login(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handlerError(error)
    );
  }

  handlerError(error: any) {
    this.error = error.error.error;
  }

  handleResponse(data: any) {
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);

    console.log('Logged in successfully, checking survey status...');
    this.checkSurveyStatus();
  }

  checkSurveyStatus() {
    this.surveyService.checkSurveyStatus().subscribe(
      (status) => {
        console.log('Survey status:', status);
        if (!status.completed) {
          this.openSurveyModal();
        } else {
          this.router.navigateByUrl('posts');
        }
      },
      (error) => {
        console.error('Error checking survey status:', error);
      }
    );
  }

  openSurveyModal() {
    console.log('Fetching survey questions...');
    this.surveyService.getSurveyQuestions().subscribe(
      (surveyQuestions: any[]) => {
        this.surveyQuestions = surveyQuestions;
        console.log('Survey questions:', this.surveyQuestions);
        this.showSurveyModal = true;
      },
      (error) => {
        console.error('Error fetching survey questions:', error);
      }
    );
  }
}