import { Afiliado } from "./afiliado";
import { Categoria } from "./categoria";

export class Proveedor{
	key: number;
	afiliados: Array<Afiliado>;
	apellido: string;
	bar: string;
	categoria:Array<Categoria>;
	nombre: string;

	constructor(){
		this.key = 0;
	}
}