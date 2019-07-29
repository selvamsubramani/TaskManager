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
      if (this.getControlDate(control.value) < this.getCurrentDate()) {
        return { 'invalid-start': true };
      }
    }
    else
      return { 'required': true };
  }

  getCurrentDate() : Date {
    const current = new Date();
    return new Date(current.getFullYear(), current.getMonth(), current.getDate());
  }

  getControlDate(value: string) : Date{
    const control = new Date(value);
    return new Date(control.getFullYear(), control.getMonth(), control.getDate() + 1);
  }
}