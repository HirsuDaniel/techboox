import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule} from '@angular/common/http';
import { PostsComponent } from './components/posts/posts.component';
import { HeaderComponent } from './components/header/header.component';
import { CommentComponent } from './components/comment/comment.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CvsComponent } from './components/cvs/cvs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CvDetailsComponent } from './components/cv-details/cv-details.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PostsComponent,
    HeaderComponent,
    CommentComponent,
    AvatarComponent,
    CvsComponent,
    CvDetailsComponent,
    CreateCompanyComponent,
    CompanyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
