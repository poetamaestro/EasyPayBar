import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Recarga } from './typeScript/recarga';

@Injectable()
export class RecargaService {

recarga : FirebaseListObservable<Recarga[]>;

  constructor(private db: AngularFireDatabase) {
  	this.recarga = db.list('/typeScript/recarga');
  }

  getRecargas(): FirebaseListObservable<Recarga[]>{
  	return this.db.list('/typeScript/recarga');
  }

  addRecarga(nuevaRecarga: Recarga){
  	this.recarga.push(nuevaRecarga);
  }

}