import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataRetrieverService} from '../data-retriever.service';
import * as env from '../../assets/variables';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-editar-especialista',
  templateUrl: './editar-especialista.component.html',
  styleUrls: ['./editar-especialista.component.css']
})
export class EditarEspecialistaComponent implements OnInit {

  infoEspecialista={};
  fotoNueva;
  subirArchivo(){
    var click = document.getElementById("fileInput");   
    click.click();
    click.onchange = (event) => {
        //Previsualizar la imagen en el div campoImagen
        var campoImagen = document.getElementById("campoImagen");
        campoImagen.src = URL.createObjectURL(event.target.files[0]);
        //Crear version base 64 de la img
        var fileReader = new FileReader();
        fileReader.addEventListener("load", (e) => {
           
           document.getElementById("resultadoImagen").innerHTML = e.target.result;
           this.fotoNueva=e.target.result;
           
        })
        
        fileReader.readAsDataURL(event.target.files[0]);
    };
  }
  editarEspecialista(){
    
    
    var datos3 = document.forms["formulario"].elements[2].value;
    var datos4 = document.forms["formulario"].elements[3].value;
    var datos5 = document.forms["formulario"].elements[4].value;
    var datos6 = document.forms["formulario"].elements[5].value;
    var datos7 = document.forms["formulario"].elements[6].value;
    var datos8 = document.forms["formulario"].elements[7].value;
    var datos9 = document.forms["formulario"].elements[8].value;
    var datos10 = document.forms["formulario"].elements[9].value;
    var datos11 = document.forms["formulario"].elements[10].value;
    var datos12 = document.forms["formulario"].elements[11].value;
    

    var datos = {"IdEspecialista" : datos3,
                 "NombreE" : datos4,
                 "Celular" : datos5,
                 "IdTecnica" : datos6,
                 "FechaNacimiento" : datos7,
                 "CeCo" : datos8,
                 "GID" : datos9,
                 "CedulaCiudadania" : datos10,
                 "LugarExpedicion" : datos11,
                 "TarjetaIngresoArgos" : datos12,
                 "Foto" : this.fotoNueva
                };
    console.log(datos);
     this.httpService.post(env.url + '/api/editWorker', datos).toPromise()
                 .then((res) => {
                   console.log(res);
                 });
  }
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService, private ActivatedRoute: ActivatedRoute) { }
  ResultadoField : JSON;
  ngOnInit() {
    this.DataRetriever.infoEspecialista.subscribe(infoEspecialista => this.infoEspecialista = infoEspecialista);
    console.log(this.infoEspecialista);
  }

}
