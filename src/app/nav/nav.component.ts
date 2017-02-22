import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {

  public isCollapsed: boolean = true;

  user : any
  pictureUrl : any;
  isLogin : boolean = false;

  constructor(public af: AngularFire,private router: Router) {

    console.log(router.url);

    if(router.url == '/login'){
      this.isLogin = true;
    }

    console.log(this.isLogin);

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.user = auth;
        this.pictureUrl = auth.facebook.photoURL;
      }
    });
  }

  a_login(){
    this.router.navigate(['/login']);
  }
  a_logout() {
    this.af.auth.logout();
    
  }

  ngOnInit() {
  }
}
