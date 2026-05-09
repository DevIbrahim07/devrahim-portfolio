import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashService } from './core/services/splash-service';
import { SplashComponent } from './features/splash-component/splash-component';
import { NavbarComponent } from './shared/components/navbar-component/navbar-component';
import { HeroComponent } from './features/hero-component/hero-component';
import { AboutComponent } from './features/about-component/about-component';
import { ExperienceComponent } from './features/experience-component/experience-component';
import { ProjectsComponent } from './features/projects-component/projects-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SplashComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  splash = inject(SplashService);
}
