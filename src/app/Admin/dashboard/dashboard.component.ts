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
  isAddUser:boolean;

  ngOnInit(): void {
    this.isUserList = false;
    this.isAddUser=false;
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
  }

  CheckUser(): boolean {
    return this.isUserList = true;
  }

  AddUser(){
    this.isUserList = false;
    return this.isAddUser = true;
  }

}
