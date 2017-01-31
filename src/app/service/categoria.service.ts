import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Categoria } from './../typeScript/categoria';

@Injectable()
export class CategoriaService {

categoria : FirebaseListObservable<Categoria[]>;

  constructor(private db: AngularFireDatabase) {
  	this.categoria = db.list('/typeScript/categorias');
  }

  getCategorias(): FirebaseListObservable<Categoria[]>{
  	return this.db.list('/typeScript/categorias');
  }

  addCategoria(nuevaCategoria: Categoria){
  	this.categoria.push(nuevaCategoria);
  }

}
