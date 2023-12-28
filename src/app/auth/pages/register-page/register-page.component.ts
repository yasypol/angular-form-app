import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:       ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)] ],
    email:      ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator] ],
    username:   ['', [Validators.required, this.validatorsService.cantBeStrider] ],
    password:   ['', [Validators.required, Validators.minLength(6)] ],
    password2:  ['', [Validators.required] ]
  }, {
    // Validaciones a nivel de formulario. Acceso a todos los elementos del mismo
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  constructor (
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  getFieldError( form: FormGroup, field: string ): string | null {
    return this.validatorsService.getFieldError(form, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    console.log(this.myForm.value);
  }
}
