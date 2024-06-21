import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']  // Corrected to `styleUrls`
})
export class CvsComponent implements OnInit {
  cvForm!: FormGroup;
  fileToUpload: File | null = null;

  constructor(private fb: FormBuilder, private cvService: CvService) { }

  ngOnInit(): void {
    this.cvForm = this.fb.group({
      personal_details: this.fb.group({
        name: [''],
        email: [''],
        address: [''],
        phone: [''],
      }),
      experiences: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      image: [null]
    });
  }

  get experiences() {
    return this.cvForm.get('experiences') as FormArray;
  }

  get education() {
    return this.cvForm.get('education') as FormArray;
  }

  get skills() {
    return this.cvForm.get('skills') as FormArray;
  }

  addExperience() {
    this.experiences.push(this.fb.group({
      title: [''],
      company: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    }));
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  addEducation() {
    this.education.push(this.fb.group({
      institution: [''],
      degree: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    }));
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  addSkill() {
    this.skills.push(this.fb.group({
      name: ['']
    }));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  handleFileInput(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
    } else {
      console.error('No file selected.');
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('personal_details[]', JSON.stringify(this.cvForm.value.personal_details));
    this.cvForm.value.experiences.forEach((experience: any, index: number) => {
      formData.append(`experiences[${index}]`, JSON.stringify(experience));
    });
    this.cvForm.value.education.forEach((education: any, index: number) => {
      formData.append(`education[${index}]`, JSON.stringify(education));
    });
    this.cvForm.value.skills.forEach((skill: any, index: number) => {
      formData.append(`skills[${index}]`, JSON.stringify(skill));
    });

    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }

    this.cvService.createCV(formData).subscribe(
      () => {
        console.log('CV created successfully');
        this.cvForm.reset();
      },
      error => {
        if (error.status === 400 && error.error.message === 'You already have a CV') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You already have a CV!',
          });
        } else {
          console.error('Error creating CV:', error);
        }
      }
    );
  }
}