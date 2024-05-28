import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit  {
  public form={
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  }

  constructor(private backend:BackendService){}

  public error:any = [];

  ngOnInit(): void {
    
  }

  submitRegister(){
    return this.backend.signup(this.form).subscribe(
      data => console.log(data),
      error => this.handlerError(error)
    );
  }
  handlerError(error:any){
    this.error = error.error.errors;
  }
}
