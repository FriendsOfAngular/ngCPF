import { Directive, NgModule } from '@angular/core';
import { CpfValidatorDirective } from './components/cpf.directive';

@NgModule({
  declarations: [CpfValidatorDirective],
  exports: [CpfValidatorDirective]
})
export class NgCpfModule {}
