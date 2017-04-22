import { Directive, ElementRef, forwardRef, Input, NgModule, OnChanges, Provider, Renderer, SimpleChanges } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

export const MASKEDINPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CpfMaskDirective),
  multi: true
}

@Directive({
  host: {
    '(input)': 'onInput($event.target.value)'
  },
  selector: '[cpfMask]',
  providers: [MASKEDINPUT_VALUE_ACCESSOR]
})
@Input('cpfMask')
export class CpfMaskDirective implements OnChanges {
  private inputElement: HTMLInputElement;

  constructor(private renderer: Renderer, private element: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setupMask();
  }

  onInput(value) {
    if (!this.inputElement) {
      this.setupMask();
    }
    this.renderer.setElementProperty(this.inputElement, 'value', this.format(value));
  }

  format(value) {
    let formated = value
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return formated;
  }

  private setupMask() {
    if (this.element.nativeElement.tagName === 'INPUT') {
      // `textMask` directive is used directly on an input element
      this.inputElement = this.element.nativeElement
    } else {
      // `textMask` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
      this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0]
    }
  }
}
