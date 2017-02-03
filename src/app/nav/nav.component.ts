import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public af: AngularFire,private router: Router) {


  }
  a_login(){
    this.router.navigate(['/login']);
  }
  a_logout() {
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/menu');
  }

  ngOnInit() {
  }

}
