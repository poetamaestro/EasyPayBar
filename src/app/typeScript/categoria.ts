import { Producto } from "./producto";

export class Categoria{
	key: number;
	descripcion: string;
	nombre: string;
	producto: Array<Producto>;

	constructor(){
		this.key = 0;
	}
}