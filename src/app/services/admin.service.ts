import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user';
import { UserModel } from '../models/UserModel';
import { EditUserModel } from '../models/EditUserModel';

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

  GetUser(id: string): Observable<Users>{
    return this.http.get<Users>(this.baseUrl + 'GetUser/' + id,  this.headers).pipe();
  }

  EditUser(model: EditUserModel): Observable<Users>{
    return this.http.put<Users>(this.baseUrl + 'EditUser', model, this.headers).pipe();
  }

  DeleteAll(ids: string[]){
    return this.http.post(this.baseUrl + 'DeleteUsers', ids, this.headers).pipe();
  }
}
