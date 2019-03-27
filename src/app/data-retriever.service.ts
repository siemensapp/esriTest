import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class DataRetrieverService {
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
}
