import { Component, OnInit ,ViewChild } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import {AfiliadoService} from '../service/afiliado.service';
import {Afiliado} from '../typeScript/afiliado';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {RecargaService} from '../service/recarga.service';
import {Recarga} from "../typeScript/recarga";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css'],
  providers: [AfiliadoService, RecargaService]
})
export class AfiliadoComponent implements OnInit {
  @ViewChild('modalAfiliado')
  modal: ModalComponent;

  @ViewChild('modalVerificar')
  modalVerificar: ModalComponent;

  @ViewChild('modalRecargaExitosa')
  modalRecargaExitosa: ModalComponent;

  titulo = 'Afiliados';
  afiliados : FirebaseListObservable<Afiliado[]>;
  afiliado: Afiliado = new Afiliado();
  recarga: Recarga = new Recarga();
  isLogin : boolean = false;
  radioValue: string= "";
  date: DatePipe = new DatePipe("en-US");

  private id;
  private sub: any;
  constructor(private router: Router,private route: ActivatedRoute , private afiliadoService: AfiliadoService, private recargaService: RecargaService) {

    if(router.url == '/login') {
      this.isLogin = true;
    }

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.afiliados = this.afiliadoService.getAfiliados(this.id);
    console.log(this.id);



  }
  openModalAfiliado(id: number , nom: string, saldo: string) {
    this.afiliado.key = id;
    this.afiliado.nombre = nom;
    this.afiliado.saldo =  parseInt(saldo);
    console.log(this.afiliado.key);
    this.modal.open();
  }

  recargar() {

    this.modalVerificar.close();
    this.modal.close();
    this.recarga.valor = parseInt(this.radioValue);
    this.recarga.fecha_Recarga =  this.date.transform(new Date(),'dd/MM/yyyy');
    this.recargaService.addRecarga( this.recarga, this.id, this.afiliado.key);
    this.modalRecargaExitosa.open();
  }

}
