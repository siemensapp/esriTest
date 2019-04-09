import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from '../../assets/variables';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  constructor(private httpService: HttpClient) { }
  Asignaciones: JSON[];
  resultados: JSON[];
  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  funcion(){
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/allWorkers').map( result => result).subscribe(data =>{
        resolve(data);
      })
    })
  }

  ngOnInit() {
    //Llenar la primera tabla con los nombres de todos los Field Service
    
    this.funcion().then(data => {
      this.resultados = data;
      console.log(this.resultados);
      for(var i=0; i<this.resultados.length;i++){
        var tableA = document.getElementById("tablaAsignacionesID");
        var fila = tableA.insertRow(i+1);
         for(var j=0; j<diasDelMes;j++){
           var celda = fila.insertCell(j);
           celda.style.backgroundColor = "red";
           celda.style.height = "19.6px";
           celda.style.opacity = "0.7";
         }
      }
    });
    
    //Obtener las asignaciones del mes y año de la fecha de HOY 
    var fechaHoy=new Date().toISOString();
    var fechaHoyMA=fechaHoy.split("-")[0] + "-" + fechaHoy.split("-")[1];
    var diasDelMes= new Date(parseInt(fechaHoy.split("-")[0]), parseInt(fechaHoy.split("-")[1]), 0).getDate();
    var tabla=document.getElementById("tablaAsignacionesID");
    var header = tabla.createTHead();
    var row = header.insertRow(0);
    for(var i=0; i<diasDelMes;i++){
      if(i<9){
        var cell = row.insertCell(i);
        cell.innerHTML = "<b>"+"0"+(i+1)+"</b>";
      }
      else{
        var cell = row.insertCell(i);
        cell.innerHTML = "<b>"+(i+1)+"</b>";
      }
    }
     document.getElementById('fecha').setAttribute('value', fechaHoyMA);
     this.httpService.get(env.url + '/api/getAssignments/'+fechaHoyMA+"-"+"01").subscribe(
      data => {
        this.Asignaciones = data as JSON[];
        console.log(this.Asignaciones);
      }
    )


    //Crear un EventListener en el Seleccionador de fecha. Siempre que cambia, cambia la tabla
     document.getElementById('fecha').addEventListener("change", (event) => {
       var fecha=event.target.value;
       var diasDelMesN= new Date(fecha.split("-")[0], fecha.split("-")[1], 0).getDate();
        console.log(diasDelMesN);

        var tabla=document.getElementById("tablaAsignacionesID");
        tabla.deleteRow(0);
        var header = tabla.createTHead();
        var row = header.insertRow(0);
        for(var i=0; i<diasDelMesN;i++){
          if(i<9){
            var cell = row.insertCell(i);
            cell.innerHTML = "<b>"+"0"+(i+1)+"</b>";
          }
          else{
            var cell = row.insertCell(i);
            cell.innerHTML = "<b>"+(i+1)+"</b>";
          }
        }
        this.httpService.get(env.url + '/api/getAssignments/'+fecha+"-"+"01").subscribe(
          data => {
            this.Asignaciones = data as JSON[];
            console.log(this.Asignaciones);
          }
        )
   });
  }

}