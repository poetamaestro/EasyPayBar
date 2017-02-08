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

deleteProducto(id) {
  	this.db.object('/proveedor/0/categoria/0/producto/' + id).remove();
  }

  updateProducto(id,  imagenProd: string, nombreProd : string, precioProd: number, vecesProd: number) {
  	this.db.object('/proveedor/0/categoria/0/producto/' + id).update({ imagen : imagenProd, nombre : nombreProd, precio : precioProd, veces : vecesProd });
  }
}