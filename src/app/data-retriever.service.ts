import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class DataRetrieverService {
  private infoSource= new BehaviorSubject("");
  private coordsSource= new BehaviorSubject([]);
  finalCoords = this.coordsSource.asObservable();
  infoUbicacion = this.infoSource.asObservable();
  constructor( private http: HttpClient){ }

  getData( url: string ) {
    return new Promise(resolve => {
      this.http.get(url)
        .map(results => results)
        .subscribe(data => {
          resolve(data);
        })
    })
  }

  obtenerUbicacion(coordenadas: string){
    this.infoSource.next(coordenadas);
    let aux = this.infoSource.value.split(",");
    this.coordsSource.next([ String(aux[0] + "," + aux[1]), aux[2]  ])
    console.log(this.coordsSource.value);
  }

  borrarEspecialista(url: string)
  {
    return new Promise(resolve => {
      this.http.get(url)
        .map(results => results)
        .subscribe(data => {
          resolve(data);
        })
    })
  }

  getEspecialista(url: string){
    return new Promise(resolve => {
      this.http.get(url)
        .map(results => results)
        .subscribe(data => {
          resolve(data);
        })
    })
  }
}
