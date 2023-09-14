import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    this.setUserTheme(this.getTheme());
  }

  setUserTheme(theme: string) {
    document.body.classList.remove('light', 'dark');

    document.body.classList.add(theme);
    localStorage.setItem('color-theme', theme);
  }

  getTheme() {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark';
    }

    return 'light';
  }
}
