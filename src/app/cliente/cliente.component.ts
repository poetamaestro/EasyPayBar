import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { FirebaseListObservable } from 'angularfire2';
import { Cliente } from './../typeScript/cliente';
import { ProveedorService } from '../service/proveedor.service';
import { Proveedor } from './../typeScript/proveedor';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  providers: [ClienteService, ProveedorService]
})
export class ClienteComponent implements OnInit {

  @ViewChild('modalCliente')
  modal: ModalComponent;

  titulo = 'Registro de Clientes';
  clientes : FirebaseListObservable<Cliente[]>;
  cliente: Cliente = new Cliente();
  proveedor: Proveedor = new Proveedor();
  nombreCliente : string = this.getNombre();
  idCliente = this.getIdCliente();
  proveedorCliente : boolean = this.getProveedorCliente();

    constructor(private clienteServicio: ClienteService, private proveedorServicio: ProveedorService) { }

  getClientes() : void {
    this.clientes = this.clienteServicio.getClientes(); 
  }

  ngOnInit() {
    this.getClientes();
  }

  updateToProveedor(id: number, nombre: string) {
  	this.clienteServicio.promoteProveedor(id);
    this.proveedor.nombre = nombre;
    this.proveedorServicio.addProveedor(this.proveedor);
  }

  updateToCliente(id, nombre: string) {
    this.clienteServicio.promoteCliente(id);
    //this.proveedorServicio.removeProveedor(nombre);
  }

  getNombre() : string {
    return this.nombreCliente;
  }

  setNombre(nombre: string) {
    this.nombreCliente = nombre;
  }

  getIdCliente() {
    return this.idCliente;
  }

  setIdCliente(id) {
    this.idCliente = id;
  }

  getProveedorCliente() : boolean {
    return this.proveedorCliente;
  }

  setProveedorCliente(proveedor: boolean) {
    this.proveedorCliente = proveedor;
  }

  openModalCliente(id: number, nombre: string, proveedor: boolean) {
    this.setNombre(nombre);
    this.setIdCliente(id);
    this.setProveedorCliente(proveedor);
    this.modal.open();
  }

}
