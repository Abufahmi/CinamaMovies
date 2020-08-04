import { Component, OnInit } from '@angular/core';
import { UserRoleModel } from 'src/app/models/UserRoleModel';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

  constructor(
    private service: AdminService
  ) { }

  userRoles: UserRoleModel[];

  ngOnInit(): void {
    this.userRoles = [];

    this.GetUserRole();
  }

  GetUserRole() {
    this.service.GetUserRole().subscribe(s => {
      this.userRoles = s;
      console.log(this.userRoles);
    }, ex => console.log(ex));
  }

}
