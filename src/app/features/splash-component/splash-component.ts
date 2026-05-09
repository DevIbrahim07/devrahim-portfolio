import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SplashService } from '../../core/services/splash-service';

@Component({
  selector: 'app-splash-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-component.html',
  styleUrl: './splash-component.scss',
})
export class SplashComponent implements OnInit {
  splash = inject(SplashService);
  cdr = inject(ChangeDetectorRef);

  displayText = '';
  showCursor = true;
  showBar = false;
  progress = 0;
  typingDone = false;

  private fullText = 'Ibrahim';

  ngOnInit() {
    this.startSequence();
  }

  startSequence() {
    this.typeText(0, () => {
      setTimeout(() => {
        this.showBar = true;
        this.cdr.detectChanges();
        this.animateBar();
      }, 300);
    });
  }

  typeText(index: number, onDone: () => void) {
    if (index <= this.fullText.length) {
      this.displayText = this.fullText.substring(0, index);
      this.cdr.detectChanges();
      setTimeout(() => this.typeText(index + 1, onDone), 120);
    } else {
      this.typingDone = true;
      this.cdr.detectChanges();
      onDone();
    }
  }

  animateBar() {
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      this.progress = Math.min((current / steps) * 100, 100);
      this.cdr.detectChanges();

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => this.exitSplash(), 300);
      }
    }, interval);
  }

  exitSplash() {
    const el = document.querySelector('.splash-screen') as HTMLElement;
    if (!el) {
      this.splash.hide();
      return;
    }

    gsap.to(el, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => this.splash.hide(),
    });
  }
}
