import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Producto } from './../typeScript/producto';

@Injectable()
export class ProductoService {

producto : FirebaseListObservable<Producto[]>;

  constructor(private db: AngularFireDatabase) {
  	this.producto = db.list('/proveedor/0/categoria/0/producto');
  }

  getProductos(): FirebaseListObservable<Producto[]>{
  	return this.db.list('/proveedor/0/categoria/0/producto');
  }

  addProducto(nuevoProducto: Producto){
  	this.producto.push(nuevoProducto);
  }

}