import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {

  constructor() { }
  subirArchivo(){
    var click = document.getElementById("fileInput");   
    click.click();
    click.onchange = function(event){
        var campoImagen = document.getElementById("campoImagen");
        campoImagen.src = URL.createObjectURL(event.target.files[0]);
    };
  }
  ngOnInit() {
  }

}
