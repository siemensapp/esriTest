import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../data-retriever.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  infoEspecialista={};
  tecnica;
  constructor(private DataRetriever: DataRetrieverService) { }

  ngOnInit() {
    this.DataRetriever.infoEspecialista.subscribe(infoEspecialista => this.infoEspecialista = infoEspecialista);
    console.log(this.infoEspecialista);
    switch(this.infoEspecialista['IdTecnica']) {
      case 1:
        this.tecnica = 'VFD';
      case 2:
        this.tecnica = 'BT';
      case 3:
        this.tecnica = 'AUT';
      case 4:
        this.tecnica = 'AOS';
      case 5:
        this.tecnica = 'MOT';
    } 
  }

}
