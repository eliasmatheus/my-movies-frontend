import { Component, Input } from '@angular/core';
import { Menu, MenuIcon } from '../../models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input({ required: true }) items: Menu[] = [];
  @Input() collapsed = false;

  isString(val: any): boolean {
    return typeof val === 'string';
  }

  getIconFontSet(icon: string | MenuIcon): string {
    icon = icon as MenuIcon;

    return icon.fontSet;
  }

  getIconName(icon: string | MenuIcon): string {
    icon = icon as MenuIcon;

    return icon.icon;
  }
}
