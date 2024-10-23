import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userdata:any;
  Usuario:any;
  id:any;
  nombre:any;
  apellido:any;
  correo:any;
  nombreUsuario:any;
  contrasenia:any;
  isactive:any;
  imagen:any;

  constructor(private router: Router,
              private uApi: UsuarioApiService) { }

  ngOnInit() {
    const correoLogeado = sessionStorage.getItem('correo');

    this.uApi.getCorreo(correoLogeado).subscribe(resp =>{
      this.userdata = resp;

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
    })
  }

  editar(Observable: any){
    this.router.navigate(['/editar-perfil'],
      {queryParams: {Usuario: JSON.stringify(Observable)}}
    )
  }
  
  volver(){
    this.router.navigate(['/tabs/tab1']);
  }
}
