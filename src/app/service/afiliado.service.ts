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
  ActualizarSaldo(id: number , saldo: string ,idAfiliado: number) {
    const consultaAfiliadoId = this.db.object('/proveedor/'+id+'/afiliados/'+idAfiliado);
    consultaAfiliadoId.update({ saldo: saldo });
  }
  addAfiliado(nuevoAfiliado: Afiliado){
  	this.afiliados.push(nuevoAfiliado);
  }

}
