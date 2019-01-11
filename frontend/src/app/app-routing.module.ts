import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent}, 

  {path: 'login', component: LoginComponent}, 
  {path: 'register', component: RegisterComponent}, 
  {path: 'reset', component: ResetComponent}, 

  {path: 'student', redirectTo: '/welcome', pathMatch: 'full'}, // TO-DO
  {path: 'admin', redirectTo: '/welcome', pathMatch: 'full'}, 
  {path: 'company', redirectTo: '/welcome', pathMatch: 'full'}, 

  {path: '', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
