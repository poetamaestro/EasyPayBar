import { Component, OnInit } from '@angular/core';
import { Cliente } from './../typeScript/cliente';
import { ClienteService } from '../service/cliente.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers:[ClienteService]
})
export class ClienteComponent implements OnInit {

  titulo = 'Registro de clientes';
  clientes : FirebaseListObservable<Cliente[]>;

  constructor(private clienteServicio: ClienteService) { }

  getClientes():void {
  	this.clientes = this.clienteServicio.getClientes();
  }


  updateToProveedor():void{
  	alert('Hola nuevo proveedor');
  }

  ngOnInit() {
  	this.getClientes();
  }

}
