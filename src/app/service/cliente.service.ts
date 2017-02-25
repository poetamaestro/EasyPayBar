import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Cliente } from './../typeScript/cliente';

@Injectable()
export class ClienteService {

  clientes : FirebaseListObservable<Cliente[]>;
  cliente : Cliente = new Cliente();

  constructor(private db: AngularFireDatabase) {
  	this.clientes = db.list('/cliente');
  }

  getClientes(): FirebaseListObservable<Cliente[]> {
  	return this.db.list('/cliente');
  }

  addCliente() {
  	this.clientes.push(this.cliente);
  }

  promoteProveedor(id) {
  	const consultaClienteId = this.db.object('/cliente/' + id);
    consultaClienteId.update({ proveedor: true });
  }

  promoteCliente(id) {
  	const consultaClienteId = this.db.object('/cliente/' + id);
    consultaClienteId.update({ proveedor: false });
  }

  createCliente(nom: string, key : string) : void {
    this.cliente.codigoQR = key;
    this.cliente.nombre = nom;
    this.cliente.estado = true;
    this.cliente.proveedor = false;

    this.cliente.admin = false;


  }

}
