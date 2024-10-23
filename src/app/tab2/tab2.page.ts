import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IAsignatura } from '../interfaces/iasignatura';
import { AsignaturasApiService } from '../services/asignaturas-api.service';
import { IPeriodo } from '../interfaces/iperiodo';
import { PeriodoApiService } from '../services/periodo-api.service';
import { AsistenciaApiService } from '../services/asistencia-api.service';
import { Iasistencia } from '../interfaces/iasistencia';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  presentingElement: any;

  Asignaturas: IAsignatura[] = [];
  Periodo: IPeriodo[] = [];

  newAsistencia: Iasistencia={
    periodo:"",
    semestre:"",
    asignatura:"",
    fecha:"",
    docente:"",
  }

  qrdata:string;

  aData: any;

  asistenciaForm: FormGroup;

  isModalOpen = false;

  constructor(private menucontroller:MenuController,
              private alert: AlertController,
              private actionSheetCtrl: ActionSheetController,
              private aApi: AsignaturasApiService,
              private pApi: PeriodoApiService,
              private router: Router,
              private asisApi: AsistenciaApiService,
              private fBuilder: FormBuilder) {
                this.asistenciaForm = this.fBuilder.group({
                  "periodo": new FormControl ("", [Validators.required]),
                  "semestre": new FormControl ("", [Validators.required]),
                  "asignatura": new FormControl ("", [Validators.required]),
                  "fecha": new FormControl ("", [Validators.required]),
                  "docente": new FormControl ("", [Validators.required]),
                })
                this.qrdata='';
              }

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.container');
    
    this.aApi.getAsignatura().subscribe((data: IAsignatura[]) => {
      this.Asignaturas = data;
    });

    this.pApi.getPeriodo().subscribe((data: IPeriodo[]) => {
      this.Periodo = data;
    })
  }

  registrarAsistencia() {
    if (this.asistenciaForm.valid) {
      console.log(this.asistenciaForm.value);
      this.newAsistencia = this.asistenciaForm.value;
  
      if (this.newAsistencia.fecha) {
        this.newAsistencia.fecha = this.newAsistencia.fecha.toString();
      }
  
      this.asisApi.postAsistencia(this.newAsistencia).subscribe(
        () => {
          console.log('Asistencia registrada correctamente');
          this.asistenciaForm.reset();
          
          // Llama al método generarQr aquí
          this.generarQr({
            fecha: this.newAsistencia.fecha,
            docente: this.newAsistencia.docente
          });
  
          this.mostrarMensaje();
        },
        (error) => {
          console.error('Error al registrar asistencia: ', error);
        }
      );
    } else {
      console.log('Formulario inválido', this.asistenciaForm);
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alert.create({
      header: 'Asistencia registrada',
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    alerta.present();
  }

  generarQr(asistencia: { fecha: string; docente: string }) {
    this.qrdata = ''; // Reiniciar la variable qrdata
    
    const correoUsuario = sessionStorage.getItem('correo');
    const rutUsuario = sessionStorage.getItem('rut') || '';
  
    // Limitar el RUT a los primeros 8 caracteres
    const sdv = rutUsuario.length >= 8 ? rutUsuario.slice(0, 8) : rutUsuario;
  
    // Composición de la cadena para el QR
    this.qrdata = `Correo: ${correoUsuario}\nFecha: ${asistencia.fecha}\nRut: ${sdv}\nDocente: ${asistencia.docente}`;
    
    // Para visualizar en la consola o en la interfaz, dependiendo de tu implementación
    console.log(this.qrdata);
  
    // Aquí puedes agregar la lógica para generar y mostrar el código QR
    // Si estás 
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
