import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { PostsComponent } from './components/posts/posts.component';
import { CommentComponent } from './components/comment/comment.component';
import { CvsComponent } from './components/cvs/cvs.component';
import { CvDetailsComponent } from './components/cv-details/cv-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'posts',
    component: PostsComponent,
    children: [
      { 
        path: ':postId/comments', 
        component: CommentComponent,
        canActivate: [AfterLoginService]
      }
    ],
    
  },
  {
    path: 'cvs',
    component: CvsComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'cvs/:id',
    component: CvDetailsComponent,
    canActivate: [AfterLoginService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }