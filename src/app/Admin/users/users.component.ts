import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Users } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private service: AdminService
  ) { }

  users: Users[];

  ngOnInit(): void {
    this.users = null;
    this.service.GetAllUsers().subscribe((list) => {
      this.users = list;
    }, err => console.log(err));
  }

}
