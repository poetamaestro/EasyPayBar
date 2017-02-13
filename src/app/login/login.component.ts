import { Component, OnInit  } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
import { Router } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../typeScript/cliente';
import { AdminService } from './adm.service';
import {Admin} from "../typeScript/admin";
import auth = firebase.auth;
import {isNumeric} from "rxjs/util/isNumeric";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  providers:[ AdminService,ClienteService]
})
export class LoginComponent implements OnInit {
  userFb = {};
  error: any;
  admins :  FirebaseListObservable<Admin[]>;
  clientes : FirebaseListObservable<Cliente[]>;

  cliente: Cliente = new Cliente();
  contador: number = 0;

  constructor(public af: AngularFire,private router: Router, private adminService: AdminService ,private clienteService: ClienteService) {

    this.af.auth.subscribe(auth => {

      if(auth) {
        this.clienteService.createCliente( auth.facebook.displayName , auth.uid);
        this.clienteService.addCliente();
        this.getClientes(auth);
        this.admins.forEach(element => {

          if(auth.uid == element[this.contador +""].$value){
            this.router.navigateByUrl('/menu-admin');
          }
          this.contador = this.contador+1;

        });
          this.router.navigateByUrl('/menu');
      }
    });
  }

  getAdmins(): void{
   this.admins = this.adminService.getAdmins();
  }

  getClientes(auth) : boolean {
    var registros = 0;
    this.af.database.list('/cliente', { preserveSnapshot: true})
      .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          if(snapshot.val().codigoQR == auth.uid){
            console.log(registros);
              registros = registros+1;
          }


        });
      });

      if(registros > 0 ){

        return true;
      }

      return false;
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
              console.log(user);

          }
          else {
            // user not logged in
            this.userFb = {};
          }

        });

      }

      ).catch(
      (err) => {
        this.error = err;
      })
  }







  ngOnInit() {
    this.getAdmins();

  }

}
