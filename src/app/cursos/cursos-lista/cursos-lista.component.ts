import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from 'src/app/cursos.service';
import { Curso } from '../curso';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';
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

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado: Curso;

  constructor(
    private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);
    this.onRefresh();
  }
  onRefresh() {
    this.cursos$ = this.service.list().pipe(
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
    // this.service.list()
    // .pipe(
    // catchError(error => empty())
    //  )
    //  .subscribe(
    //   dados => {
    //     console.log(dados);
    //   }
    // error => console.error(error),
    // () => console.log('Observable completo')
    // );
  }
  handleError() {
    this.alertService.shoAlertDanger(
      'Erro ao carregar curso. Tente novamente mais tarde!'
    );
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar curso. Tente novamente mais tarde!';
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso) {
    this.cursoSelecionado = curso;
   // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm' });

    const result$ =this.alertService.showConfirm('Confirmação', ' Tem certeza que deseja remover esse curso?','Sim','Não');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ?  this.service.remove(curso.id) : EMPTY )
      )
      .subscribe(
        success => {
        this.onRefresh();
      },
      error => {
        this.alertService.shoAlertDanger('Erro ao remover curso. Tente novamente mais tarde!');

      })

  }
  onConfirmDelete(): void {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.onRefresh(), this.deleteModalRef.hide();
      },
      error => {
        this.alertService.shoAlertDanger(
          'Erro ao remover curso. Tente novamente mais tarde!'
        ),
          this.deleteModalRef.hide();
      }
    );

    this.message = 'Confirmed!';
    this.modalRef.hide();
  }
  onDeclineDelete(): void {
    this.deleteModalRef.hide();
  }
}
