import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface Params {
  [key: string]: string;
}

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button [title]="title" type="button" [class]="class">
      <div class="flex items-center justify-center">
        <ng-content></ng-content>
      </div>
    </button>
  `,
})
export class ButtonComponent implements OnChanges {
  @Input() status = 'light';
  @Input() size = 'medium';
  @Input() title = '';

  protected class = this.getClass();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status'] || changes['size']) {
      this.class = this.getClass();
    }
  }

  private getClass() {
    const sizes: Params = {
      square: 'p-2.5 text-sm',
      small: 'px-3 py-1.5 text-xs',
      medium: 'px-5 py-2.5 text-sm',
      large: 'px-6 py-3 text-base',
    };

    const classes: Params = {
      light: `rounded-lg border border-gray-300 bg-white ${
        sizes[this.size]
      } font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700`,
      danger: `rounded-lg border border-gray-300 bg-white ${
        sizes[this.size]
      } font-medium text-red-900 hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-white dark:hover:border-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700`,
      ghost: `rounded-lg ${
        sizes[this.size]
      } text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700`,
    };

    return classes[this.status];
  }
}
