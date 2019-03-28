import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

  enviarDatos(){
    var datos1 = document.forms["formulario"].elements[0].innerText;
    var datos2 = document.forms["formulario"].elements[1].innerText;
    var datos3 = document.forms["formulario"].elements[2].value;
    var datos4 = document.forms["formulario"].elements[3].value;
    var datos5 = document.forms["formulario"].elements[4].value;
    var datos6 = document.forms["formulario"].elements[5].value;
    var datos7 = document.forms["formulario"].elements[6].value;
    //var formData = new FormData(datos);
    var datos = {"NombreE" : datos1,
                 "NombreS" : datos2,
                 "fechaInicio" : datos3,
                 "fechaFin" : datos4,
                 "nombreContacto" : datos5,
                 "telefonoContacto" : datos6,
                 "Descripcion" : datos7
                };
    console.log(datos);
    this.httpService.post('http://0ebc135f.ngrok.io/api/setAssignment', datos).toPromise()
                .then((res) => {
                  console.log(res);
                });
  }
  constructor(private httpService: HttpClient) { }
  ResultadosField : JSON[];
  ngOnInit() {
    this.httpService.get('http://0ebc135f.ngrok.io/api/workersList').subscribe(
      data => {
        this.ResultadosField = data as JSON[];
        console.log(this.ResultadosField);
      }
    )
  }

}
