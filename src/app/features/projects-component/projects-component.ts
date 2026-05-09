import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects-component',
  imports: [CommonModule],
  templateUrl: './projects-component.html',
  styleUrl: './projects-component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('projectsSection') sectionRef!: ElementRef;

  projects = [
    {
      title: 'Talkora',
      subtitle: 'Full-Stack Real-Time Chat Application',
      description:
        'A full-stack real-time chat application built with Angular and Node.js. Features include authentication, user profiles, online/offline status, typing indicators, read receipts, unread notifications, and file sharing powered by Socket.IO.',
      tech: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Tigris Cloud Storage '],
      liveUrl: 'https://talkora-chat.vercel.app/',
      githubUrl: '',
      featured: true,
      gradient: 'from-cyan to-blue',
    },
    {
      title: 'EcatPrep',
      subtitle: 'ECAT Exam Preparation Web App',
      description:
        'An exam preparation platform featuring a quiz system to help students practice for the ECAT. Includes a study resources section with notes, past papers, recommended books, and a Q&A section.',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      liveUrl: '',
      githubUrl: '',
      featured: true,
      gradient: 'from-green to-cyan',
    },
    {
      title: 'Mind Engineering',
      subtitle: 'Company Website — Freelance',
      description:
        'A responsive company website for Mind Engineering showcasing LPG bowser manufacturing services. Focused on user-friendly navigation and clean structure for easy access to company information.',
      tech: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'],
      liveUrl: '',
      githubUrl: '',
      featured: false,
      gradient: 'from-purple to-pink',
    },
    {
      title: 'CampusHub',
      subtitle: ' Student management system',
      description:
        'Developed a full-stack Student Management System using Next.js, Node.js, Express.js, and MongoDB. Built separate Admin, Teacher, and Student panels with secure role-based authentication and authorization. Created features for student records, attendance tracking, course management, and teacher management.',
      tech: ['Next.js', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
      liveUrl: 'https://student-management-system-two-omega.vercel.app/',
      githubUrl: 'https://github.com/DevIbrahim07/student-management-system',
      featured: false,
      gradient: 'from-orange to-red',
    },
    {
      title: 'TaskNow',
      subtitle: ' Task Management Application',
      description:
        'Built a full-featured Task Management Web App  with complete CRUD functionality, enabling users to create, update, delete, and organize tasks efficiently.Implemented advanced task features including priority setting, status tracking and real-time search/filtering to improve user productivity and task organization.',
      tech: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
      liveUrl: 'https://tasknow-three.vercel.app/',
      githubUrl: 'https://github.com/DevIbrahim07/tasknow',
      featured: false,
      gradient: 'from-orange to-red',
    },
    {
      title: 'Ad Posting Platform',
      subtitle: ' Ad Marketplace',
      description:
        'A responsive ad posting platform with features for image uploads, pricing, and descriptions. Built with a clean UI focused on usability and performance.',
      tech: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
      liveUrl: '',
      githubUrl: '',
      featured: false,
      gradient: 'from-orange to-red',
    },
  ];

  ngAfterViewInit() {
    this.animateSection();
  }

  animateSection() {
    const section = this.sectionRef.nativeElement;

    // Heading
    gsap.fromTo(
      '.projects-heading',
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      },
    );

    // Featured cards
    gsap.fromTo(
      '.project-card-featured',
      { opacity: 0, y: 60, rotateX: -8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.projects-featured', start: 'top 80%' },
      },
    );

    // Other cards
    gsap.fromTo(
      '.project-card-small',
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.3)',
        stagger: 0.15,
        scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
      },
    );
  }

  init3DHover(event: MouseEvent, card: HTMLElement) {
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
      transformPerspective: 900,
      duration: 0.35,
      ease: 'power2.out',
    });
  }

  reset3DHover(card: HTMLElement) {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  }
}
