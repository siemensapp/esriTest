import { Component, OnInit } from '@angular/core';
import * as env from '../../assets/variables';
import {HttpClient} from '@angular/common/http';
import { DataRetrieverService } from '../data-retriever.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  asignaciones: JSON[];
  fechaA= "";
  totalDiasVFD=0;
  totalDiasBT=0;
  totalDiasAUT=0;
  totalDiasAOS=0;
  totalDiasMOT=0;
  porcentajeVFD=0;
  porcentajeBT=0;
  porcentajeAUT=0;
  porcentajeAOS=0;
  porcentajeMOT=0;
  diasMaximosMes;
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService) { }

  traerAsignaciones(fecha : string){
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/getAssignments/'+fecha).map( result => result).subscribe(data =>{
        resolve(data);
        console.log(data);
      })
    })
  }

  datosGraficos()
  {
    var diasDelMes= new Date(parseInt(this.fechaA.split("-")[0]), parseInt(this.fechaA.split("-")[1]), 0).getDate();   
      var mesSeleccionado = parseInt(this.fechaA.split("-")[1]);
      for(var i=0; i<this.asignaciones.length; i++){
        var status = this.asignaciones['IdStatus'][i];
        var fechaInicio= this.asignaciones['FechaInicio'][i];
        var fechaFin = this.asignaciones['FechaFin'][i];
      switch(this.asignaciones['IdTecnica'][i]) {
        case 1:
          {
            if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
               if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
                this.totalDiasVFD = this.totalDiasVFD+(parseInt(fechaFin.split("-")[2]));
               }
               else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
                this.totalDiasVFD = this.totalDiasVFD+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
               }
               else{
                this.totalDiasVFD = this.totalDiasVFD+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
               }
            }
          };
        case 2:
          {
            if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
              if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
                this.totalDiasBT = this.totalDiasBT+(parseInt(fechaFin.split("-")[2]));
               }
               else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
                this.totalDiasBT = this.totalDiasBT+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
               }
               else{
                this.totalDiasBT = this.totalDiasBT+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
               }
            }
          };
        case 3:
        {
          if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
            if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
              this.totalDiasAUT = this.totalDiasAUT+(parseInt(fechaFin.split("-")[2]));
             }
             else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
              this.totalDiasAUT = this.totalDiasAUT+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
             }
             else{
              this.totalDiasAUT = this.totalDiasAUT+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
             }
          }
        };
        case 4:
        {
          if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
            if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
              this.totalDiasAOS = this.totalDiasAOS+(parseInt(fechaFin.split("-")[2]));
             }
             else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
              this.totalDiasAOS = this.totalDiasAOS+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
             }
             else{
              this.totalDiasAOS = this.totalDiasAOS+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
             }
          }
        };
        case 5:
        {
          if(status == 1 || status == 2 || status == 3 || status ==4 || status == 4 || status ==5){
            if(mesSeleccionado>parseInt(fechaInicio.split("-")[1])){
              this.totalDiasMOT = this.totalDiasMOT+(parseInt(fechaFin.split("-")[2]));
             }
             else if(mesSeleccionado<parseInt(fechaFin.split("-")[1])){
              this.totalDiasMOT = this.totalDiasMOT+(diasDelMes-parseInt(fechaInicio.split("-")[2]));
             }
             else{
              this.totalDiasMOT = this.totalDiasMOT+(parseInt(fechaFin.split("-")[2])-parseInt(fechaInicio.split("-")[2]));
             }
          }
        };
      } 
    }

    this.porcentajeVFD = this.totalDiasVFD/(diasDelMes*diasDelMes);
  }

  ngOnInit() {
      this.DataRetriever.infoFecha.subscribe(infoFecha => {
        this.fechaA = infoFecha; 
        this.traerAsignaciones(this.fechaA).then(data =>{
        this.asignaciones = data;
        //this.datosGraficos();
      });  
      });
        
  }

}
