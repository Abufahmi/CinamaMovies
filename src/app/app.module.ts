import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { RegisterconfirmComponent } from './Account/registerconfirm/registerconfirm.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ForgtPasswordComponent } from './Account/forgt-password/forgt-password.component';
import { PasswordconfirmComponent } from './Account/passwordconfirm/passwordconfirm.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { UserRolesComponent } from './Admin/user-roles/user-roles.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { DashboardGaurdService } from './gaurds/dashboard-gaurd.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterconfirmComponent,
    FooterMenuComponent,
    NavMenuComponent,
    ForgtPasswordComponent,
    PasswordconfirmComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    UserRolesComponent,
    NotFoundComponent,
    AccessdeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DashboardGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
