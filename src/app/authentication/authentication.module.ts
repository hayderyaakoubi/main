import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { SignupComponent } from './signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutes } from './authentication.routing';
import { LoginService } from './login/login.service';
import { SignupService } from './signup/signup.service';
import { LogoutComponent } from './logout/logout/logout.component'



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    HttpClientModule
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    LockComponent,
    Login2Component,
    Signup2Component,
    LogoutComponent
  ],
  providers: [
    LoginService,
    SignupService
]
})

export class AuthenticationModule {}
