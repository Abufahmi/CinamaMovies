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
      sessionStorage.removeItem("editUserRole");
    } else if (sessionStorage.getItem("cat")) {
      this.GetCategoryList();
      sessionStorage.removeItem("cat");
    } else if (sessionStorage.getItem("subcat")) {
      this.GetSubCategoryList();
      sessionStorage.removeItem("subcat");
    }  else if (sessionStorage.getItem("actor")) {
      this.GetActorList();
      sessionStorage.removeItem("actor");
    } else if (sessionStorage.getItem("movie")) {
      this.GetMovieList();
      sessionStorage.removeItem("movie");
    } else if (sessionStorage.getItem("movielink")) {
      this.GetMovieLinkList();
      sessionStorage.removeItem("movielink");
    } else if (sessionStorage.getItem("movieactor")) {
      this.GetMovieActorList();
      sessionStorage.removeItem("movieactor");
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
    return this.isUserRolesList = true;
  }

  GetCategoryList() {
    this.DisableLists();
    return this.isCategoryList = true;
  }

  GetSubCategoryList() {
    this.DisableLists();
    return this.isSubCategoryList = true;
  }

  GetActorList(){
    this.DisableLists();
    return this.isActorList = true;
  }

  GetMovieList(){
    this.DisableLists();
    return this.isMovieList = true;
  }

  GetMovieLinkList(){
    this.DisableLists();
    return this.isMovieLinkList = true;
  }

  GetMovieActorList(){
    this.DisableLists();
    return this.isMovieActorList = true;
  }

  DisableLists(){
    this.isCategoryList = false;
    this.isUserRolesList = false;
    this.isAddUser = false;
    this.isUserList = false;
    this.isSubCategoryList = false;
    this.isActorList = false;
    this.isMovieList = false;
    this.isMovieLinkList = false;
    this.isMovieActorList=false;
  }
}
