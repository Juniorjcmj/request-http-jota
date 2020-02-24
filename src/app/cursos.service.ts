import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './cursos/curso';
import { tap, delay, take } from 'rxjs/operators';
//import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API= ' http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Curso[]>(this.API)
    .pipe(
      tap(console.log)
    )
    ;
  }



















}
