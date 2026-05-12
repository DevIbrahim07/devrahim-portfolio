import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-component.html',
  styleUrl: './about-component.scss',
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') sectionRef!: ElementRef;
  @ViewChild('aboutCard') cardRef!: ElementRef;

  skills = [
    'JavaScript',
    'TypeScript',
    'Next.js',
    'React',
    'Angular',
    'Node.js',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'Tailwind CSS',
  ];

  stats = [
    { value: '1+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Built' },
    { value: '3', label: 'Companies Worked' },
    { value: '4', label: 'Certifications' },
  ];

  ngAfterViewInit() {
    this.animateSection();
    this.init3DCard();
    this.animateFloatingParticles();
  }

  /* ── Scroll Animations ── */
  animateSection() {
    const section = this.sectionRef.nativeElement;

    // Heading slide in
    gsap.fromTo(
      '.about-heading',
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      },
    );

    // Text block rise up
    gsap.fromTo(
      '.about-text-block',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      },
    );

    // Paragraphs stagger
    gsap.fromTo(
      '.about-para',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.about-text-block', start: 'top 80%' },
      },
    );

    // Skills chips with 3D flip
    gsap.fromTo(
      '.skill-chip',
      { opacity: 0, rotateX: -90, y: 20 },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.06,
        scrollTrigger: { trigger: '.about-skills', start: 'top 85%' },
      },
    );

    // Code card 3D entrance
    gsap.fromTo(
      '.about-card',
      { opacity: 0, rotateY: -25, x: 60, transformPerspective: 1000 },
      {
        opacity: 1,
        rotateY: 0,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-right', start: 'top 80%' },
      },
    );

    // Stats 3D pop
    gsap.fromTo(
      '.stat-card',
      { opacity: 0, scale: 0.7, rotateY: 20 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: 0.12,
        scrollTrigger: { trigger: '.about-stats', start: 'top 88%' },
      },
    );

    // Code lines typewriter stagger
    gsap.fromTo(
      '.code-line',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.about-card', start: 'top 85%' },
      },
    );
  }

  /* ── 3D Mouse Tilt on Code Card ── */
  init3DCard() {
    const card = document.querySelector('.about-card') as HTMLElement;
    if (!card) return;

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: 'center center',
      });

      // Move glow with mouse
      gsap.to('.card-glow', {
        background: `radial-gradient(circle at ${x}px ${y}px,
          rgba(47, 121, 96, 0.12), transparent 70%)`,
        duration: 0.3,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.to('.card-glow', {
        background: 'radial-gradient(circle at 50% 0%, rgba(47, 121, 96, 0.06), transparent 70%)',
        duration: 0.4,
      });
    });
  }

  /* ── Floating Particles ── */
  animateFloatingParticles() {
    const particles = document.querySelectorAll('.about-particle');
    particles.forEach((p, i) => {
      gsap.to(p, {
        y: -20 - i * 8,
        x: Math.sin(i) * 15,
        duration: 2.5 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });
  }

  /* ── Stat counter animation ── */
  @HostListener('window:scroll')
  onScroll() {
    const statsEl = document.querySelector('.about-stats');
    if (!statsEl) return;
    const rect = statsEl.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      this.animateCounters();
    }
  }

  private countersAnimated = false;
  animateCounters() {
    if (this.countersAnimated) return;
    this.countersAnimated = true;

    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach((el) => {
      const text = el.textContent?.trim() || '';
      const num = parseInt(text);
      if (isNaN(num)) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: num,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.ceil(obj.val) + (text.includes('+') ? '+' : '');
        },
      });
    });
  }
}
