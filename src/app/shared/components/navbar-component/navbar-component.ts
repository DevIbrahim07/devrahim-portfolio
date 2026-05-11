import {
  Component,
  OnInit,
  inject,
  HostListener,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ThemeService } from '../../../core/services/theme-service';
// import { TourService } from '../../../core/services/tour.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  theme = inject(ThemeService);
  // tour = inject(TourService);

  isScrolled = signal(false);
  isMobileOpen = signal(false);
  profileImage = 'assets/images/profile.png';

  @ViewChild('navbar') navbarRef!: ElementRef;

  navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    gsap.fromTo(
      this.navbarRef.nativeElement,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 },
    );
    // Auto start tour on first visit
    // this.tour.autoStartTour();
  }
  // startTour() {
  //   this.tour.resetTour();
  //   this.tour.startTour();
  // }
  scrollTo(href: string) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    this.isMobileOpen.set(false);
  }
}
