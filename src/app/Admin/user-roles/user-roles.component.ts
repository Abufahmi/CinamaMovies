import { Component, OnInit } from '@angular/core';
import { UserRoleModel } from 'src/app/models/UserRoleModel';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

  constructor(
    private service: AdminService,
    private router: Router
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

  EditUserRole(userId: string, roleId: string) {
    this.router.navigate(['edituserrole', userId, roleId]);
  }

}
