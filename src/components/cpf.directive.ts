import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';


@Directive({
  selector: '[validateCpf][ngModel],[validateCpf][formControl],[validateCpf][formControlName]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => CpfValidatorDirective), multi:true }
  ]
})

export class CpfValidatorDirective implements Validator {

    validator: Function;

    constructor(@Attribute('validateCpf') public validateCpf: string) {
        this.validator = this.validateCpfFactory();
    }

    validate(c: AbstractControl): { [key: string]: any } {
        return this.validator(c);
    }

    private validateCpfFactory() {
        return (c: AbstractControl) => {
            let field = c.value,
                cpf,
                number,
                digit,
                sum,
                result,
                equalDigits = true;
            
            cpf = field.replace(/(\.|\/|\-)/g,"");

            if (cpf.length < 11 || cpf.length > 11) {
                return {
                    validateCpf: {
                        valid: false
                    }
                };
            }

            for (let i = 0; i < cpf.length - 1; i++) {
                if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                    equalDigits = false;
                    break;
                }
            }

            if (equalDigits === false) {

                number = cpf.substring(0, 9);
                digit = cpf.substring(9);

                sum = 0;

                for (let i = 10; i > 1; i--) {
                    sum += number.charAt(10 - i) * i;
                }

                result = sum % 11 < 2 ? 0 : 11 - sum % 11;

                if (result != digit.charAt(0)) {
                    return {
                        validateCpf: {
                            valid: false
                        }
                    };
                }

                number = cpf.substring(0, 10);
                
                sum = 0;
                for (let i = 11; i > 1; i--) {
                    sum += number.charAt(11 - i) * i;
                }
                
                result = sum % 11 < 2 ? 0 : 11 - sum % 11;
                
                if (result != digit.charAt(1)) {
                    return {
                        validateCpf: {
                            valid: false
                        }
                    };
                }
                return null;
            }

            return {
                validateCpf: {
                    valid: false
                }
            };
        }
    }
}