import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Afiliado } from './../typeScript/afiliado';

@Injectable()
export class AfiliadoService {

afiliados : FirebaseListObservable<Afiliado[]>;
afiliado: Afiliado = new Afiliado();

  constructor(private db: AngularFireDatabase) {
  	this.afiliados = db.list('/proveedor');
  }

  getAfiliados( id): FirebaseListObservable<Afiliado[]>{
  	return this.db.list('/proveedor/'+id+'/afiliados');
  }

  addAfiliado(nuevoAfiliado: Afiliado){
  	this.afiliados.push(nuevoAfiliado);
  }

}
