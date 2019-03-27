import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  constructor(private httpService: HttpClient) { }
  Resultados : JSON[];
  ngOnInit() {
    this.httpService.get('http://c4be78dc.ngrok.io/api/workersList').subscribe(
      data => {
        this.Resultados = data as JSON[];
      }
    )
  }

}
