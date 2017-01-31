import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Proveedor } from './../typeScript/proveedor';

@Injectable()
export class ProveedorService {

proveedor : FirebaseListObservable<Proveedor[]>;

  constructor(private db: AngularFireDatabase) {
  	this.proveedor = db.list('/typeScript/proveedor');
  }

  getProveedores(): FirebaseListObservable<Proveedor[]>{
  	return this.db.list('/typeScript/proveedor');
  }

  addProveedor(nuevoProveedor: Proveedor){
  	this.proveedor.push(nuevoProveedor);
  }

}