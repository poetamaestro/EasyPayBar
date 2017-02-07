import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from './../typeScript/categoria';
import { CategoriaService } from '../service/categoria.service';
import { FirebaseListObservable} from 'angularfire2';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  providers: [CategoriaService]
})
export class CategoriaComponent implements OnInit {

  @ViewChild('modalCategoriaEliminar')
  modalEliminar: ModalComponent;

  @ViewChild('modalCategoriaModificar')
  modalModificar: ModalComponent;

  @ViewChild('modalCategoriaCrear')
  modalCrear: ModalComponent;

	titulo= "Registro de Categorias del Proveedor";
  idCategoria = this.getIdCategoria();
  descripcion = this.getDescripcion();
  nombre = this.getNombre();
  categoria : Categoria = new Categoria();
	categorias : FirebaseListObservable<Categoria[]>;

  constructor(private categoriaServicio: CategoriaService) {   }

getCategorias(): void{
  	this.categorias = this.categoriaServicio.getCategorias();
  }

updateToProduct(): void{
	alert("Ingrese el producto de su categoria");
}

  ngOnInit() {
  	this.getCategorias();
  }

  getIdCategoria() {
    return this.idCategoria;
  }

  setIdCategoria(id) {
    this.idCategoria = id;
  }

  getDescripcion() {
    return this.descripcion;
  }

  setDescripcion(descripcion: string) {
    this.descripcion = descripcion;
  }

  getNombre() {
    return this.nombre;
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  addCategoria() {
    this.categoriaServicio.addCategoria(this.categoria);
  }

  deleteCategoria(id) {
    this.categoriaServicio.deleteCategoria(id);
  }

  updateCategoria(id, descripcion: string, nombre : string) {     
    this.categoriaServicio.updateCategoria(id, descripcion, nombre);
  }

  openModalCategoriaEliminar(id, descripcion: string) {
    this.modalEliminar.open();
    this.setIdCategoria(id);
    this.setDescripcion(descripcion);
  }

  openModalCategoriaEditar(id, descripcion: string, nombre : string) {
    this.modalModificar.open();
    this.setIdCategoria(id);
    this.setDescripcion(descripcion);
    this.setNombre(nombre);
  }
}
