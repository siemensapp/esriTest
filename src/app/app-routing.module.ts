import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersComponent } from './workers/workers.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { EspecialistaComponent } from './especialista/especialista.component';

const routes: Routes = [
  //{ path: 'formularioEspecialista', component: TablaFieldComponent },
  { path: 'formularioAsignacion', component:  AsignacionComponent},
  { path: 'formularioEspecialista', component:    EspecialistaComponent},
  { path: '', component: WorkersComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
