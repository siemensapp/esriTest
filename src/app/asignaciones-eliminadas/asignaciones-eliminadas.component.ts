import { Component, OnInit } from '@angular/core';
import * as env from '../../assets/variables';
import { DataRetrieverService } from '../data-retriever.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-asignaciones-eliminadas',
  templateUrl: './asignaciones-eliminadas.component.html',
  styleUrls: ['./asignaciones-eliminadas.component.css']
})
export class AsignacionesEliminadasComponent implements OnInit {

  constructor(private dataRetriever : DataRetrieverService) { }

  resultados: JSON[];

  agregarListener(){
    document.getElementById('fecha').addEventListener("change", (event) => {
      var fecha = document.getElementById('fecha').attributes[2].ownerDocument.activeElement.value;
      var texto = document.getElementById('buscar').attributes[2].ownerElement.value;
      if(isUndefined(fecha)){
        fecha = '';
      }
      console.log(fecha, texto);
      this.dataRetriever.getData(env.url+'/api/getDeletedAssignments/'+fecha+'/'+texto).then(data => {
        this.resultados = data as JSON[];
        console.log(this.resultados);
        })  

    });

    document.getElementById('buscar').addEventListener("input", (event) => {
      var fecha = document.getElementById('fecha').attributes[2].ownerElement.value;
      var texto = document.getElementById('buscar').attributes[2].ownerElement.value;
      if(isUndefined(fecha)){
        fecha = '';
      }
      this.dataRetriever.getData(env.url+'/api/getDeletedAssignments/'+fecha+'/'+texto).then(data => {
        this.resultados = data as JSON[];
        console.log(this.resultados);
        })
    });

  }
  traerAsignacionesEliminadas(){
    this.dataRetriever.getData(env.url+"/api/getDeletedAssignments/''/''").then(data => {
      this.resultados = data as JSON[];
      console.log(this.resultados);
      })
  }
  ngOnInit() {
       console.log(document.getElementById('fecha').attributes);
       this.traerAsignacionesEliminadas();
       this.agregarListener();
  }

}
