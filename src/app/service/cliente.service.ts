import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Cliente } from './../typeScript/cliente';

@Injectable()
export class ClienteService {

cliente : FirebaseListObservable<Cliente[]>;

  constructor(private db: AngularFireDatabase) {
  	this.cliente = db.list('/cliente');
  }

  getClientes(): FirebaseListObservable<Cliente[]>{
  	return this.db.list('/cliente');
  }

  addCliente(nuevoCliente: Cliente){
  	this.cliente.push(nuevoCliente);
  }

}