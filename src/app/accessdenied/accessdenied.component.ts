import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accessdenied',
  templateUrl: './accessdenied.component.html',
  styleUrls: ['./accessdenied.component.css']
})
export class AccessdeniedComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['home']).then(x => { window.location.reload() });
  }

}
