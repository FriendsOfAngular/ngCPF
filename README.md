# NgCpf Validator & Mask

With NgCpf you'll be able to validate and format inputs that receives the Brazilian CPF.

This Angular module support angular versions >= 2 and also compatible with Ionic `ion-input`.


## Setup

First, install the module:

```bash
npm i --save ngcpf
```
Then, import to your `@NgModule`:

```javascript
import { NgModule } from '@angular/core';
import { NgCpfModule } from 'ngcpf';

@NgModule({
  imports: [
    NgCpfModule
  ],
  declarations: []
})
export class MyModule {}
```

## Usage
Now, you will be able to use in your components:

```javascript
@Component({
  selector: 'app',
  template: `
    <input validateCpf="myModel" cpfMask [(ngModel)]="myModel" type="text"/>
  `
})
export class AppComponent {
  public myModel = '';
}
```

## Notes

Some useful information:

1. You can use the validator with `<input>`,`<md-input>`, `<ion-input>`;
2. The mask directive will only works with input of type `text` and `tel`;
3. To use the mask directive you don't need to pass any pattern, just use `cpfMask`;

**Issues are wellcome!**
