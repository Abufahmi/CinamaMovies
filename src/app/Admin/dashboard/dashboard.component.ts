import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  isUserList: boolean = false;
  isAddUser: boolean = false;
  isUserRolesList: boolean = false;
  isCategoryList: boolean = false;
  isSubCategoryList: boolean = false;
  isActorList: boolean = false;
  isMovieList: boolean = false;
  isMovieLinkList: boolean = false;
  isMovieActorList: boolean = false;


  ngOnInit(): void {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });

    if (sessionStorage.getItem("editUserRole")) {
      this.CheckUserRoleList();
    } else if (sessionStorage.getItem("cat")) {
      this.GetCategoryList();
    } else if (sessionStorage.getItem("subcat")) {
      this.GetSubCategoryList();
    } else if (sessionStorage.getItem("actor")) {
      this.GetActorList();
    } else if (sessionStorage.getItem("movie")) {
      this.GetMovieList();
    } else if (sessionStorage.getItem("movielink")) {
      this.GetMovieLinkList();
    } else if (sessionStorage.getItem("movieactor")) {
      this.GetMovieActorList();
    }
  }

  CheckUser(): boolean {
    this.DisableLists();
    return this.isUserList = true;
  }

  AddUser() {
    this.DisableLists();
    return this.isAddUser = true;
  }

  CheckUserRoleList(): boolean {
    this.DisableLists();
    sessionStorage.setItem('editUserRole', 'editUserRole');
    this.removeAllSessions('editUserRole');
    return this.isUserRolesList = true;
  }

  GetCategoryList() {
    this.DisableLists();
    sessionStorage.setItem('cat', 'cat');
    this.removeAllSessions('cat');
    return this.isCategoryList = true;
  }

  GetSubCategoryList() {
    this.DisableLists();
    sessionStorage.setItem('subcat', 'subcat');
    this.removeAllSessions('subcat');
    return this.isSubCategoryList = true;
  }

  GetActorList() {
    this.DisableLists();
    sessionStorage.setItem('actor', 'actor');
    this.removeAllSessions('actor');
    return this.isActorList = true;
  }

  GetMovieList() {
    this.DisableLists();
    sessionStorage.setItem('movie', 'movie');
    this.removeAllSessions('movie');
    return this.isMovieList = true;
  }

  GetMovieLinkList() {
    this.DisableLists();
    sessionStorage.setItem('movielink', 'movielink');
    this.removeAllSessions('movielink');
    return this.isMovieLinkList = true;
  }

  GetMovieActorList() {
    this.DisableLists();
    sessionStorage.setItem('movieactor', 'movieactor');
    this.removeAllSessions('movieactor');
    return this.isMovieActorList = true;
  }

  DisableLists() {
    this.isCategoryList = false;
    this.isUserRolesList = false;
    this.isAddUser = false;
    this.isUserList = false;
    this.isSubCategoryList = false;
    this.isActorList = false;
    this.isMovieList = false;
    this.isMovieLinkList = false;
    this.isMovieActorList = false;
  }

  removeAllSessions(sessionName: string) {
    Object.keys(sessionStorage).forEach(key=> {
      if (key !== sessionName) {
        sessionStorage.removeItem(key);
      }
    });
  }
}
