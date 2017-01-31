export class Afiliado{
	key: number;
	compras: Array<number>;
	fecha_afiliacion: Date;
	nombre: string;
	recargas: Array<number>;
	saldo: number;
	uid: string;

	constructor(){
		this.key = 0;
	}
}