import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { gsap } from 'gsap';
import { ThemeService } from '../../core/services/theme-service';
@Component({
  selector: 'app-hero-component',
  imports: [CommonModule],
  templateUrl: './hero-component.html',
  styleUrl: './hero-component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  theme = inject(ThemeService);
  cdr = inject(ChangeDetectorRef);

  displayText = '';
  typingDone = false;
  private typingTimeout: ReturnType<typeof setTimeout> | null = null;

  roles = ['Full-Stack Developer', 'MERN Stack Developer', 'Next.js Developer'];
  currentRole = 0;
  isDeleting = false;
  typingSpeed = 100;

  // Your real links
  githubUrl = 'https://github.com/devibrahim07';
  linkedinUrl = 'https://linkedin.com/in/devibrahim07';
  email = 'Dev.ibrahim0077@gmail.com';

  ngAfterViewInit() {
    this.animateEntrance();
    this.scheduleType(300);
    this.initCursorBlink();
  }

  ngOnDestroy() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
  }

  /* ── GSAP entrance ── */
  animateEntrance() {
    gsap.set(
      [
        '.hero-greeting',
        '.hero-name',
        '.hero-role',
        '.hero-desc',
        '.hero-cta',
        '.hero-scroll',
        '.hero-social',
        '.hero-email',
      ],
      { opacity: 0, y: 30 },
    );

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to('.hero-greeting', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('.hero-name', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to('.hero-role', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.5 }, '-=0.1')
      .to('.hero-social', { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, '-=0.3')
      .to('.hero-email', { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');
  }

  /* ── Typewriter ── */
  typeStep() {
    const current = this.roles[this.currentRole];

    if (this.isDeleting) {
      this.displayText = current.substring(0, this.displayText.length - 1);
    } else {
      this.displayText = current.substring(0, this.displayText.length + 1);
    }

    this.cdr.detectChanges();

    let speed = this.isDeleting ? 50 : this.typingSpeed;

    if (!this.isDeleting && this.displayText === current) {
      speed = 2200;
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.currentRole = (this.currentRole + 1) % this.roles.length;
      speed = 400;
    }

    this.scheduleType(speed);
  }

  private scheduleType(delay: number) {
    this.typingTimeout = setTimeout(() => this.typeStep(), delay);
  }

  /* ── Cursor blink ── */
  initCursorBlink() {
    gsap.to('.typing-cursor', {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
  }

  /* ── Scroll helpers ── */
  scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
