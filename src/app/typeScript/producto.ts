import { Comentario } from "./comentario";

export class Producto{
	key: number;
	comentario: Array<Comentario>;
	nombre: string;
	precio: number;
	veces: number;

	constructor(){
		this.key = 0;
	}
}