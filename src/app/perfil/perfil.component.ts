import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../data-retriever.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  infoEspecialista={};
  fechaNacimiento;
  constructor(private DataRetriever: DataRetrieverService) { }

  ngOnInit() {
    this.DataRetriever.infoEspecialista.subscribe(infoEspecialista => this.infoEspecialista = infoEspecialista);
    
    this.fechaNacimiento=this.infoEspecialista['FechaNacimiento'].split("T")[0];
  }

}