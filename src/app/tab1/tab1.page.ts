import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UsuarioApiService } from '../services/usuario-api.service';
import { ActivatedRoute } from '@angular/router';
import { IAsignatura } from '../interfaces/iasignatura';
import { AsignaturasApiService } from '../services/asignaturas-api.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  swiper: Swiper | undefined;
  Usuario: any;
  userdata:any;
  Asignaturas: IAsignatura[] = [];

  constructor(private menucontroller:MenuController,
              private activated: ActivatedRoute,
              private router: Router,
              private uApi: UsuarioApiService,
              private aApi: AsignaturasApiService) {}

  ngOnInit(){
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    const correoLogeado = sessionStorage.getItem('correo');

    this.uApi.getCorreo(correoLogeado).subscribe(resp => {
      this.userdata = resp; // Aquí obtenemos solo el nombre

      this.Usuario =  {
        id: this.userdata[0].id,
        nombre: this.userdata[0].nombre,
        apellido: this.userdata[0].apellido,
        correo: this.userdata[0].correo,
        nombreUsuario: this.userdata[0].nombreUsuario,
        contrasenia: this.userdata[0].contrasenia,
        isactive: this.userdata[0].isactive,
        imagen: this.userdata[0].imagen
      }
    });

    this.aApi.getAsignatura().subscribe((data: IAsignatura[]) => {
      this.Asignaturas = data;
    });
  }

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  irAlQR(){
    this.router.navigate(['/tabs/tab2']);
  }

  irAlPerfil(){
    this.router.navigate(['/perfil']);
  }

  irJustificaciones(){
    this.router.navigate(['/tabs/tab3']);
  }




}
