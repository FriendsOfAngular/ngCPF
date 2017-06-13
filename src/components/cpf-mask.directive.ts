import { Directive, HostListener, Input, Provider } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

@Directive({
  selector: '[cpfMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CpfMaskDirective,
    multi: true
  }]
})
export class CpfMaskDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  cpfMask: string = '999.999.999-99';

  writeValue(value: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    let value = $event.target.value.replace(/\D/g, '');
    const pad = this.cpfMask.replace(/\D/g, '').replace(/9/g, '_');
    let valueMask = value + pad.substring(0, pad.length - value.length);

    if ($event.keyCode === 8) {
      this.onChange(value);
      return;
    }

    if (value.length <= pad.length) {
      this.onChange(value);
    }

    let valorMaskPos = 0;
    value = '';
    for (let i = 0; i < this.cpfMask.length; i++) {
      if (isNaN(parseInt(this.cpfMask.charAt(i)))) {
        value += this.cpfMask.charAt(i);
      } else {
        value += valueMask[valorMaskPos++];
      }
    }

    if (value.indexOf('_') > -1) {
      value = value.substr(0, value.indexOf('_'));
    }

    $event.target.value = value;
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.cpfMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }
}
