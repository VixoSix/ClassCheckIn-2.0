import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPeriodo } from '../interfaces/iperiodo';

@Injectable({
  providedIn: 'root'
})
export class PeriodoApiService {

  constructor(private httpclient: HttpClient) { }

  getPeriodo():Observable<IPeriodo[]>{
    return this.httpclient.get<IPeriodo[]>(`${environment.apiUrl}/Periodo`);
  }
}
