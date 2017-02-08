export class Cliente{
	key :number;
	codigoQR: string;
	estado: boolean;
	fecha_Afiliacion: Date;
	fecha_Nacimiento: Date;
	nombre: string;
	proveedor: boolean;

	constructor(values: Object = {}) {
		//Object.assign(this, values);
	}

}
