import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-cv-details',
  templateUrl: './cv-details.component.html',
  styleUrl: './cv-details.component.css'
})
export class CvDetailsComponent {

  cv: any;

  constructor(private route: ActivatedRoute, private cvService: CvService){}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.cvService.getCV(id).subscribe((data: any) => {
      // Parse JSON strings into objects
      data.personal_details = JSON.parse(data.personal_details[0]);
      data.experiences = data.experiences.map((exp: string) => JSON.parse(exp));
      data.education = data.education.map((edu: string) => JSON.parse(edu));
      data.skills = data.skills.map((skill: string) => JSON.parse(skill));

      this.cv = data;
    });
  }
}
