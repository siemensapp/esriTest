import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersComponent } from './workers/workers.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { EditarEspecialistaComponent } from './editar-especialista/editar-especialista.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AsignacionesEliminadasComponent } from './asignaciones-eliminadas/asignaciones-eliminadas.component';

const routes: Routes = [
  { path: 'formularioAsignacion', component:  AsignacionComponent},
  { path: 'estadisticas', component: EstadisticasComponent},
  { path: 'cronograma', component: CronogramaComponent},
  { path: 'formularioEspecialista', component:    EspecialistaComponent},
  { path: 'formularioEdicionEspecialista', component: EditarEspecialistaComponent},
  { path: 'verPerfil', component: PerfilComponent},
  { path: 'asignacionesEliminadas', component: AsignacionesEliminadasComponent},
  { path: '', component: WorkersComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
