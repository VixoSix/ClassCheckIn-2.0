import { Component, OnInit } from '@angular/core';
import { AsistenciaApiService } from 'src/app/services/asistencia-api.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {
  asistencias: any[] = []; 

  constructor(private menucontroller:MenuController,
                      private router: Router,
                      private aApi: AsistenciaApiService) { }

  ngOnInit() {
    this.Asistencias();
  }

  navegar(id: number){
    console.log(id);
    this.router.navigate(['/detalle-asistencia']);
  }

  Asistencias(){
    this.aApi.getAsistencia().subscribe(
      datos => this.asistencias = datos,
    )
  }

  buscarAsistencias(Observable:any){
    this.router.navigate(['/detalle-asistencia'],
      {queryParams:{user: JSON.stringify(Observable)}}
    )
  }

  volver(){
    this.router.navigate(['/tabs/tab1']);
  }


}