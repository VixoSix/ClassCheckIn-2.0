import { Component, OnInit } from '@angular/core';
import { JustificacionApiService } from 'src/app/services/justificacion-api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IAsignatura } from 'src/app/interfaces/iasignatura';
import { AsignaturasApiService } from 'src/app/services/asignaturas-api.service';


@Component({
  selector: 'app-editar-justificacion',
  templateUrl: './editar-justificacion.page.html',
  styleUrls: ['./editar-justificacion.page.scss'],
})
export class EditarJustificacionPage implements OnInit {

  id: any;
  fecha: any;
  asignatura: any;
  docente: any;
  descripcion: any;

  newJustificacion: any;
  justificacion = {
    id:"",
    fecha:"",
    asignatura:"",
    docente:"",
    descripcion:"",
    imagen:""
  }

  Asignaturas: IAsignatura[] = [];

  constructor(private jApi: JustificacionApiService,
              private alertcontroller: AlertController,
              private router: Router,
              private aApi: AsignaturasApiService,
              private activated: ActivatedRoute,) { 
                this.activated.queryParams.subscribe(param => {
                  if (param['justificacion']) {
                    this.justificacion = JSON.parse(param['justificacion']);
                  } else {
                    console.error('No se encontró justificación en los queryParams');
                  }
                });
              }

  ngOnInit() {
    // this.justificacion  = this.newJustificacion;
    
    this.aApi.getAsignatura().subscribe((data:IAsignatura[]) => {
      this.Asignaturas = data;
    })
  }

  subirImagen(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();  

    if (file){
      reader.onload = () => {
        this.justificacion.imagen = reader.result as string;
      };
  
      reader.readAsDataURL(file);
    }
  }

  actualizarJustificacion(){
    this.jApi.putJustificacion(this.justificacion).subscribe();
    this.mensaje();
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Actualizando su Justificación',
      message: 'Su justificación ha sido actualizada',
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
    this.router.navigate(['/detalle-justificacion']);
  }

}
