import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../models/Movie';
import { SubCategory } from '../models/SubCatgory';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  subCategories: SubCategory[] = null;
  formSearch: FormGroup;
  movies: Movie[] = null;
  message: string = null;

  ngOnInit(): void {
    this.GetSubCategories();
    this.GetMovies(null);
    this.formSearch = this.fb.group({
      search: ['', Validators.required]
    })
  }

  GetSubCategories() {
    this.homeService.GetAllSubCategories().subscribe(subs => {
      this.subCategories = subs;
    }, ex => {
      console.log(ex);
    })
  }

  GetMovies(search: string) {
    this.homeService.GetAllMovies(search).subscribe(list => {
      this.movies = list;
    }, ex => {
      console.log(ex);
    })
  }

  GetSubCategory(categoryName: string) {
    this.GetMovies(categoryName);
  }

  onSearch() {
    if (this.formSearch.valid) {
      let search = "";
      search = this.formSearch.value.search;
      this.homeService.GetAllMovies(search).subscribe(list => {
        if (list.length > 0) {
          this.movies = list;
          this.message = null;
        }
        else {
          this.movies = null;
          this.message = 'لم يسفر البحث عن اي نتيجة. حاول بكلمات أخري';
        }

        console.log(this.movies);
      }, ex => {
        console.log(ex);
      })
    }
  }

  navigateMovie(id: number) {
    this.router.navigate(['/getmovie', id]);
  }

}
