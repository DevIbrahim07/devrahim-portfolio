import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SplashService {
  isVisible = signal<boolean>(true);

  hide() {
    this.isVisible.set(false);
  }
}
