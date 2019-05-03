import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataRetrieverService} from '../data-retriever.service';
import * as env from '../../assets/variables';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import { isUndefined } from 'util';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

    finalCoords = [];
    infoUbicacion = "";
    infoCiudad = "";
  enviarDatos(){
    var datos1 = document.forms["formulario"].elements[0].value;
    var datos2 = document.forms["formulario"].elements[1].value;
    var datos3 = document.forms["formulario"].elements[2].value;
    var datos4 = document.forms["formulario"].elements[3].value;
    var datos5 = document.forms["formulario"].elements[4].value;
    var datos6 = document.forms["formulario"].elements[5].value;
    var datos7 = document.forms["formulario"].elements[6].value;
    var datos8 = document.forms["formulario"].elements[7].value;
    var datos9 = document.forms["formulario"].elements[8].value;
    var datos10 = document.forms["formulario"].elements[9].value;

    var datos = {"IdEspecialista" : datos3,
                 "IdStatus" : datos4,
                 "NombreCliente" : datos1,
                 "NombrePlanta" : datos2, 
                 "CiudadPlanta" : this.finalCoords[2],
                 "FechaInicio" : datos5,
                 "FechaFin" : datos6,
                 "CoordenadasSitio" : this.finalCoords[0],
                 "NombreSitio" : this.infoUbicacion.split(",")[2],
                 "NombreContacto" : datos7,
                 "TelefonoContacto" : datos8,
                 "EmailContacto" : datos9,
                 "Descripcion" : datos10
                };
    console.log(datos);
    this.httpService.post(env.url+'/api/setAssignment', datos).toPromise()
                .then((res) => {
                  console.log(res);
                  if(res == "true"){
                    Swal.fire(
                     'Asignacion Creada',
                     this.infoUbicacion.split(",")[2],
                     'success'
                    )
                    this.router.navigate(['']);
                }
                else if(res == "existe"){
                  Swal.fire(
                    'Error Creando Asignacion',
                    'Otra asignacion para este especialista ya existe en esas fechas. Verifique el cronograma',
                    'error'
                  )  
                }
                else{
                  Swal.fire(
                    'Error Creando Asignacion',
                    'Hubo un error creando la asignacion',
                    'error'
                  ) 
                }
                 });
  }
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService, private router: Router) { }
  ResultadosField : JSON[];
  ngOnInit() {
    this.DataRetriever.infoUbicacion.subscribe(infoUbicacion => this.infoUbicacion = infoUbicacion);
    this.DataRetriever.finalCoords.subscribe(finalCoords => {this.finalCoords = finalCoords
      var nombreS = document.getElementById('ubicacion').textContent;
      if(nombreS == ''){
        console.log(nombreS);
        document.getElementById('ubicacion').textContent = '*Buscar Ubicacion en el Mapa*';
      }
      else
      document.getElementById('ubicacion').textContent = this.finalCoords[1] + ', '+ this.finalCoords[2];
    });
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
