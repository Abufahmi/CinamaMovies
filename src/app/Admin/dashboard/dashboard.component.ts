import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  isUserList: boolean;
  isAddUser: boolean;
  isUserRolesList: boolean;
  isCategoryList: boolean;
  isSubCategoryList: boolean;
  isActorList: boolean;

  ngOnInit(): void {
    this.isUserList = false;
    this.isActorList = false;
    this.isUserRolesList = false;
    this.isCategoryList = false;
    this.isAddUser = false;
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
    } 
  }

  CheckUser(): boolean {
    this.isActorList = false;
    this.isSubCategoryList = false;
    this.isCategoryList = false;
    this.isAddUser = false;
    this.isUserRolesList = false;
    return this.isUserList = true;
  }

  AddUser() {
    this.isActorList = false;
    this.isSubCategoryList = false;
    this.isCategoryList = false;
    this.isUserList = false;
    this.isUserRolesList = false;
    return this.isAddUser = true;
  }

  CheckUserRoleList(): boolean {
    this.isActorList = false;
    this.isSubCategoryList = false;
    this.isCategoryList = false;
    this.isAddUser = false;
    this.isUserList = false
    return this.isUserRolesList = true;
  }

  GetCategoryList() {
    this.isActorList = false;
    this.isSubCategoryList = false;
    this.isUserRolesList = false;
    this.isAddUser = false;
    this.isUserList = false
    return this.isCategoryList = true;
  }

  GetSubCategoryList() {
    this.isActorList = false;
    this.isCategoryList = false;
    this.isUserRolesList = false;
    this.isAddUser = false;
    this.isUserList = false
    return this.isSubCategoryList = true;
  }

  GetActorList(){
    this.isCategoryList = false;
    this.isUserRolesList = false;
    this.isAddUser = false;
    this.isUserList = false;
    this.isSubCategoryList = false;
    return this.isActorList = true;
  }
}
