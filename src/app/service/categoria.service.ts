import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Categoria } from './../typeScript/categoria';

@Injectable()
export class CategoriaService {

categoria : FirebaseListObservable<Categoria[]>;

  constructor(private db: AngularFireDatabase) {
  	this.categoria = db.list('/proveedor/0/categoria');
  }

  getCategorias(): FirebaseListObservable<Categoria[]>{
  	return this.db.list('/proveedor/0/categoria');
  }

  addCategoria(nuevaCategoria: Categoria){
  	this.categoria.push(nuevaCategoria);
  }

  deleteCategoria(id) {
  	this.db.object('/proveedor/0/categoria/' + id).remove();
  }

  updateCategoria(id, descripcionCat : string, nombreCat : string) {
  	this.db.object('/proveedor/0/categoria/' + id).update({ descripcion : descripcionCat, nombre : nombreCat });
  }

}
