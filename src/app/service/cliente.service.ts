import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Cliente } from './../typeScript/cliente';

@Injectable()
export class ClienteService {

cliente : FirebaseListObservable<Cliente[]>;

  constructor(private db: AngularFireDatabase) {
  	this.cliente = db.list('/typeScript/clientes');
  }

  getClientes(): FirebaseListObservable<Cliente[]>{
  	return this.db.list('/typeScript/clientes');
  }

  addCliente(nuevoCliente: Cliente){
  	this.cliente.push(nuevoCliente);
  }

}