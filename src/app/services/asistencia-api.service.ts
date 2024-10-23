import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iasistencia, Iasistencias } from '../interfaces/iasistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaApiService {

  constructor(private httpclient: HttpClient) { }

  postAsistencia(newAsistencia: Iasistencia):Observable<Iasistencia>{
    return this.httpclient.post<Iasistencia>(`${environment.apiUrl}/asistencia`, newAsistencia);
  }

  getAsistencia():Observable<Iasistencias[]>{
    return this.httpclient.get<Iasistencias[]>(`${environment.apiUrl}/asistencia`);
  }

  putAsistencia(Asistencia:any):Observable<Iasistencias>{
    return this.httpclient.put<Iasistencias>(`${environment.apiUrl}/asistencia/${Asistencia.id}`, Asistencia);
  }

  deleteAsistencia(Asistencia:any):Observable<Iasistencias>{
    return this.httpclient.delete<Iasistencias>(`${environment.apiUrl}/asistencia/${Asistencia.id}`);
  }
}
