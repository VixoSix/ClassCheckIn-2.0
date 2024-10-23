import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UsuarioApiService } from '../services/usuario-api.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata:any;

  Usuario={
    id:0,
    nombre:"",
    apellido:"",
    correo:"",
    nombreUsuario:"",
    contrasenia:"",
    rut:"",
    isactive:false
  }

  loginForm:FormGroup;

  constructor(private alert: AlertController,
              private router: Router,
              private toast: ToastController,
              private uApi: UsuarioApiService,
              private builder: FormBuilder) { 
                this.loginForm = this.builder.group({
                  "correo" : new FormControl("", [Validators.required, Validators.minLength(8)]),
                  "contrasenia" : new FormControl("", [Validators.required, Validators.minLength(8)])
                })
              }

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.valid){
      return;
    }
    const correo = this.loginForm.value.correo;
    const contrasenia = this.loginForm.value.contrasenia;

    this.uApi.getCorreo(correo).subscribe(resp => {
      this.userdata = resp;
      console.log(this.userdata);
      if (this.userdata.Length === 0){
        this.loginForm.reset();
        this.UsuarioNoExiste();
        return;
      }

      this.Usuario = {
        id: this.userdata[0].id,
        nombre: this.userdata[0].nombre,
        apellido: this.userdata[0].apellido,
        correo: this.userdata[0].correo,
        nombreUsuario: this.userdata[0].nombreUsuario,
        contrasenia: this.userdata[0].contrasenia,
        rut: this.userdata[0].rut,
        isactive: this.userdata[0].isactive
      }
      if (this.Usuario.contrasenia !== contrasenia){
        this.loginForm.reset();
        this.UsuarioInactivo();
        return;
      }
      this.IniciarSesion(this.Usuario);
    })
  }

  private IniciarSesion(Usuario:any){
    sessionStorage.setItem('nombre',Usuario.nombre);
    sessionStorage.setItem('apellido',Usuario.apellido);
    sessionStorage.setItem('correo',Usuario.correo);
    sessionStorage.setItem('nombreUsuario',Usuario.nombreUsuario);
    sessionStorage.setItem('contrasenia',Usuario.contrasenia);
    sessionStorage.setItem('rut',Usuario.rut);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada');
    this.router.navigate(['/tabs/tab1']);
    this.mensaje();
  }

  async mensaje(){
    const alert = await this.alert.create({
      header: 'Bienvenido',
      message: 'Disfruta de ClassCheckIn',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'OK',
          role: 'confirm',
        },
      ],
    });
    await alert.present();
  }

  async showToast(msg: any){
    const toast = await this.toast.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }

  async UsuarioInactivo(){
    const alerta = await this.alert.create({
      header: 'Usuario Inactivo',
      message: 'Contactar a admin@classcheckin.cl',
      cssClass: 'custom-alert',
      buttons: ['OK']
    })
    alerta.present();
  }

  async ErrorUsuario(){
    const alerta = await this.alert.create({
      header: 'Error',
      message: 'Revise sus credenciales',
      cssClass: 'custom-alert',
      buttons: ['OK']
    })
    alerta.present();
  }

  async UsuarioNoExiste(){
    const alerta = await this.alert.create({
      header: 'Usuario No existe',
      message: 'Debe registrarse',
      cssClass: 'custom-alert',
      buttons: ['OK']
    })
    alerta.present();
  }

  register() {
    this.router.navigate(['/register']);
  }

}
