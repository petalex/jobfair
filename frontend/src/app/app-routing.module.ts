import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { ChoiceComponent } from './choice/choice.component';

const routes: Routes = [
  {path: 'welcome', component: ChoiceComponent}, 
  {path: 'login/:type', component: LoginComponent}, 
  {path: 'register/:type', component: RegisterComponent}, 
  {path: 'reset/:type', component: ResetComponent}, 
  {path: '', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
