import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from './../typeScript/producto';
import { ProductoService } from '../service/producto.service';
import { FirebaseListObservable} from 'angularfire2';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {
	
  @ViewChild('modalProductoEliminar')
  modalEliminar: ModalComponent;

  @ViewChild('modalProductoModificar')
  modalModificar: ModalComponent;

  @ViewChild('modalProductoCrear')
  modalCrear: ModalComponent;


	titulo= "Registro de un Nuevo Producto";
  idProducto = this.getIdProducto();
  imagen= this.getImagen();
  nombre = this.getNombre();
  precio = this.getPrecio();
  veces = this.getVeces();
  producto : Producto = new Producto();
  productos : FirebaseListObservable<Producto[]>;

  constructor(private productoServicio: ProductoService) { }

getProductos(): void{
  	this.productos = this.productoServicio.getProductos();
  }

updateToNewProduct(): void{
	alert("Ingrese el nuevo producto de la categoria");
}


  ngOnInit() {
  	this.getProductos();
  }



 getIdProducto() {
    return this.idProducto;
  }

  setIdProducto(id) {
    this.idProducto = id;
  }

  getImagen() {
    return this.imagen;
  }

  setImagen(imagen: string) {
    this.imagen = imagen;
  }


   getNombre() {
    return this.nombre;
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  getPrecio() {
    return this.precio;
  }

  setPrecio(precio: number) {
    this.precio = precio;
  }

  getVeces() {
    return this.veces;
  }

  setVeces(veces: number) {
    this.veces = veces;
  }


  addProducto() {
    this.productoServicio.addProducto(this.producto);
  }

  deleteProducto(id) {
    this.productoServicio.deleteProducto(id);
  }

  updateProducto(id, imagen: string, nombre : string, precio: number, veces: number) {     
    this.productoServicio.updateProducto(id, imagen, nombre, precio, veces);
  }

  openModalProductoEliminar(id, imagen: string,  nombre : string, precio: number, veces: number) {
    this.modalEliminar.open();
    this.setIdProducto(id);
    this.setImagen(imagen);
    this.setNombre(nombre);
    this.setPrecio(precio);
    this.setVeces(veces);
  }

  openModalProductoEditar(id, imagen: string, nombre : string, precio: number, veces: number) {
    this.modalModificar.open();
    this.setIdProducto(id);
   this.setImagen(imagen);
    this.setNombre(nombre);
    this.setPrecio(precio);
    this.setVeces(veces);
  }

}
