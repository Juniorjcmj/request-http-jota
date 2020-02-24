import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/cursos.service';
import { Curso } from '../curso';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
   preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
 
  //cursos: Curso[];
  cursos$: Observable<Curso[]>;

  constructor(private service: CursosService) { }

  ngOnInit(){
   // this.service.list()
   // .subscribe(dados => this.cursos = dados);
   this.cursos$ = this.service.list();
  }

}
