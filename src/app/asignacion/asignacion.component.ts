import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {DataRetrieverService} from '../data-retriever.service';
import * as env from '../../assets/variables';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

    //infoUbicacion = "";
    finalCoords = [];
  enviarDatos(){
    var datos1 = document.forms["formulario"].elements[0].innerText;
    var datos2 = document.forms["formulario"].elements[1].innerText;
    var datos3 = document.forms["formulario"].elements[2].value;
    var datos4 = document.forms["formulario"].elements[3].value;
    var datos5 = document.forms["formulario"].elements[4].value;
    var datos6 = document.forms["formulario"].elements[5].value;
    var datos7 = document.forms["formulario"].elements[6].value;

    var datos = {"NombreE" : datos1,
                 "NombreS" : datos2,
                 "fechaInicio" : datos3,
                 "fechaFin" : datos4,
                 "nombreContacto" : datos5,
                 "telefonoContacto" : datos6,
                 "Descripcion" : datos7
                };
    console.log(datos);
    this.httpService.post(env.url+'/api/setAssignment', datos).toPromise()
                .then((res) => {
                  console.log(res);
                });
  }
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService) { }
  ResultadosField : JSON[];
  ngOnInit() {
    //this.DataRetriever.infoUbicacion.subscribe(infoUbicacion => this.infoUbicacion = infoUbicacion);
    this.DataRetriever.finalCoords.subscribe(finalCoords => this.finalCoords = finalCoords);
    // var fechaHoy=new Date();
    // document.getElementById("fechaI").setAttribute("value", String(fechaHoy.getFullYear()+"-0"+(fechaHoy.getMonth()+1)+"-"+fechaHoy.getDate()));
      this.DataRetriever.getData(env.url+'/api/allWorkers').then(data => {
      this.ResultadosField = data as JSON[];
      console.log(this.ResultadosField);
    })
    // this.httpService.get(env.url+'/api/workersList').subscribe(
    //   data => {
    //     this.ResultadosField = data as JSON[];
    //     console.log(this.ResultadosField);
    //   }
    // )
  }

}
