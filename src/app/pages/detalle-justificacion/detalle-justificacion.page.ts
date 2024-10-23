import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JustificacionApiService } from 'src/app/services/justificacion-api.service';
import { Ijustificaciones } from 'src/app/interfaces/ijustificacion';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-justificacion',
  templateUrl: './detalle-justificacion.page.html',
  styleUrls: ['./detalle-justificacion.page.scss'],
})
export class DetalleJustificacionPage implements OnInit {

  justificacion: any;

  constructor(private activated: ActivatedRoute,
              private router: Router,
              private alertcontroller: AlertController,
              private jApi: JustificacionApiService) { 
                this.activated.queryParams.subscribe(params =>{
                  this.justificacion = JSON.parse(params['user'])
                })
              }

  

  ngOnInit() {

  }

  editarJustificacion(Observable:any){
    this.router.navigate(['/editar-justificacion', this.justificacion.id],
      {queryParams: {justificacion:JSON.stringify(Observable)}}
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
            this.router.navigate(['/tabs/tab4']);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminar(){
    this.jApi.deleteJustificacion(this.justificacion).subscribe();
    this.mensaje();
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Eliminando Justificación',
      message: 'Su justificación ha sido eliminada',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab4']);
          },
        },
      ],
    });
    await alert.present();
  }

  volver(){
    this.router.navigate(['/tabs/tab4']);
  }
}
