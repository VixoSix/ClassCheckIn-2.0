import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'comienzo',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'comienzo',
    loadChildren: () => import('./comienzo/comienzo.module').then( m => m.ComienzoPageModule)
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./pages/asistencias/asistencias.module').then( m => m.AsistenciasPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-justificacion',
    loadChildren: () => import('./pages/detalle-justificacion/detalle-justificacion.module').then( m => m.DetalleJustificacionPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'editar-justificacion/:id',
    loadChildren: () => import('./pages/editar-justificacion/editar-justificacion.module').then( m => m.EditarJustificacionPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-asistencia',
    loadChildren: () => import('./pages/detalle-asistencia/detalle-asistencia.module').then( m => m.DetalleAsistenciaPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'editar-asistencia/:id',
    loadChildren: () => import('./pages/editar-asistencia/editar-asistencia.module').then( m => m.EditarAsistenciaPageModule),
    canActivate: [AutorizadoGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
