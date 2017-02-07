import { Component, OnInit } from '@angular/core';
import { Producto } from './../typeScript/producto';
import { ProductoService } from '../service/producto.service';
import { FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {
	
	titulo= "Registro de un Nuevo Producto";
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



}
