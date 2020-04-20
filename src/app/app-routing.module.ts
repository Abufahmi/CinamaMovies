import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterconfirmComponent } from './Account/registerconfirm/registerconfirm.component';
import { ForgtPasswordComponent } from './Account/forgt-password/forgt-password.component';
import { PasswordconfirmComponent } from './Account/passwordconfirm/passwordconfirm.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerconfirm', component: RegisterconfirmComponent },
  { path: 'forgetpassword', component: ForgtPasswordComponent },
  { path: 'passwordconfirm', component: PasswordconfirmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
