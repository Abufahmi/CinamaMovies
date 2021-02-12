import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/Actor';
import { Movie } from 'src/app/models/Movie';
import { MovieActor } from 'src/app/models/MovieActor';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-movie-actor',
  templateUrl: './edit-movie-actor.component.html',
  styleUrls: ['./edit-movie-actor.component.css']
})
export class EditMovieActorComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private adminSevice: AdminService,
    private router: Router,
    private activateRoute: ActivatedRoute
    ) { }

  title: string;
  btnTitle: string;
  maForm: FormGroup;
  movieActor: MovieActor = null;
  movies: Movie[] = null;
  actors: Actor[] = null;
  message: string = null;
  id: number = 0;

  messageValidate = {
    actorId: {
      requierd: 'اسم ممثل الفيلم مطلوب',
    },
    movieId: {
      required: 'اسم الفيلم مطلوب',
    },
  };


  ngOnInit(): void {
    this.title = 'اضافة ممثل لفيلم';
    this.btnTitle = 'اضافة';
    this.maForm = this.fb.group({
      actorId: [0, Validators.required],
      movieId: [0, Validators.required],
    })

    this.movieActor = {
      id: 0,
      actor: null,
      actorId: 0,
      movieId: 0,
      movie: null
    }

    this.GetMovies();
    this.GetActors();

    this.activateRoute.paramMap.subscribe(param => {
      var actId = +param.get('id');
      if (actId) {
        this.adminSevice.GetMovieActor(actId).subscribe(act => {
          this.title = 'تعديل بيانات ممثل';
          this.btnTitle = 'تعديل وحفظ';
          this.id = actId;
          this.maForm.patchValue({
            actorId: act.actorId,
            movieId: act.movieId
          });
        }, ex => {
          console.log(ex);
        })

      }
    })
  }

  GetActors() {
    this.adminSevice.GetAllActors().subscribe(list => {
      this.actors = list;
    }, ex => console.log(ex));
  }

  GetMovies() {
    this.adminSevice.GetAllMovies().subscribe(list => {
      this.movies = list;
    }, ex => console.log(ex));
  }


  backToList() {
    sessionStorage.setItem('movieactor', 'movieactor');
    this.router.navigate(['/controlpanel']);
  }

  AddOrEditMovieActor() {
    const movId = this.maForm.value.movieId;
    const actId = this.maForm.value.actorId;
    if (this.maForm.invalid || movId < 1 || actId < 1) {
      return;
    }
    this.movieActor.actorId = actId;
    this.movieActor.movieId = movId;
    
    if (this.id > 0) {
      this.movieActor.id = this.id;
      this.adminSevice.EditMovieActor(this.movieActor).subscribe(result => {
        this.backToList();
      }, ex => console.log(ex));
    } else {
      this.adminSevice.AddMovieActor(this.movieActor).subscribe(result => {
        this.message = 'تم اضافة الممثل بنجاح';
        this.maForm.reset();
        this.maForm.patchValue({
          actorId: 0,
          movieId: 0
        });
      }, ex => console.log(ex));
    }
  }

}
