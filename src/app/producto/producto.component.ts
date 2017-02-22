import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from './../typeScript/producto';
import { ProductoService } from '../service/producto.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {
	
  fileList : FirebaseListObservable<Image[]>;
  imageList : Observable<Image[]>;
  storageref;
  storage;
  key;

  @ViewChild('modalProductoEliminar')
  modalEliminar: ModalComponent;

  @ViewChild('modalProductoModificar')
  modalModificar: ModalComponent;

  @ViewChild('modalProductoCrear')
  modalCrear: ModalComponent;

  titulo= "Registro de un Nuevo Producto";
  producto : Producto = new Producto();
  productos : FirebaseListObservable<Producto[]>;

  constructor(private productoServicio: ProductoService, public af: AngularFire) { 
    this.storage = firebase.storage().ref();
  }

  getProductos(): void{
  	this.productos = this.productoServicio.getProductos();
  }

  ngOnInit() {
  	this.getProductos();
    //this.ngOnChanges();
  }

  /*ngOnChanges() {
        console.log("new values for folder");
        let storage = firebase.storage();
        
        this.fileList = this.af.database.list(`productos/images`);
        console.log("Rendering all images in ",`productos/images`)
        this.imageList = this.fileList.map( itemList =>
            itemList.map( item => {
                var pathReference = storage.ref(item.path);
                let result = {$key: item.$key, downloadURL: pathReference.getDownloadURL(), path: item.path, filename: item.filename};
                console.log(result);
                return result;
            })
        );
    }*/

  addProducto() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let storage = firebase.storage();
    // This currently only grabs item 0, TODO refactor it to grab them all
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      // Make local copies of services because "this" will be clobbered
      let path = `productos/${selectedFile.name}`;
      var iRef = storageRef.child(path);
      var pathReference = storage.ref(path);
      iRef.put(selectedFile).then((snapshot) => {
        pathReference.getDownloadURL().then(url => this.productoServicio.addProducto(url, this.producto));
      });
    }
  }

  delete(image: Image) {
    let storagePath = image.path;
    let referencePath = `productos/images/` + image.$key;
    // Do these as two separate steps so you can still try delete ref if file no longer exists
    // Delete from Storage
    firebase.storage().ref().child(storagePath).delete()
    .then(() => {}, (error) => console.error("Error deleting stored file", storagePath));
    // Delete references
    this.af.database.object(referencePath).remove();
    //this.productoServicio.deleteProducto(id);  
  }

  updateProducto() {    
    this.productoServicio.updateProducto(this.key, this.producto);
  }

  deleteProducto() {
    this.productoServicio.deleteProducto(this.key);
  }

  openModalProductoEliminar(id, nombre : string, precio: number, veces: number) {
    this.key = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.veces = veces; 
    this.modalEliminar.open();
  }

  openModalProductoEditar(id, nombre : string, precio: number, veces: number) {
    this.key = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.veces = veces; 
    this.modalModificar.open();
  }

}
