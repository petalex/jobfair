import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { GuestComponent } from './guest/guest.component';
import { StudentComponent } from './student/student.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path: 'register', component: RegisterComponent}, 
  {path: 'reset', component: ResetComponent}, 

  {path: 'guest', component: GuestComponent}, 

  {path: 'student', component: StudentComponent}, 
  {path: 'student/resume', component: ResumeComponent}, 

  {path: 'admin', redirectTo: '/login', pathMatch: 'full'}, // TO-DO
  {path: 'company', redirectTo: '/login', pathMatch: 'full'}, 

  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
