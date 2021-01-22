import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Movie } from 'src/app/models/Movie';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(
    private service: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  movies: Movie[];
  num: number;
  formSearch: FormGroup;

  ngOnInit(): void {
    this.num = 0;
    this.movies = [];
    this.getMovies();

    this.formSearch = this.fb.group({
      search: ['', Validators.required]
    })
  }

  getMovies() {
    this.service.GetAllMovies().subscribe(list => {
      this.movies = list;
      console.log(list);
    }, ex => console.log(ex));
  }

  EditMovie(id: number) {
    if (id) {
      this.router.navigate(['editmovie', id]);
    }
  }

  EditLinks(id: number) {
    if (id) {
      this.router.navigate(['editlinks', id]);
    }
  }

  EditActors(id: number) {
    if (id) {
      this.router.navigate(['editmovieactor', id]);
    }
  }

  DeleteCount() {
    var count = $(".ckitem:checked").length;
    this.num = count;
  }

  AddMovie() {
    this.router.navigate(['addmovie']);
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

      this.service.DeleteAllMovies(ids).subscribe(s => {
        this.getMovies();
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

  onSearch() {
    if (this.formSearch.valid) {
      const search = this.formSearch.value.search;
      this.service.SearchMovies(search).subscribe(list => {
        this.movies = list;
      }, ex => {
        console.log(ex);
      })
    }
  }

}
