import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { MovieLink } from 'src/app/models/MovieLink';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-movie-link',
  templateUrl: './edit-movie-link.component.html',
  styleUrls: ['./edit-movie-link.component.css']
})
export class EditMovieLinkComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private adminSevice: AdminService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  title: string;
  btnTitle: string;
  linkForm: FormGroup;
  movieLink: MovieLink = null;
  movieLinks: MovieLink[] = null;
  movies: Movie[] = null;
  message: string = null;
  id: number = 0;
  film: File = null;

  messageValidate = {
    movLink: {
      required: 'الرابط مطلوب',
      valid: 'الرابط المدخل غير صحيح',
    },
    movieId: {
      required: 'اسم الفيلم مطلوب',
    },
    film: {
      requierd: 'الفيلم مطلوب',
    },
  };


  ngOnInit(): void {
    this.title = 'اضافة رابط';
    this.btnTitle = 'اضافة';
    this.linkForm = this.fb.group({
      film: null,
      quality: '',
      resolation: 0,
      movLink: ['', Validators.required],
      movieId: [0, Validators.required],
    })

    this.movieLink = {
      id: 0,
      quality: '',
      resolation: 0,
      movLink: '',
      movieId: 0,
      movie: null
    }

    this.GetMovies();

    this.activateRoute.paramMap.subscribe(param => {
      var linkId = +param.get('id');
      if (linkId) {
        this.adminSevice.GetMovieLink(linkId).subscribe(mov => {
          this.title = 'تعديل رابط';
          this.btnTitle = 'تعديل وحفظ';
          this.id = linkId;
          this.linkForm.patchValue({
            quality: mov.quality,
            resolation: mov.resolation,
            movLink: mov.movLink,
            movieId: mov.movieId,
          });

          if (!mov.movLink.startsWith('http')) {
            const urlImage = 'assets/videos/' + mov.movLink;
            fetch(urlImage).then(res => res.blob()).then(blob => {
              var file = new File([blob], mov.movLink);
              this.film = file;
              var id = $('#mov');
              id[0].src = URL.createObjectURL(this.film);
              id.parent()[0].load();
            })
          }
        }, ex => {
          console.log(ex);
        })

      }
    })
  }

  GetMovies() {
    this.adminSevice.GetAllMovies().subscribe(list => {
      this.movies = list;
    }, ex => console.log(ex));
  }

  backToList() {
    sessionStorage.setItem('movielink', 'movielink');
    this.router.navigate(['/controlpanel']);
  }

  AddMovieLink() {
    if (this.linkForm.valid) {
      if (this.id > 0) {
        const link = this.linkForm.value.movLink;
        if (this.film == null && (link == null || link == '')) {
          return;
        }
       
        const fd = new FormData();
        fd.append('video', this.film);
        fd.append('quality', this.linkForm.value.quality);
        fd.append('resolation', this.linkForm.value.resolation);
        fd.append('movLink', this.linkForm.value.movLink);
        fd.append('movieId', this.linkForm.value.movieId);
        fd.append('id', this.id.toString());
        this.adminSevice.EditMovieLink(fd).subscribe(result => {
          this.backToList();
        }, ex => {
          console.log(ex);
        })
      } else {
        this.movieLink.movLink = this.linkForm.value.movLink;
        this.movieLink.movieId = this.linkForm.value.movieId;
        this.movieLink.quality = this.linkForm.value.quality;
        this.movieLink.resolation = this.linkForm.value.resolation;
        this.adminSevice.AddMovieLink(this.movieLink).subscribe(result => {
          this.message = 'تم اضافة الرابط بنجاح';
          this.linkForm.reset();
        }, ex => {
          console.log(ex);
        })
      }
    }
  }

  HandleFilmes(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.film = event.target.files[0];
      var id = $('#mov');
      id[0].src = URL.createObjectURL(this.film);
      id.parent()[0].load();
    } else {
      this.film = null;
      var id = $('#mov');
      id[0].src = '';
      id.parent()[0].load();
    }
  }

}
