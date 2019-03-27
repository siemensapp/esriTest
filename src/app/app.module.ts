import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { AppRoutingModule } from './app-routing.module';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { WorkersComponent } from './workers/workers.component';


@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    AsignacionComponent,
    EspecialistaComponent,
    WorkersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }