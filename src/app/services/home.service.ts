import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { MovieActor } from '../models/MovieActor';
import { MovieModel } from '../models/MovieModel';
import { SubCategory } from '../models/SubCatgory';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://localhost:58314/api/Home/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    //withCredentials: true,
  };

  GetAllSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl + 'GetSubCategories', this.headers).pipe();
  }

  GetAllMovies(search: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + 'GetMovies/' + search, this.headers).pipe();
  }

  GetMovie(id: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(this.baseUrl + 'GetMovie/' + id, this.headers).pipe();
  }

  GetMovieByActor(id: number): Observable<MovieActor[]> {
    return this.http.get<MovieActor[]>(this.baseUrl + 'GetMoviesByActor/' + id, this.headers).pipe();
  }

  DownloadVideo(id: number) {
    return this.http.get<File>(this.baseUrl + 'GetVideoById/' + id, this.headers).pipe();
  }

}
