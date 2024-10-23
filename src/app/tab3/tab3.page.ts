import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ijustificacion } from '../interfaces/ijustificacion';
import { JustificacionApiService } from '../services/justificacion-api.service';
import { IAsignatura } from '../interfaces/iasignatura';
import { AsignaturasApiService } from '../services/asignaturas-api.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  id: any;
  fecha: any;
  asignatura: any;
  docente: any;
  descripcion: any;
  
  imagenSubida: any = {};

  justificacion: Ijustificacion = {
    fecha: "",
    asignatura: "",
    docente: "",
    descripcion: "",
    imagen: ""
  };

  jForm: FormGroup;

  Asignaturas: IAsignatura[] = [];
  
  constructor(private menucontroller:MenuController,
              private jApi: JustificacionApiService,
              private router: Router,
              private aApi: AsignaturasApiService,
              private alert: AlertController,
              private fbuilder: FormBuilder) {
                this.jForm = this.fbuilder.group({
                  "fecha": new FormControl ("", [Validators.required]),
                  "asignatura": new FormControl ("", [Validators.required]),
                  "docente": new FormControl ("", [Validators.required]),
                  "descripcion": new FormControl ("", [Validators.required]),
                  "imagen": new FormControl ("", [Validators.required])
                })
              }

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  ngOnInit(){
    this.aApi.getAsignatura().subscribe((data: IAsignatura[]) => {
      this.Asignaturas = data;
    });
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

  CrearJustificacion() {
    if (this.jForm.valid) {
      if (!this.justificacion.imagen) {
        console.error('La imagen no ha sido cargada');
        return;
      }
  
      this.justificacion.fecha = this.jForm.value.fecha;
      this.justificacion.asignatura = this.jForm.value.asignatura;
      this.justificacion.docente = this.jForm.value.docente;
      this.justificacion.descripcion = this.jForm.value.descripcion;
  
      this.jApi.postJustificacion(this.justificacion).subscribe(
        resp => {
          this.jForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/tabs/tab4');
        },
        error => {
          console.error('Error al guardar la justificación', error);
        }
      );
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alert.create({
      header: 'Justificacion creada',
      cssClass: 'custom-alert',
      buttons: ['OK']
    });
    alerta.present();
  }


}
