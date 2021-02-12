import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieActor } from 'src/app/models/MovieActor';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-movie-actor-list',
  templateUrl: './movie-actor-list.component.html',
  styleUrls: ['./movie-actor-list.component.css']
})
export class MovieActorListComponent implements OnInit {

  constructor(
    private adminSevice: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  formSearch: FormGroup;
  num: number = 0;
  movieActors: MovieActor[] = null;
  movieActor: MovieActor = null;

  ngOnInit(): void {
    this.GetMovieActors(null);

    this.formSearch = this.fb.group({
      search: ['', Validators.required]
    })
  }

  GetMovieActors(search: string) {
    this.adminSevice.GetAllMovieActors(search).subscribe(list => {
      this.movieActors = list;
    }, ex => console.log(ex));
  }

  AddMovieActor() {
    this.router.navigate(['addmovieactor']);
  }

  onSearch() {
    if (this.formSearch.valid) {
      const search = this.formSearch.value.search;
      this.GetMovieActors(search);
    }
  }

  DeleteCount() {
    var count = $(".ckitem:checked").length;
    this.num = count;
  }

  IsDelete() {
    var checkboxes = document.getElementsByClassName('ckitem');
    if (checkboxes.length > 0) {
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          return true;
        }
      }
    }
    return false;
  }

  DeleteConfirm() {
    var checkboxes = document.getElementsByClassName('ckitem');
    if (checkboxes.length > 0) {
      var ids = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          var id = $(checkboxes[i]).val();
          ids.push(id);
        }
      }

      this.adminSevice.DeleteAllMovieActors(ids).subscribe(s => {
        this.GetMovieActors(null);
        $("#btnClose").trigger("click");
      }, ex => console.log(ex));
    }
  }

  SelectAll() {
    var tbl = $('#tbl');
    var header = tbl.find('thead .ckheader');
    var item = tbl.find('tbody .ckitem');

    $(function () {
      item.on('change', function () {
        if ($(this).is(':checked')) {
          $(this).closest('tr').addClass('NewRowColor');
        }
        else {
          $(this).closest('tr').removeClass('NewRowColor');
        }
      });

      header.change(function () {
        var c = this.checked;
        item.prop("checked", c);
        item.trigger('check');
        if ($(this).is(':checked')) {
          $(item).closest('tr').addClass('NewRowColor');
        }
        else {
          $(item).closest('tr').removeClass('NewRowColor');
        }
      });
    });
  }

  ItemChecked(ch: any) {
    console.log(ch);
    if ($(ch)[0].target.checked) {
      $($(ch)[0].path[2]).addClass('NewRowColor');
    }
    else {
      $($(ch)[0].path[2]).removeClass('NewRowColor');
    }
  }

  EditMovieActor(id: number) {
    if (id) {
      this.router.navigate(['/editmovieactor', id]);
    }
  }
}
