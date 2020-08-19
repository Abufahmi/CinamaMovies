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


  ngOnInit(): void {
    this.isUserList = false;
    this.isUserRolesList = false;

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
  }

  CheckUser(): boolean {
    this.isAddUser = false;
    this.isUserRolesList = false;
    return this.isUserList = true;
  }

  AddUser() {
    this.isUserList = false;
    this.isUserRolesList = false;
    return this.isAddUser = true;
  }

  CheckUserRoleList(): boolean {
    this.isAddUser = false;
    this.isUserList = false
    return this.isUserRolesList = true;
  }

}
