import { Component, OnInit, Input } from '@angular/core';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  @Input() questions: any[] = []; // Receive questions from parent component
  responses: { [key: string]: string } = {};

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    // Initialize responses object with default values
    this.questions.forEach(question => {
      this.responses[question.id] = '';
    });
  }

  submitSurvey(): void {
    // Convert responses object to array format expected by the backend
    const surveyResponses = Object.keys(this.responses).map(questionId => ({
      question_id: questionId,
      response: this.responses[questionId]
    }));

    // Submit survey responses to the backend
    this.surveyService.submitSurveyResponses(surveyResponses).subscribe(
      (response) => {
        console.log('Survey submitted successfully:', response);
        // Close the survey modal or perform any other action
      },
      (error) => {
        console.error('Error submitting survey:', error);
        // Handle error
      }
    );
  }
}