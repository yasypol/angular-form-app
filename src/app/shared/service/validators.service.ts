import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider ( control: FormControl ): ValidationErrors | null {

    const value: string = control.value.trim().toLowerCase();

    if ( value === 'strider' ) {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  public isFieldOneEqualFieldTwo (field1: string, field2: string): ValidationErrors | null {
    return ( formGroup: FormGroup ): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value ||'';
      const fieldValue2 = formGroup.get(field2)?.value ||'';

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

  public isValidField( form: FormGroup, field: string ): boolean | null {
    return form.controls[field].errors &&
           form.controls[field].touched;
  }

  public isValidFieldInArray( formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors &&
           formArray.controls[index].touched;
  }

  public getFieldError( form: FormGroup, field: string ): string | null {

    if ( !form.controls[field] && !form.controls[field].errors ) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      console.log(key);
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }

    return null;
  }
}
