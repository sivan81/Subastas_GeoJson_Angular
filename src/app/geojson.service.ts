import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Importa 'Observable' y 'of' de RxJS
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeojsonService {
  

  constructor(private http: HttpClient) {}

  // Método para obtener los datos
  getData(): Observable<any> {
    return this.http.get('assets/subastas.geojson');
  }
}

