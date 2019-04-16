import { Component, OnInit } from '@angular/core';
import * as env from '../../assets/variables';
import {HttpClient} from '@angular/common/http';
import { DataRetrieverService } from '../data-retriever.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

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
  porcentajeTotal=0;
  diasMaximosMes;
  constructor(private httpService: HttpClient, private DataRetriever: DataRetrieverService) { }

  traerAsignaciones(fecha : string){
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/getMonthAssignments/'+fecha).map( result => result).subscribe(data =>{
        resolve(data);
      })
    })
  }

  datosGraficos()
  {
    var diasDelMes= new Date(parseInt(this.fechaA.split("-")[0]), parseInt(this.fechaA.split("-")[1]), 0).getDate();   
      var mesSeleccionado = parseInt(this.fechaA.split("-")[1]);
      var countVFD, countBT, countAUT, countAOS, countMOT;
      console.log(this.asignaciones);
      for(var i=0; i<this.asignaciones.length; i++){
        var status = this.asignaciones[i]['IdStatus'];
        var fechaInicio= this.asignaciones[i]['FechaInicio'];
        var fechaFin = this.asignaciones[i]['FechaFin'];
      switch(parseInt(this.asignaciones[i]['tecnica'])) {
        case 1:
          {
            countVFD = this.asignaciones[i]['Cuenta'];
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
            break;
          }
        case 2:
          {
            countBT = this.asignaciones[i]['Cuenta'];
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
            break;
          }
        case 3:
        {
          countAUT = this.asignaciones[i]['Cuenta'];
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
          break;
        }
        case 4:
        {
          countAOS = this.asignaciones[i]['Cuenta'];
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
          break;
        }
        case 5:
        {
          countMOT = this.asignaciones[i]['Cuenta'];
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
          break;
        }
      } 
    }
    this.porcentajeVFD = (this.totalDiasVFD/(diasDelMes*countVFD))*100;
    if(isNaN(this.porcentajeVFD))
      this.porcentajeVFD = 0;
    this.porcentajeBT = (this.totalDiasBT/(diasDelMes*countBT))*100;
    if(isNaN(this.porcentajeBT))
      this.porcentajeBT = 0;
    this.porcentajeAUT = (this.totalDiasAUT/(diasDelMes*countAUT))*100;
    if(isNaN(this.porcentajeAUT))
      this.porcentajeAUT = 0;
    this.porcentajeAOS = (this.totalDiasAOS/(diasDelMes*countAOS))*100;
    if(isNaN(this.porcentajeAOS))
      this.porcentajeAOS = 0;
    this.porcentajeMOT = (this.totalDiasMOT/(diasDelMes*countMOT))*100;
    if(isNaN(this.porcentajeMOT))
      this.porcentajeMOT = 0;
    this.porcentajeTotal = (this.porcentajeVFD + this.porcentajeBT + this.porcentajeAUT + this.porcentajeAOS + this.porcentajeMOT)/5;
    console.log(this.porcentajeTotal);
  }

  ngOnInit() {
      this.DataRetriever.infoFecha.subscribe(infoFecha => {
        this.fechaA = infoFecha; 
        this.traerAsignaciones(this.fechaA).then(data =>{
        this.asignaciones = data;
        this.datosGraficos();
      });  
      });
        
  }

}
