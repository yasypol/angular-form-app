import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor( private fb: FormBuilder) {}

  // Carga por defecto (por ejemplo desde un backend o url)
  ngOnInit(): void {
    // this.myForm.reset(rtx5090);
  }

  isValidField( field: string ): boolean | null {

    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] && !this.myForm.controls[field].errors ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      console.log(key);
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }

    return 'Hola mundo';
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
