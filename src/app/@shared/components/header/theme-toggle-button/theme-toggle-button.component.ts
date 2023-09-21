import { Component } from '@angular/core';
import { ThemeService } from 'src/app/@shared/services/theme.service';

@Component({
  selector: 'app-theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  styleUrls: ['./theme-toggle-button.component.scss'],
})
export class ThemeToggleButtonComponent {
  theme = this.themeService.getTheme();

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    const nextTheme = this.theme === 'light' ? 'dark' : 'light';

    this.theme = nextTheme;
    this.themeService.setUserTheme(nextTheme);
  }
}
