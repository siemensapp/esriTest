import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from '../../assets/variables';
import Swal from 'sweetalert2'; 
import { DataRetrieverService} from '../data-retriever.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  setColor(option) {
    switch(option) {
      case 'En Servicio':
        return '#FF7115';
      case 'Compensatorio':
        return '#008DFF';
      case 'Vacaciones':
        return '#FFE300';
      case 'Disponible':
        return '#06AA00';
      case 'Incapacidad':
        return '#BB0000';
      case 'Permiso':
        return '#5B00BB';
      case 'Capacitación':
        return '#8B8B8B';
      case 'Disponibilidad FDS':
        return '#A04B00';
    }    
  }
  
  borrar(IdEspecialista: number, NombreE: string){
    
    Swal.fire({
      type: "warning",
      title: "Seguro desea borrar este especialista?",
      text: "Esta operacion es irreversible",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "BORRAR",
      cancelButtonText: "CANCELAR",
      html: NombreE
    }).then((result) => {
        if(result.value){
          var url= env.url+'/api/deleteWorker/'+IdEspecialista;
          this.dataRetriever.borrarEspecialista(url);
          console.log("Borrado papa");
          Swal.fire(
            'Borrado',
            NombreE,
            'success'
          )
        }
    });
  }

  constructor(private httpService: HttpClient, private dataRetriever: DataRetrieverService) { }
  Resultados : JSON[];
  ngOnInit() {
    this.httpService.get(env.url + '/api/workersList').subscribe(
      data => {
        this.Resultados = data as JSON[];
      }
    )
  }

}
