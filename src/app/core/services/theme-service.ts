import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal<boolean>(true);

  constructor() {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      this.isDark.set(saved === 'dark');
    }
    this.applyTheme();

    effect(() => {
      this.applyTheme();
      localStorage.setItem('portfolio-theme', this.isDark() ? 'dark' : 'light');
    });
  }

  toggle() {
    this.isDark.set(!this.isDark());
  }

  private applyTheme() {
    const html = document.documentElement;
    if (this.isDark()) {
      html.classList.remove('light-mode');
    } else {
      html.classList.add('light-mode');
    }
  }
}
