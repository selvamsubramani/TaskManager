import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms'
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDateValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateValidatorDirective,
    multi: true
  }]
})

export class DateValidatorDirective implements Validator {

  @Input('appDateValidator') controlToCompare: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const compareDateControl = control.parent.get(this.controlToCompare);
    if (compareDateControl) {
      const subscription: Subscription = compareDateControl.valueChanges.subscribe(
        () => {
          control.updateValueAndValidity();
          subscription.unsubscribe();
        });
    }
    if (control.value) {
      if (compareDateControl.value) {
        return new Date(control.value) >= new Date(compareDateControl.value) ? null : { 'invalid-date': true };
      }
    }
    else
      return { 'required': true };
  }
}