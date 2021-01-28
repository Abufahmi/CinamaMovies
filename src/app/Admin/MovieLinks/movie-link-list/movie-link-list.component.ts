import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieLink } from 'src/app/models/MovieLink';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-movie-link-list',
  templateUrl: './movie-link-list.component.html',
  styleUrls: ['./movie-link-list.component.css']
})
export class MovieLinkListComponent implements OnInit {

  constructor(
    private adminevice: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  num: number = 0;
  movieLinks: MovieLink[] = null;
  formSearch: FormGroup;

  ngOnInit(): void {
    this.GetMovieLinks(null);

    this.formSearch = this.fb.group({
      search: ['', Validators.required]
    })
  }

  GetMovieLinks(search: string) {
    this.adminevice.GetAllMovieLinks(search).subscribe(list => {
      this.movieLinks = list;
    }, ex => console.log(ex));
  }

  AddMovieLink() {
    this.router.navigate(['addlink']);
  }

  EditMovieLink(id: number) {
    if (id) {
      this.router.navigate(['/editlinks', id]);
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

      this.adminevice.DeleteAllMovieLinks(ids).subscribe(s => {
        this.GetMovieLinks(null);
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
      this.GetMovieLinks(search);
    }
  }
}
