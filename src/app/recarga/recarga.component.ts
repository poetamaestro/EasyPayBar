import { Component, OnInit } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
import { Router } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../typeScript/cliente';
import auth = firebase.auth;
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css'],
  providers:[ ClienteService]
})
export class RecargaComponent implements OnInit {

  cliente: Cliente = new Cliente();
  public af: AngularFire;

  constructor() { }

  buscarCliente(nombre:string){
    const subject = new Subject();
    const queryObservable = this.af.database.list('/cliente', {
      query: {
        orderByChild: 'nombre',
        equalTo: subject
      }
    });
    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems);
    });
    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems);
    });
    subject.next('large');
  }
  
  ngOnInit() {
  }

}
