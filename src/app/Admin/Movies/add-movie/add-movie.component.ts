import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCategory } from 'src/app/models/SubCatgory';
import * as $ from 'jquery';
import { AdminService } from 'src/app/services/admin.service';
import { Actor } from 'src/app/models/Actor';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) { }

  messages = {
    movieName: {
      requierd: 'اسم الفيلم مطلوب'
    },
    story: {
      requierd: 'القصة مطلوبة'
    },
    trailer: {
      requierd: 'اعلان الفيلنم مطلوب'
    },
    catId: {
      requierd: 'التصنيف مطلوب'
    },
    post: {
      requierd: 'ملصق الفيلم مطلوب'
    }
  }

  movieForm: FormGroup;
  subCategories: SubCategory[];
  img: File;
  urlImage: string;
  actors: Actor[];

  ngOnInit(): void {
    this.subCategories = [];
    this.actors = [];
    this.img = null;
    this.urlImage = 'assets/images/img.png';
    this.movieForm = this.fb.group({
      movieName: ['', Validators.required],
      story: ['', Validators.required],
      trailer: ['', Validators.required],
      catId: [0, Validators.required],
      actorId: [0, Validators.required],

      post: [null],

    })

    this.GetSubCategories();
    this.GetActors()
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

  AddMovie() {

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

}
