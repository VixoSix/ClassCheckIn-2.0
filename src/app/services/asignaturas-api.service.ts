import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAsignatura } from '../interfaces/iasignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasApiService {

  constructor(private httpclient: HttpClient) { }

  getAsignatura():Observable<IAsignatura[]>{
    return this.httpclient.get<IAsignatura[]>(`${environment.apiUrl}/Asignaturas`);
  }
}
