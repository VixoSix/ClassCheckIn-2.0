import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarJustificacionPageRoutingModule } from './editar-justificacion-routing.module';

import { EditarJustificacionPage } from './editar-justificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarJustificacionPageRoutingModule
  ],
  declarations: [EditarJustificacionPage]
})
export class EditarJustificacionPageModule {}
