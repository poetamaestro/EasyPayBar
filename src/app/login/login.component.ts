import { Component, OnInit ,HostBinding  } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn } from '../router.animation';
import { AdminService } from './adm.service';
import {Admin} from "../typeScript/admin";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''},
  providers:[AdminService]
})
export class LoginComponent implements OnInit {
  userFb = {};
  error: any;
  admins :  FirebaseListObservable<Admin[]>;
  admn: boolean = false;
  contador: number = 0;
  constructor(public af: AngularFire,private router: Router, private adminService: AdminService) {

    this.af.auth.subscribe(auth => {
      if(auth) {

        this.admins.forEach(element => {
          if(auth.uid == element[this.contador +""].$value){
            console.log('es administrador');
            this.admn = true;
            this.router.navigateByUrl('/menu-admin');
          }

          this.contador = this.contador+1;

        });
        if(!this.admn)
        {
          this.router.navigateByUrl('/menu');
        }
      }
    });
  }

  getAdmins(): void{
   this.admins = this.adminService.getAdmins();
  }


  loginFb() {

    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.af.auth.subscribe(user => {
          if(user) {
            // user logged in
            this.userFb = user;

          }
          else {
            // user not logged in
            this.userFb = {};

          }
        });

      }).catch(
      (err) => {
        this.error = err;
      })
  }





  ngOnInit() {
    this.getAdmins();
  }

}
