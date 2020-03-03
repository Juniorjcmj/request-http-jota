import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from 'src/app/cursos.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styles: []
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params: any) => {
    //   const id = params['id'];
    //   console.log(id);
    //   const curso$ = this.service.loadById(id);
    //   curso$.subscribe(curso => {
    //     this.updateForm(curso);
    //   });
    // });

    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.service.loadById(id))
    //    // switchMap(cursos => obterAulas)
    //   )
    // .subscribe(curso => this.updateForm(curso));

     // concatMap -> ordem da requisiçao importa
    // mergeMap -> ordem nao importa
    // exhaustMap -> casos de login

    const curso = this.route.snapshot.data.curso;

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ]
    });
  }
  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }
  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente mais tarde!';
      if(this.form.value.id){
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente mais tarde!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.shoAlertSuccess(msgSuccess);
          this.location.back();
      },
        error => {
          this.modal.shoAlertDanger(msgError);
        }
      );

      // if (this.form.value.id) {
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       this.modal.shoAlertSuccess('Curso atualizado com sucesso!');
      //       this.location.back();
      //     },
      //     error =>
      //     this.modal.shoAlertDanger(
      //       'Erro ao atualizar curso, tente novamente mais tarde!'
      //     ),
      //     () => console.log('update completo')
      //   );
      // } else {
      //   this.service.create(this.form.value).subscribe(
      //     success => {
      //       this.modal.shoAlertSuccess('Curso criado com sucesso!');
      //       this.location.back();
      //     },
      //     error =>
      //       this.modal.shoAlertDanger(
      //         'Erro ao cria curso, tente novamente mais tarde!'
      //       ),
      //     () => console.log('request completo')
      //   );
      // }
    }
  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('cancelou');
  }
}
