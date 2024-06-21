import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {
  companyForm: FormGroup;
  selectedUsers: any[] = [];
  users: any[] = []; // List of users to be fetched from the API

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.companyForm = this.fb.group({
      name: [''],
      address: [''],
      email: [''],
      phone: [''],
      logo: [null],
      user_ids: [[]] // Multi-select for users
    });

    // Fetch users from API and populate the users array
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.companyForm.patchValue({
        logo: file
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.companyForm.controls).forEach(key => {
      if (key === 'user_ids') {
        formData.append(key, JSON.stringify(this.companyForm.get(key)?.value));
      } else {
        formData.append(key, this.companyForm.get(key)?.value);
      }
    });

    this.companyService.createCompany(formData).subscribe(
      response => {
        console.log('Company created successfully');
      },
      error => {
        console.error('Error creating company', error);
      }
    );
  }
}