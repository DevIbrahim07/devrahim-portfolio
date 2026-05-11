import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-component.html',
  styleUrl: './skills-component.scss',
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('skillsSection') sectionRef!: ElementRef;

  categories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Angular', level: 80 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 92 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 85 },
        { name: 'NestJS', level: 65 },
        { name: 'REST APIs', level: 88 },
        { name: 'Socket.IO', level: 75 },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'MySQL', level: 70 },
        { name: 'Mongoose', level: 82 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 88 },
        { name: 'GitHub', level: 88 },
        { name: 'Postman', level: 85 },
      ],
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.animateSection();
    }, 100);
  }

  animateSection() {
    if (!this.sectionRef?.nativeElement) return;
    const section = this.sectionRef.nativeElement;

    gsap.fromTo(
      '.skills-heading',
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
      '.skill-category',
      { opacity: 0, y: 50, rotateX: -10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' },
      },
    );

    ScrollTrigger.create({
      trigger: '.skills-grid',
      start: 'top 80%',
      onEnter: () => this.animateBars(),
    });
  }

  animateBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach((bar) => {
      const level = (bar as HTMLElement).dataset['level'] || '0';
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: level + '%',
          duration: 1.2,
          ease: 'power2.out',
          delay: Math.random() * 0.4,
        },
      );
    });
  }

  onCardHover(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.35,
      ease: 'power2.out',
    });
  }

  onCardLeave(card: HTMLElement) {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  }
}
