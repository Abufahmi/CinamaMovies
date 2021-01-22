import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCategory } from 'src/app/models/SubCatgory';
import * as $ from 'jquery';
import { AdminService } from 'src/app/services/admin.service';
import { Actor } from 'src/app/models/Actor';
import { Movie } from 'src/app/models/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router:Router
  ) { }

  messages = {
    movieName: {
      requierd: 'اسم الفيلم مطلوب',
      exists: 'اسم الفيلم موجود مسبقا يرجي اختيار اخر'
    },
    story: {
      requierd: 'القصة مطلوبة'
    },
    trailer: {
      requierd: 'اعلان الفيلم مطلوب',
      valid: 'الرابط المدخل غير صحيح'
    },
    catId: {
      requierd: 'التصنيف مطلوب'
    },
    post: {
      requierd: 'ملصق الفيلم مطلوب'
    },
    actorId: {
      requierd: 'اسم ممثل الفيلم مطلوب',
      exists: 'تم اضافة الممثل مسبقا'
    },
    film: {
      requierd: 'الفيلم مطلوب'
    },
    link: {
      requierd: 'رابط التحميل غير صحيح'
    },
  }

  movieForm: FormGroup;
  subCategories: SubCategory[];
  movies: Movie[];
  img: File;
  sucMsg: string;
  errMsg: string;
  film: File;
  urlImage: string;
  actors: Actor[];
  actorIds: number[];
  uploadLinks: string[];
  isActorExists: boolean;
  isAddActor: boolean;
  btnActor: string;
  linkVal = '(https?|ftp)://(www\d?|[a-zA-Z0-9]+)?\.[a-zA-Z0-9-]+(\:|\.)([a-zA-Z0-9.]+|(\d+)?)([/?].*)?';

  ngOnInit(): void {
    this.subCategories = [];
    this.actors = [];
    this.movies = [];
    this.img = null;
    this.film = null;
    this.urlImage = 'assets/images/img.png';
    this.actorIds = [];
    this.uploadLinks = [];
    this.isActorExists = false;
    this.isAddActor = false;
    this.btnActor = 'اضافة ممثل';
    this.sucMsg = null;
    this.errMsg = null;

    this.movieForm = this.fb.group({
      movieName: ['', Validators.required],
      story: ['', Validators.required],
      trailer: ['', [Validators.required, Validators.pattern(this.linkVal)]],
      catId: [0, Validators.required],
      actorId: [0, Validators.required],
      post: [null, Validators.required],
      film: [null, Validators.required],
      actorControl: this.fb.array([
        this.myActorGroup(0, '')
      ]),
      links: this.fb.array([
        this.myLinkGroup()
      ])
    })

    this.GetSubCategories();
    this.GetActors();
    this.getMovies();
  }

  get links() {
    return this.movieForm.get('links') as FormArray;
  }

  myLinkGroup(): FormGroup {
    return this.fb.group({
      link: ''
    })
  }

  get actorControl() {
    return this.movieForm.get('actorControl') as FormArray;
  }

  myActorGroup(id: number, name: string): FormGroup {
    return this.fb.group({
      actId: id,
      actName: name
    })
  }

  GetActors() {
    this.adminService.GetAllActors().subscribe(actors => {
      this.actors = actors;
    }, ex => {
      console.log(ex);
    })
  }

  GetSubCategories() {
    this.adminService.GetAllSubCategories().subscribe(subs => {
      this.subCategories = subs;
    }, ex => {
      console.log(ex);
    })
  }

  isLinkValid(link: string) {
    const validLink = new RegExp('(https?|ftp)://(www\d?|[a-zA-Z0-9]+)?\.[a-zA-Z0-9-]+(\:|\.)([a-zA-Z0-9.]+|(\d+)?)([/?].*)?');
    if (!validLink.test(link)) {
      return true;
    }
    return false;
  }

  addExtraLinkIfExists() {
    for (let li of this.links.controls) {
      const val = li.value.link;
      if (val !== null && val !== '') {
        var exist = false;
        for (let i = 0; i < this.uploadLinks.length; i++) {
          if (val === this.uploadLinks[i]) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          this.uploadLinks.push(val);
        }
      }
    }
    return false;
  }

  AddMovie() {
    const movName = this.movieForm.get('movieName').value;
    if (this.movieForm.valid && this.actorIds.length > 0 && !this.isMovieExists(movName)) {
      this.addExtraLinkIfExists();
      const fd = new FormData();
      fd.append('image', this.img);
      fd.append('video', this.film);
      fd.append('story', this.movieForm.value.story);
      fd.append('movieName', this.movieForm.value.movieName);
      fd.append('trailer', this.movieForm.value.trailer);
      fd.append('catId', this.movieForm.value.catId);
      for (let i = 0; i < this.actorIds.length; i++) {
        fd.append('actorsId[]', this.actorIds[i].toString());
      }
      for (let i = 0; i < this.uploadLinks.length; i++) {
        fd.append('links[]', this.uploadLinks[i].toString());
      }
      this.adminService.AddMovie(fd).subscribe(success => {
        this.sucMsg = 'تم اضافة الفيلم بنجاح';
        this.errMsg = null;
      }, ex => {
        console.log(ex);
        this.sucMsg = null;
        this.errMsg = ex;
      })
    }
  }

  HandleFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
      }
      reader.readAsDataURL(this.img);
    } else {
      this.img = null;
      $('#image').attr('src', 'assets/images/img.png');
    }
  }

  OnActorChange() {
    const id = this.movieForm.value.actorId;
    var txt = $('#actorId option:selected').html();
    if (id > 0 && txt) {
      for (let i = 0; i < this.actorIds.length; i++) {
        const actId = this.actorIds[i];
        if (actId === id) {
          console.log('exists ....');
          this.isActorExists = true;
          return;
        }
      }

      this.isActorExists = false;
      this.actorIds.push(id);
      console.log(this.actorIds);

      (<FormArray>this.movieForm.get('actorControl')).push(this.myActorGroup(id, txt));
    }
  }

  onMyClick(frmGroup: number) {
    var actor = this.movieForm.get(['actorControl', frmGroup]).value;
    var id = actor.actId;
    for (let i = 0; i < this.actorIds.length; i++) {
      var actId = this.actorIds[i];
      if (actId === id) {
        this.actorIds.splice(i, 1);
      }
    }
    console.log(this.actorIds);
  }

  AddActor() {
    if (this.btnActor === 'اضافة ممثل') {
      this.isAddActor = true;
      this.btnActor = 'اخفاء';
    } else {
      this.isAddActor = false;
      this.btnActor = 'اضافة ممثل';
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

  AddLink() {
    (<FormArray>this.movieForm.get('links')).push(this.myLinkGroup());
  }

  getMovies() {
    this.adminService.GetAllMovies().subscribe(list => {
      this.movies = list;
      console.log(list);
    }, ex => console.log(ex));
  }

  isMovieExists(input: string) {
    for (let i = 0; i < this.movies.length; i++) {
      const movieName = this.movies[i].movieName.toLowerCase();
      if (movieName == input?.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  backToList() {
    sessionStorage.setItem('movie', 'movie');
    this.router.navigate(['/controlpanel']);
  }
}
