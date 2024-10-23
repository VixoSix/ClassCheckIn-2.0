import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AsistenciaApiService } from 'src/app/services/asistencia-api.service';
import { AlertController } from '@ionic/angular';
import { Iasistencia } from 'src/app/interfaces/iasistencia';
import { IAsignatura } from 'src/app/interfaces/iasignatura';
import { IPeriodo } from 'src/app/interfaces/iperiodo';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';
import { PeriodoApiService } from 'src/app/services/periodo-api.service';

@Component({
  selector: 'app-editar-asistencia',
  templateUrl: './editar-asistencia.page.html',
  styleUrls: ['./editar-asistencia.page.scss'],
})
export class EditarAsistenciaPage implements OnInit {

  id: any;
  periodo: any;
  semestre: any;
  asignatura: any;
  fecha: any;
  docente: any;

  newAsistencia: any;
  asistencia = {
    id: "",
    periodo: "",
    semestre: "",
    asignatura: "",
    fecha: "",
    docente: ""
  }

  Asignaturas: IAsignatura[] = [];
  Periodos: IPeriodo[] = [];

  constructor(private activated: ActivatedRoute,
              private router: Router,
              private alertcontroller: AlertController,
              private aApi: AsistenciaApiService,
              private asigApi: AsignaturasApiService,
              private pApi: PeriodoApiService) {
                this.activated.queryParams.subscribe(param => {
                  if (param['asistencia']){
                    this.asistencia = JSON.parse(param['asistencia']);
                  } else {
                    console.error('No se encontró asistencia en los queryParams');
                  }
                });
              }

  ngOnInit() {
    this.asigApi.getAsignatura().subscribe((data:IAsignatura[]) => {
      this.Asignaturas = data;
    })
    this.pApi.getPeriodo().subscribe((data:IPeriodo[]) => {
      this.Periodos = data;
    })
  }

  actualizarAsistencia(){
    this.aApi.putAsistencia(this.asistencia).subscribe();
    this.mensaje();
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Actualizando su Asistencia',
      message: 'Su asistencia ha sido actualizada',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/asistencias']);
          },
        },
      ],
    });
    await alert.present();
  }

  volver(){
    this.router.navigate(['/detalle-asistencia']);
  }

}
