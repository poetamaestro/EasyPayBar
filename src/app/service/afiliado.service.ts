import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Afiliado } from './../typeScript/afiliado';

@Injectable()
export class AfiliadoService {

afiliado : FirebaseListObservable<Afiliado[]>;

  constructor(private db: AngularFireDatabase) {
  	this.afiliado = db.list('/typeScript/afiliado');
  }

  getAfiliados(): FirebaseListObservable<Afiliado[]>{
  	return this.db.list('/typeScript/afiliado');
  }

  addAfiliado(nuevoAfiliado: Afiliado){
  	this.afiliado.push(nuevoAfiliado);
  }

}