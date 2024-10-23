import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  Usuario:any;

  asistente = {
    id: "",
    nombre: "",
    apellido: "",
    correo: "",
    nombreUsuario: "",
    contrasenia: "",
    isactive: false,
    imagen: ""
  }

  seleccionarImagen: string | ArrayBuffer | null = null;
  actualizarImagen: any = {};

  constructor(private router: Router,
              private alertcontroller: AlertController,
              private activated: ActivatedRoute,
              private uApi: UsuarioApiService) { 
                this.activated.queryParams.subscribe(param => {
                  this.Usuario = JSON.parse(param['Usuario']);
                  this.asistente = this.Usuario;
                })
              }

  ngOnInit() {
    this.asistente = this.Usuario;
    this.actualizarImagen =  this.asistente.imagen;
    if (this.asistente.imagen){
      this.seleccionarImagen = this.asistente.imagen;
    }
  }

  subirImagen(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file){
      reader.onload = () => {
        this.seleccionarImagen = reader.result;
        this.Usuario.imagen  = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarYSalir(){
    this.uApi.putUsuario(this.asistente).subscribe();
    console.log('Usuario actualizado: ', this.Usuario);
    this.mensaje();
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Mensaje',
      message: 'Su usuario ha sido modificado',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler:() => {
            this.router.navigate(['/perfil']);
          },
        },
      ],
    });
    await alert.present();
  }

  volver(){
    this.router.navigate(['/perfil']);
  }
}
