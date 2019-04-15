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
  fechaA: string;
  constructor(private httpService: HttpClient, private dataRetriever: DataRetrieverService) { }

  traerAsignaciones(fecha : string){
    return new Promise(resolve => {
      this.httpService.get(env.url + '/api/getAssignments/'+fecha).map( result => result).subscribe(data =>{
        resolve(data);
        console.log(data);
      })
    })
  }

  ngOnInit() {
    this.dataRetriever.infoFecha.subscribe(infoFecha => this.fechaA = infoFecha);
    // this.traerAsignaciones(this.fechaA).then(data =>{
    //     this.asignaciones = data;
    // });
  }

}
