import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-about-component',
  imports: [CommonModule],
  templateUrl: './about-component.html',
  styleUrl: './about-component.scss',
})
export class AboutComponent implements AfterViewInit {
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
    { value: '10+', label: 'Projects Built' },
    { value: '4', label: 'Companies Worked' },
    { value: '3', label: 'Certifications' },
  ];
  sectionRef: any;

  ngAfterViewInit() {
    this.animateSection();
  }

  animateSection() {
    const section = this.sectionRef.nativeElement;

    // Heading
    gsap.fromTo(
      '.about-heading',
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      },
    );

    // Left content
    gsap.fromTo(
      '.about-text-block',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      },
    );

    // Skills chips
    gsap.fromTo(
      '.skill-chip',
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.about-skills',
          start: 'top 85%',
        },
      },
    );

    // Stats
    gsap.fromTo(
      '.stat-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
        },
      },
    );
  }
}
