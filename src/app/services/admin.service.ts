import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user';
import { UserModel } from '../models/UserModel';
import { EditUserModel } from '../models/EditUserModel';
import { UserRoleModel } from '../models/UserRoleModel';
import { RoleModel } from '../models/RoleModel';
import { EditUserRoleModel } from '../models/EditUserRoleModel';
import { Category } from '../models/CategoryModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://localhost:58314/api/Admin/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
  };

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + 'GetAllUsers', this.headers).pipe();
  }

  AddUser(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + 'AddUser', model, this.headers).pipe();
  }

  GetUser(id: string): Observable<Users> {
    return this.http.get<Users>(this.baseUrl + 'GetUser/' + id, this.headers).pipe();
  }

  EditUser(model: EditUserModel): Observable<Users> {
    return this.http.put<Users>(this.baseUrl + 'EditUser', model, this.headers).pipe();
  }

  DeleteAll(ids: string[]) {
    return this.http.post(this.baseUrl + 'DeleteUsers', ids, this.headers).pipe();
  }

  GetUserRole(): Observable<UserRoleModel[]> {
    return this.http.get<UserRoleModel[]>(this.baseUrl + 'GetUserRole', this.headers).pipe();
  }


  GelAllRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.baseUrl + 'GetAllRoles', this.headers).pipe();
  }

  EditUserRole(model: EditUserRoleModel): Observable<EditUserRoleModel> {
    return this.http.put<EditUserRoleModel>(this.baseUrl + 'EditUserRole', model, this.headers).pipe();
  }

  GetAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'GetCategories', this.headers).pipe();
  }
}