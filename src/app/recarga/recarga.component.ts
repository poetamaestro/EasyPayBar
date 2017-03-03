import { Component, OnInit , ViewChild } from '@angular/core';
import {AngularFire,  FirebaseListObservable} from 'angularfire2';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../typeScript/cliente';
import {Subject} from 'rxjs/Subject';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css'],
  providers:[ ClienteService]
})

export class RecargaComponent implements OnInit {

  @ViewChild('modalVerificar')
  modalVerificar: ModalComponent;
  @ViewChild('modalRecargaExitosa')
  modalRecargaExitosa: ModalComponent;

  titulo= "Registro de Credito";
  cliente: Cliente = new Cliente();
  nombre: string = "";
  saldo: number;
  radioValue: string= "";




  clientes: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, public  clienteService: ClienteService) {

    this.af.auth.subscribe(auth => {

      if(auth) {

      }
    });
  }

  buscarCliente(){

    const subject = new Subject();
    const queryObservable = this.af.database.list('/cliente', {
      query: {
        orderByChild: 'nombre',
        startAt: this.nombre,
        limitToFirst: 4

      }
    });
   this.clientes = queryObservable;

    subject.next(this.nombre);
  }

  ngOnInit() {
  }

  setCliente(cliente){
    this.cliente.nombre = cliente.nombre;
    this.cliente.saldo = cliente.saldo;
    this.cliente.codigoQR = cliente.codigoQR;
    this.cliente.estado = cliente.estado;
    this.cliente.key = cliente.$key;


  }
  recargar(){

   this.saldo = parseInt(this.radioValue)+ parseInt(this.cliente.saldo+"");
   this.clienteService.recargarSaldo(this.cliente.key, this.saldo);
    this.modalRecargaExitosa.open();
  }



}
