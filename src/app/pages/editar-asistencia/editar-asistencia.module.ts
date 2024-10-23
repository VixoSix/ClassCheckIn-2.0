import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAsistenciaPageRoutingModule } from './editar-asistencia-routing.module';

import { EditarAsistenciaPage } from './editar-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAsistenciaPageRoutingModule
  ],
  declarations: [EditarAsistenciaPage]
})
export class EditarAsistenciaPageModule {}
