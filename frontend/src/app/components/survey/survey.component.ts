// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { SurveyService } from '../../services/survey.service';

// @Component({
//   selector: 'app-survey',
//   templateUrl: './survey.component.html',
//   styleUrls: ['./survey.component.css']
// })
// export class SurveyComponent implements OnInit {
//   @Input() questions: any[] = [];
//   @Input() showSurveyModal: boolean = false;
//   @Output() modalClosed = new EventEmitter<void>();
  
//   responses: { [key: string]: string } = {};

//   constructor(private surveyService: SurveyService) { }

//   ngOnInit(): void {
//     if (this.questions.length > 0) {
//       this.questions.forEach(question => {
//         this.responses[question.id] = '';
//       });
//     }
//   }

//   submitSurvey(): void {
//     const surveyResponses = Object.keys(this.responses).map(questionId => ({
//       question_id: questionId,
//       response: this.responses[questionId]
//     }));

//     this.surveyService.submitSurveyResponses(surveyResponses).subscribe(
//       (response) => {
//         console.log('Survey submitted successfully:', response);
//         this.showSurveyModal = false;
//         this.modalClosed.emit();
//       },
//       (error) => {
//         console.error('Error submitting survey:', error);
//       }
//     );
//   }

//   closeModal() {
//     this.showSurveyModal = false;
//     this.modalClosed.emit();
//   }
// }