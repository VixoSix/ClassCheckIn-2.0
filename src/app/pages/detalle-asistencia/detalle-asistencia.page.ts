import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AsistenciaApiService } from 'src/app/services/asistencia-api.service';
import { Iasistencia } from 'src/app/interfaces/iasistencia';

@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.page.html',
  styleUrls: ['./detalle-asistencia.page.scss'],
})
export class DetalleAsistenciaPage implements OnInit {

  asistencia: any;

  constructor(private activated: ActivatedRoute,
              private router: Router,
              private alertcontroller: AlertController,
              private aApi: AsistenciaApiService) { 
                this.activated.queryParams.subscribe(params =>{
                  this.asistencia = JSON.parse(params['user'])
                })
              }

  ngOnInit() {
  }

  editarAsistencia(Observable:any){
    this.router.navigate(['/editar-asistencia', this.asistencia.id],
      {queryParams: {asistencia: JSON.stringify(Observable)}}
    )
  }

  async consultaEliminar(){
    const alert = await this.alertcontroller.create({
      header: 'Confirmar Eliminación',
      message: 'Elimina la información?',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.eliminar();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/tabs/tab2']);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminar(){
    this.aApi.deleteAsistencia(this.asistencia).subscribe();
    this.mensaje();
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Eliminando Asistencia',
      message: 'Su asistencia ha sido eliminada',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          },
        },
      ],
    });
    await alert.present();
  }

  volver(){
    this.router.navigate(['/asistencias']);
  }

}
