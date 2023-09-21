import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerDirective } from './spinner.directive';

@NgModule({
  declarations: [SpinnerDirective],
  imports: [CommonModule],
  exports: [SpinnerDirective],
})
export class DirectivesModule {}
