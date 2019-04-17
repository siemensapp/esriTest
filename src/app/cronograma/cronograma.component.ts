
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from '../../assets/variables';
import Swal from 'sweetalert2'; 
import 'rxjs/add/operator/map';
import { DataRetrieverService } from '../data-retriever.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  constructor(private httpService: HttpClient, private dataRetriever: DataRetrieverService) { }
  Asignaciones: JSON[];
  resultados: JSON[];
  datos: JSON[];
  infoAsignacion: {};
  infoAsignacion2: {};
  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  traerNumeroEspecialistas(){
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/allWorkers').map( result => result).subscribe(especialistas =>{
        resolve(especialistas);
      })
    })
  }

  traerAsignaciones(fecha : string){
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/getAssignments/'+fecha).map( result => result).subscribe(data =>{
        resolve(data);
        console.log(data);
      })
    })
  }

  menuAsignacion(columna, fila, estiloCelda) {
    
    if(estiloCelda.style.backgroundColor !== ""){
    Swal.fire({
        title: "Asignacion",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "red",
        confirmButtonText: "VER MAS INFORMACION",
        cancelButtonText: "ELIMINAR",
      }).then((result) => {
          if(result.value){
              var IdEspecialista = document.getElementById('tablaEspecialistas1').rows[fila].id;
              var fecha = document.getElementById('fecha').value+"-"+columna;
              var url = env.url + '/api/getInfoAssignment/'+IdEspecialista+'/'+fecha;
              this.dataRetriever.getData(url).then(data => {
                this.infoAsignacion = data as JSON;
                var contenido = this.infoAsignacion[0]['NombreE'] + ' (' + this.infoAsignacion[0]['NombreT']+') - '+ this.infoAsignacion[0]['NombreS'] + '<br>'
                + this.infoAsignacion[0]['NombreSitio'] + '<br><br>'
                + this.infoAsignacion[0]['FechaInicio'].split("T")[0] + '  ==>  ' + this.infoAsignacion[0]['FechaFin'].split("T")[0] + '<br><br>'
                + 'Contacto: ' + this.infoAsignacion[0]['NombreContacto'] + ' - ' + this.infoAsignacion[0]['TelefonoContacto'];
                Swal.fire(
                  'Informacion Asignacion',
                  contenido
                ) 
                }) 
          }
          else{
              var IdEspecialista = document.getElementById('tablaEspecialistas1').rows[fila].id;
              var fecha = document.getElementById('fecha').value+"-"+columna;
              this.dataRetriever.getData(env.url+'/api/getInfoAssignment/'+IdEspecialista+'/'+fecha).then(data =>{
                  this.infoAsignacion2 = data as JSON;
                  console.log(this.infoAsignacion2);
              });
              Swal.fire({
                type: "warning",
                title: "Seguro desea borrar esta asignacion?",
                html: '<p style="font-family: Verdana, Geneva, Tahoma, sans-serif;">LLenar los siguientes campos</p>'+
                '<input id="input1" maxlength="60" placeholder="Sujeto/Entidad Cancelando el Servicio" style="height: 35px; width:80%; margin-top:5%;font-family: Verdana, Geneva, Tahoma, sans-serif; font-size:16px;"><br>' +
                '<textarea id="input2" maxlength="255" placeholder="Razón Cancelación del Servicio" autocomplete="off" style="height: 60px; width:80%; margin-top:5%;font-family: Verdana, Geneva, Tahoma, sans-serif;"></textarea>',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonColor: "red",
                confirmButtonText: "BORRAR",
                cancelButtonColor: "gray",
                cancelButtonText: "CANCELAR"
              }).then((result1) => {
                if(result1.value){
                  var datos = {
                            'IdEspecialista': this.infoAsignacion2[0]['IdEspecialista'],
                             'IdStatus' : this.infoAsignacion2[0]['IdStatus'],
                             'IdAsignacion' : this.infoAsignacion2[0]['IdAsignacion'],
                             'FechaInicio' : this.infoAsignacion2[0]['FechaInicio'].split("T")[0],
                             'FechaFin' : this.infoAsignacion2[0]['FechaFin'].split("T")[0],
                             'CoordenadasSitio' : this.infoAsignacion2[0]['CoordenadasSitio'],
                             'CoordenadasEspecialista' : this.infoAsignacion2[0]['CoordenadasEspecialista'],
                             'NombreSitio' : this.infoAsignacion2[0]['NombreSitio'],
                             'NombreContacto' : this.infoAsignacion2[0]['NombreContacto'],
                             'TelefonoContacto' : this.infoAsignacion2[0]['TelefonoContacto'],
                             'Descripcion' : this.infoAsignacion2[0]['Descripcion'],
                             'SujetoCancelacion' : document.getElementById('input1').value,
                             'RazonCancelacion' : document.getElementById('input2').value,
                             'fecha' : fecha
                            };
                var url = env.url + '/api/deleteAssignment';
                this.httpService.post(url, datos).toPromise()
                .then((res) => {
                  console.log(res);
                  if(res == "true"){
                    Swal.fire(
                      'Asignacion Borrada',
                      '',
                      'success'
                    ).then(()=> location.reload())
                  }
                  else{
                    Swal.fire(
                      'Error al borrar asignacion',
                      'No se pudo completar la accion',
                      'error'
                    )
                  }
                })
              }
              });
          }
      });
    }
    else{
        console.log("No existe ninguna asignacion en esta fecha");
    }
}

  setColor(option:number){
    switch(option) {
      case 1:
        return '#FF7115';
      case 2:
        return '#008DFF';
      case 3:
        return '#FFE300';
      case 4:
        return '#06AA00';
      case 5:
        return '#BB0000';
      case 6:
        return '#5B00BB';
      case 7:
        return '#8B8B8B';
      case 8:
        return '#A04B00';
    } 
  }

  setFecha(fechaN: string){
    this.dataRetriever.obtenerFecha(fechaN);
  }

  ngOnInit() {
    //Obtener las asignaciones del mes y año de la fecha de HOY 
    var fechaHoy=new Date().toISOString();
    var fechaHoyMA=fechaHoy.split("-")[0] + "-" + fechaHoy.split("-")[1];
    var diasDelMes= new Date(parseInt(fechaHoy.split("-")[0]), parseInt(fechaHoy.split("-")[1]), 0).getDate();
    this.setFecha(fechaHoyMA+"-"+"01");
    var tabla=document.getElementById("tablaAsignacionesID");
    tabla.addEventListener("click", (event) => {
       var columna = event.target.attributes[0].ownerElement.cellIndex+1;
       var fila = event.target.attributes[0].ownerElement.parentNode.rowIndex;
       var estiloCelda = event.target.attributes[0].ownerElement; 
       this.menuAsignacion(columna, fila, estiloCelda);
    });
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

    //Llenar la primera tabla con los nombres de todos los Field Service
    //rows[i].rowIndex(Indice de la fila) e textContent(Nombre del especialista). className(IdEspecialista)
   var tableA;
   var fila;
   var celda;
   

   this.traerNumeroEspecialistas().then(especialistas => {
     this.resultados = especialistas;
     this.traerAsignaciones(fechaHoyMA+"-"+"01").then(data =>{
     this.Asignaciones = data;
     for(var i=0; i<this.resultados.length;i++){
       tableA = document.getElementById("tablaAsignacionesID");
       fila = tableA.insertRow(i+1);
       
       for(var j=0; j<diasDelMes;j++){
         celda = fila.insertCell(j);
         celda.style.height = "19.6px";
       }
     }
      var x;
     for(var i=0; i<this.Asignaciones.length;i++){
       var ids = document.getElementById(this.Asignaciones[i]['IdEspecialista']).rowIndex;
       x = tableA.rows[ids].cells;
          if(parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[1]) == parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[1])){          
            for(var j=(parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[2])-1);j<(parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2]));j++){
               x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
            }
          }
          else{
            if(parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[1])<parseInt(fechaHoy.split("-")[1])){
              for(var j=0;j<(parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2]));j++){
                x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
              }
            }
            else if(parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[1])>parseInt(fechaHoy.split("-")[1])){
              for(var j=(parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[2])-1);j<diasDelMes;j++){
                x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
              }
            }
          }
       
     }
   });
   });


    //Crear un EventListener en el Seleccionador de fecha. Siempre que cambia, cambia la tabla
     document.getElementById('fecha').addEventListener("change", (event) => {
       var fecha=event.target.value;
       var diasDelMesN= new Date(fecha.split("-")[0], fecha.split("-")[1], 0).getDate(); 
       this.setFecha(fecha+"-"+"01");
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

        var tableA;
        var fila;
        var celda;

         this.traerNumeroEspecialistas().then(especialistas => {
            this.resultados = especialistas;
            this.traerAsignaciones(fecha+"-"+"01").then(data =>{
               this.Asignaciones = data;
               tableA = document.getElementById("tablaAsignacionesID");
               for(var i=this.resultados.length; i>1;i--){
               fila = tableA.deleteRow(i);
               }
               tableA.deleteRow(1);
               for(var i=0; i<this.resultados.length;i++){
               tableA = document.getElementById("tablaAsignacionesID");
               fila = tableA.insertRow(i+1);
               
               for(var j=0; j<diasDelMesN;j++){
                   celda = fila.insertCell(j);
                   celda.style.height = "19.6px";
               }
               }
            var x;
           for(var i=0; i<this.Asignaciones.length;i++){
             var ids = document.getElementById(this.Asignaciones[i]['IdEspecialista']).rowIndex;
             x = tableA.rows[ids].cells;
                if(parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[1]) == parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[1])){          
                  for(var j=(parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[2])-1);j<(parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2]));j++){
                     x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                  }
                }
                else{
                  if(parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[1])<parseInt(fecha.split("-")[1])){
                    for(var j=0;j<(parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[2]));j++){
                      x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                    }
                  }
                  else if(parseInt((this.Asignaciones[i]['FechaFin'].split("T")[0]).split("-")[1])>parseInt(fecha.split("-")[1])){
                    for(var j=(parseInt((this.Asignaciones[i]['FechaInicio'].split("T")[0]).split("-")[2])-1);j<diasDelMesN;j++){
                      x[j].style.backgroundColor = this.setColor(this.Asignaciones[i]['IdStatus']);
                    }
                  }
                }
             
           }
          });
          });


   });
     
  }

}