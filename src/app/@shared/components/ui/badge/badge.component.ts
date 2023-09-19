import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span
      class="mr-2 rounded border border-gray-500 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-400"
    >
      <ng-content></ng-content>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {}
