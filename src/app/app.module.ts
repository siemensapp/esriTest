import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { AppRoutingModule } from './app-routing.module';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { WorkersComponent } from './workers/workers.component';
import { EditarEspecialistaComponent } from './editar-especialista/editar-especialista.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AsignacionesEliminadasComponent } from './asignaciones-eliminadas/asignaciones-eliminadas.component';




@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    AsignacionComponent,
    EspecialistaComponent,
    WorkersComponent,
    EditarEspecialistaComponent,
    PerfilComponent,
    CronogramaComponent,
    EstadisticasComponent,
    AsignacionesEliminadasComponent
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot({
    }),

    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }