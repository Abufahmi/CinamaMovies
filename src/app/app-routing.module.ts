import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterconfirmComponent } from './Account/registerconfirm/registerconfirm.component';
import { ForgtPasswordComponent } from './Account/forgt-password/forgt-password.component';
import { PasswordconfirmComponent } from './Account/passwordconfirm/passwordconfirm.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { DashboardGaurdService } from './gaurds/dashboard-gaurd.service';
import { EditUserRoleComponent } from './Admin/edit-user-role/edit-user-role.component';
import { AddCategoryComponent } from './Admin/Categories/add-category/add-category.component';
import { SubCategoryComponent } from './Admin/SubCategories/sub-category/sub-category.component';
import { AddActorComponent } from './Admin/Actors/add-actor/add-actor.component';
import { AddMovieComponent } from './Admin/Movies/add-movie/add-movie.component';
import { EditMovieComponent } from './Admin/Movies/edit-movie/edit-movie.component';
import { EditMovieLinkComponent } from './Admin/MovieLinks/edit-movie-link/edit-movie-link.component';
import { EditMovieActorComponent } from './Admin/MovieActors/edit-movie-actor/edit-movie-actor.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerconfirm', component: RegisterconfirmComponent },
  { path: 'forgetpassword', component: ForgtPasswordComponent },
  { path: 'passwordconfirm', component: PasswordconfirmComponent },
  { path: 'controlpanel', component: DashboardComponent, canActivate: [DashboardGaurdService] },
  { path: 'edituser/:id', component: AddUserComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'accessdenied', component: AccessdeniedComponent },
  { path: 'edituserrole/:id/:id1', component: EditUserRoleComponent },
  { path: 'category', component: AddCategoryComponent },
  { path: 'editcategory/:id/:id1', component: AddCategoryComponent },
  { path: 'subcategory', component: SubCategoryComponent },
  { path: 'editsubcategory/:id/:id1/:id2', component: SubCategoryComponent },
  { path: 'addactor', component: AddActorComponent },
  { path: 'editactor/:id', component: AddActorComponent },
  { path: 'editmovie/:id', component: EditMovieComponent },
  { path: 'addmovie', component: AddMovieComponent },
  { path: 'editlinks/:id', component: EditMovieLinkComponent },
  { path: 'addlink', component: EditMovieLinkComponent },
  { path: 'editmovieactor/:id', component: EditMovieActorComponent },
  { path: 'addmovieactor', component: EditMovieActorComponent },
  { path: 'getmovie/:id', component: MovieDetailsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
