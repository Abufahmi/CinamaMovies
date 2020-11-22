import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  title: string;
  btnTitle: string;
  actorForm: FormGroup;
  message: string;
  id: number;
  img: File;
  urlImage: string;

  messageValidate = {
    actorName: {
      required: 'اسم الممثل مطلوب ',
    },
    actorImage: {
      required: 'صورة الممثل مطلوب ',
    },
  };

  ngOnInit(): void {
    this.title = 'اضافة ممثل جديد';
    this.btnTitle = 'اضافة';
    this.id = 0;
    this.img = null;
    this.urlImage = 'assets/images/User.png';

    this.actorForm = this.fb.group({
      actorName: ['', Validators.required],
      actorImage: [null]
    })

    this.activateRoute.paramMap.subscribe(param => {
      var id = +param.get('id');
      if (id) {
        this.service.GetActor(id).subscribe(actor => {
          this.title = 'تعديل بيانات ممثل';
          this.btnTitle = 'تعديل وحفظ';
          this.id = id;
          this.actorForm.patchValue({
            actorName: actor.actorName
          });
          this.urlImage = 'assets/images/actors/' + actor.actorPicture;
          fetch(this.urlImage).then(res => res.blob()).then(blob => {
            var file = new File([blob], actor.actorPicture);
            this.img = file;
          })
        }, ex => {
          console.log(ex);
        })
      }
    })
  }

  AddActor() {
    if (this.actorForm.valid) {
      const fd = new FormData();
      fd.append('image', this.img);
      fd.append('actorName', this.actorForm.value.actorName);
      this.service.AddActor(fd).subscribe(actor => {
        this.message = 'تم اضافة بيانات الممثل بنجاح';
      }, ex => {
        console.log(ex);
        this.message = null;
      })
    }
  }

  GoToList() {
    sessionStorage.setItem('actor', 'actor');
    this.router.navigate(['/controlpanel']);
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
      $('#image').attr('src', 'assets/images/User.png');
    }
  }

}
