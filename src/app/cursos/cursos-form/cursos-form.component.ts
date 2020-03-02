import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from 'src/app/cursos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styles: []
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CursosService,
              private modal: AlertModalService, private location: Location) { }

  ngOnInit() {

  this.form = this.fb.group({
    nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
  });
  }
  hasError(field: string){
    return this.form.get(field).errors;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
        console.log('submit');
        this.service.create(this.form.value).subscribe(
          success =>{
            this.modal.shoAlertSuccess('Curso criado com sucesso!');
            this.location.back();
          } ,
          error => this.modal.shoAlertDanger('Erroa ao cria curso, tente novamente mais tarde!'),
          () => console.log('request completo')
        );
      }
  }
  onCancel(){
    this.submitted = false;
    this.form.reset();
    //console.log('cancelou');
  }
}
