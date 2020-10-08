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


  ngOnInit(): void {
    this.isUserList = false;
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
    }
    if (sessionStorage.getItem("cat")) {
      this.GetCategoryList();
      sessionStorage.removeItem("v");
    }
  }

  CheckUser(): boolean {
    this.isCategoryList = false;
    this.isAddUser = false;
    this.isUserRolesList = false;
    return this.isUserList = true;
  }

  AddUser() {
    this.isCategoryList = false;
    this.isUserList = false;
    this.isUserRolesList = false;
    return this.isAddUser = true;
  }

  CheckUserRoleList(): boolean {
    this.isCategoryList = false;
    this.isAddUser = false;
    this.isUserList = false
    return this.isUserRolesList = true;
  }

  GetCategoryList() {
    this.isUserRolesList = false;
    this.isAddUser = false;
    this.isUserList = false
    return this.isCategoryList = true;
  }

}
