import { Directive, NgModule } from '@angular/core';
import { CpfValidatorDirective } from './components/cpf.directive';
import { CpfMaskDirective } from './components/cpf-mask.directive';

@NgModule({
  declarations: [CpfValidatorDirective, CpfMaskDirective],
  exports: [CpfValidatorDirective, CpfMaskDirective]
})
export class NgCpfModule {}
