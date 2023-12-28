import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  // Para usar modulso en el HTML, importar ReactiveFormsModule en el reactive.module.ts
  // public myForm: FormGroup = new FormGroup( {
  //   // - 1: []: valor por defecto
  //   // - 2: []: validaciones síncronas
  //   // - 3: []: validaciones asíncronas
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  // Esto es lo mismo que el bloque anterior
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0)] ],
    inStorage: [0, [Validators.required, Validators.min(0)] ],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  // Carga por defecto (por ejemplo desde un backend o url)
  ngOnInit(): void {
    // this.myForm.reset(rtx5090);
  }

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  onSave(): void {
    if (this.myForm.invalid ) {
      this.myForm.markAllAsTouched;
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({
      price: 0,
      inStorage: 0
    });
  }



}
