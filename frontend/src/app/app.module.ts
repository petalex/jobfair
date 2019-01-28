import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { GuestComponent } from './guest/guest.component';
import { StudentComponent } from './student/student.component';
import { ResumeComponent } from './resume/resume.component';

import { AuthenticationService } from './authentication.service';
import { GuestService } from './guest.service';
import { StudentService } from './student.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    GuestComponent,
    StudentComponent,
    ResumeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, GuestService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
