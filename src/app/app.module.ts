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
import { EditUserRoleComponent } from './Admin/edit-user-role/edit-user-role.component';
import { CategryListComponent } from './Admin/Categories/categry-list/categry-list.component';
import { AddCategoryComponent } from './Admin/Categories/add-category/add-category.component';
import { SubCategoryListComponent } from './Admin/SubCategories/sub-category-list/sub-category-list.component';
import { SubCategoryComponent } from './Admin/SubCategories/sub-category/sub-category.component';
import { AddActorComponent } from './Admin/Actors/add-actor/add-actor.component';
import { ActorListComponent } from './Admin/Actors/actor-list/actor-list.component';
import { MovieListComponent } from './Admin/Movies/movie-list/movie-list.component';
import { AddMovieComponent } from './Admin/Movies/add-movie/add-movie.component';
import { EditMovieComponent } from './Admin/Movies/edit-movie/edit-movie.component';
import { MovieLinkListComponent } from './Admin/MovieLinks/movie-link-list/movie-link-list.component';
import { EditMovieLinkComponent } from './Admin/MovieLinks/edit-movie-link/edit-movie-link.component';
import { EditMovieActorComponent } from './Admin/MovieActors/edit-movie-actor/edit-movie-actor.component';
import { MovieActorListComponent } from './Admin/MovieActors/movie-actor-list/movie-actor-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


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
    EditUserRoleComponent,
    CategryListComponent,
    AddCategoryComponent,
    SubCategoryListComponent,
    SubCategoryComponent,
    AddActorComponent,
    ActorListComponent,
    MovieListComponent,
    AddMovieComponent,
    EditMovieComponent,
    MovieLinkListComponent,
    EditMovieLinkComponent,
    EditMovieActorComponent,
    MovieActorListComponent,
    MovieDetailsComponent,
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
