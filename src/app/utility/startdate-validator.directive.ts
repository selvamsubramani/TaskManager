import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms'

@Directive({
  selector: '[appStartdateValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: StartdateValidatorDirective,
    multi: true
  }]
})

export class StartdateValidatorDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      if (new Date(control.value) < new Date()) {
        return { 'invalid-start': true };
      }
    }
    else
      return { 'required': true };
  }
}