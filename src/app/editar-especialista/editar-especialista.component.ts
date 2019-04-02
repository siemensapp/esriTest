import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataRetrieverService} from '../data-retriever.service';
import * as env from '../../assets/variables';

@Component({
  selector: 'app-editar-especialista',
  templateUrl: './editar-especialista.component.html',
  styleUrls: ['./editar-especialista.component.css']
})
export class EditarEspecialistaComponent implements OnInit {

  editarEspecialista(){
    
    var datos1 = document.forms["formulario"].elements[0];
    var datos2 = document.forms["formulario"].elements[1];
    var datos3 = document.forms["formulario"].elements[2];
    var datos4 = document.forms["formulario"].elements[3];
    var datos5 = document.forms["formulario"].elements[4];
    var datos6 = document.forms["formulario"].elements[5];
    var datos7 = document.forms["formulario"].elements[6];
    var datos8 = document.forms["formulario"].elements[7];
    var datos9 = document.forms["formulario"].elements[8];
    var datos10 = document.forms["formulario"].elements[9];
    var datos11 = document.forms["formulario"].elements[10];
    var datos12 = document.forms["formulario"].elements[11];
  

    var datos = {"IdEspecialista" : datos3,
                 "NombreE" : datos4,
                 "Celular" : datos5,
                 "IdTecnica" : datos6,
                 "fechaNacimiento" : datos7,
                 "CeCo" : datos8,
                 "GID" : datos9,
                 "CedulaCiudadania" : datos10,
                 "LugarExpedicion" : datos11,
                 "TarjetaIngresoArgos" : datos12
                };
    console.log(datos);
    this.httpService.post(env.url + '/api/editEspecialista', datos).toPromise()
                .then((res) => {
                  console.log(res);
                });
  }
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService) { }
  ResultadoField : JSON;
  ngOnInit() {
    this.DataRetriever.getEspecialista(env.url+'/api/editWorker').then(data => {
      this.ResultadoField = data as JSON;
      console.log(this.ResultadoField);
    })
  }

}
