import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience-component',
  imports: [CommonModule],
  templateUrl: './experience-component.html',
  styleUrl: './experience-component.scss',
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('expSection') sectionRef!: ElementRef;

  activeIndex = 0;

  experiences = [
    {
      role: 'Software Engineer',
      company: 'Deep Cognitive Solutions',
      duration: 'Mar 2026 – Present',
      type: 'Full-time',
      points: [
        'Developing and maintaining full-stack web applications using the MERN stack and Next.js.',
        'Contributing to scalable backend APIs and responsive front-end interfaces in a professional team environment.',
      ],
      tech: ['Next.js', 'React', 'Angular', 'Node.js', 'MongoDB'],
    },
    {
      role: 'Junior MERN Stack Developer',
      company: 'Endless Invo',
      duration: 'Oct 2025 – Dec 2025',
      type: 'Full-time',
      points: [
        'Built dynamic web applications using Next.js, React, Node.js, and Express.js.',
        'Integrated RESTful APIs and developed reusable UI components for interactive user experiences.',
      ],
      tech: ['Next.js', 'React', 'Node.js', 'Express.js'],
    },
    {
      role: 'React Developer',
      company: 'AlHai-Softs',
      duration: 'Nov 2024 – Apr 2025',
      type: 'Full-time',
      points: [
        'Designed clean, responsive layouts with a focus on smooth user experience and backend integration.',
        'Optimized website performance through efficient and maintainable code practices.',
      ],
      tech: ['React', 'JavaScript', 'Api Integration', 'TailwindCSS'],
    },
    {
      role: 'Web Developer Intern',
      company: 'BISM Software House',
      duration: 'Jun 2023 – Aug 2023',
      type: 'Internship',
      points: [
        'Gained hands-on exposure to core and advanced web technologies.',
        'Collaborated on small-scale projects within a team environment.',
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'],
    },
  ];

  ngAfterViewInit() {
    this.animateSection();
  }

  setActive(index: number) {
    this.activeIndex = index;
    this.animateContent();
  }

  animateSection() {
    const section = this.sectionRef.nativeElement;

    gsap.fromTo(
      '.exp-heading',
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      },
    );

    gsap.fromTo(
      '.exp-tabs',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: { trigger: section, start: 'top 75%' },
      },
    );

    gsap.fromTo(
      '.exp-content',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: { trigger: section, start: 'top 75%' },
      },
    );
  }

  animateContent() {
    gsap.fromTo(
      '.exp-content',
      { opacity: 0, y: 20, x: 10 },
      { opacity: 1, y: 0, x: 0, duration: 0.4, ease: 'power3.out' },
    );

    gsap.fromTo(
      '.exp-point',
      { opacity: 0, x: -15 },
      {
        opacity: 1,
        x: 0,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.15,
      },
    );

    gsap.fromTo(
      '.exp-tech-tag',
      { opacity: 0, scale: 0.85, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'back.out(1.5)',
        stagger: 0.06,
        delay: 0.25,
      },
    );
  }
}
