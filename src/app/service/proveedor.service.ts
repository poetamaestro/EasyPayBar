import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Proveedor } from './../typeScript/proveedor';

@Injectable()
export class ProveedorService {

	proveedor : FirebaseListObservable<Proveedor[]>;

  constructor(private db: AngularFireDatabase) {
  	this.proveedor = db.list('/proveedor');
  }

  getProveedores(): FirebaseListObservable<Proveedor[]>{
  	return this.db.list('/proveedor');
  }

  addProveedor(nuevoProveedor: Proveedor){
  	if (!nuevoProveedor.nombre) { }
    this.proveedor.push(nuevoProveedor);
  }

  removeProveedor(nombre: string) {
  	console.log(nombre);
  	this.db.object('/proveedor').remove();
  }

}