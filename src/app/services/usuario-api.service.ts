import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario, IUsuarios } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {

  constructor(private httpclient: HttpClient) { }

  //Crear nuevo usuario
  postUsuario(newUsuario: IUsuario):Observable<IUsuario>{
    return this.httpclient.post<IUsuario>(`${environment.apiUrl}/Usuario`, newUsuario);
  }

  //Obtener usuario
  getUsuario():Observable<IUsuarios[]>{
    return this.httpclient.get<IUsuarios[]>(`${environment.apiUrl}/Usuario`);
  }

  //Actualiar usuario
  putUsuario(Usuario:any):Observable<IUsuarios>{
    return this.httpclient.put<IUsuarios>(`${environment.apiUrl}/Usuario/${Usuario.id}`, Usuario);
  }

  getCorreo(Usuario:any):Observable<IUsuarios>{
    return this.httpclient.get<IUsuarios>(`${environment.apiUrl}/Usuario/?correo=${Usuario}`);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('correo')!=null;
  }

  logOut(){
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('apellido');
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('nombreUsuario');
    sessionStorage.removeItem('contrasenia');
    sessionStorage.removeItem('rut');
  }

}
