import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
  selector: '[appUsernameValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UsernameValidatorDirective,
      multi: true
    }
  ]
})
export class UsernameValidatorDirective implements Validator {
  constructor() {
    this.validator = UsernameValidatorDirective.usernameValidator();
  }
  validator: ValidatorFn;

  static usernameValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = /[\w-_]+/.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          usernamevalidator: {
            valid: false
          }
        };
      }
    };
  }
  validate(c: FormControl) {
    return this.validator(c);
  }
}
