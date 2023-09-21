import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  sizes: {
    [key: string]: string;
  } = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  message = 'Loading...';
  status = 'basic';
  size = 'medium';

  getSizeClass() {
    return this.sizes[this.size];
  }
}
