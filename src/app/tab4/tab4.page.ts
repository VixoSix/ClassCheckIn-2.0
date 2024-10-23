import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { JustificacionApiService } from '../services/justificacion-api.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  justificaciones: any[] = [];

  constructor(private menucontroller:MenuController,
              private router: Router,
              private jApi: JustificacionApiService) { }

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  navegar(id: number){
    console.log(id);
    this.router.navigate(['/detalle-justificacion']);
  }

  ngOnInit() {
    this.Justificaciones();
  }

  Justificaciones(){
    this.jApi.getJustificacion().subscribe(
      datos => this.justificaciones =  datos,
    )
  }

  buscarJustificaciones(Observable:any){
    this.router.navigate(['/detalle-justificacion'],
      {queryParams:{user: JSON.stringify(Observable)}})
  }


}
