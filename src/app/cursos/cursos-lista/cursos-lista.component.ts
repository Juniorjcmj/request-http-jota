import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/cursos.service';
import { Curso } from '../curso';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
   preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  [x: string]: any;

  // cursos: Curso[];
 // modalRef: BsModalRef;
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService,
    // private modalService: BsModalService
              private alertService: AlertModalService) { }

  ngOnInit() {
   // this.service.list()
   // .subscribe(dados => this.cursos = dados);
  this.onRefresh();
  }
  onRefresh() {
    this.cursos$ = this.service.list()
    .pipe(
       // map(),
      // tap(),
      // switchMap(),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
    this.service.list()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(
        dados => {
          console.log(dados);
        }
        // error => console.error(error),
       // () => console.log('Observable completo')
    );
  }
    handleError() {
      this.alertService.shoAlertDanger('Erro ao carregar curso. Tente novamente mais tarde!');
      // this.bsModalRef = this.modalService.show(AlertModalComponent);
      // this.bsModalRef.content.type = 'danger';
      // this.bsModalRef.content.message = 'Erro ao carregar curso. Tente novamente mais tarde!';

    }
}
