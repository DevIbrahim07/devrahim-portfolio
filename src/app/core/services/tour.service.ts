// import { Injectable, inject } from '@angular/core';
// import { driver, Driver, DriveStep } from 'driver.js';
// // TypeScript may error on side-effect CSS imports if no type declarations exist for '*.css'.
// // Ignore the next line so the build can include driver.js styles without adding a global d.ts.
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import 'driver.js/dist/driver.css';

// @Injectable({ providedIn: 'root' })
// export class TourService {
//   private driverObj!: Driver;
//   private tourShown = false;

//   initTour() {
//     this.driverObj = driver({
//       animate: true,
//       showProgress: true,
//       showButtons: ['next', 'previous', 'close'],
//       steps: this.getSteps(),
//       progressText: '{{current}} of {{total}}',
//       nextBtnText: 'Next →',
//       prevBtnText: '← Prev',
//       doneBtnText: 'Done ✓',

//       onDestroyStarted: () => {
//         this.driverObj.destroy();
//       },

//       popoverClass: 'portfolio-tour-popover',
//     });
//   }

//   startTour() {
//     if (!this.driverObj) this.initTour();
//     this.driverObj.drive();
//   }

//   autoStartTour() {
//     const seen = localStorage.getItem('portfolio-tour-seen');
//     if (seen) return;

//     setTimeout(() => {
//       this.startTour();
//       localStorage.setItem('portfolio-tour-seen', 'true');
//     }, 1000);
//   }

//   resetTour() {
//     localStorage.removeItem('portfolio-tour-seen');
//   }

//   private getSteps(): DriveStep[] {
//     return [
//       {
//         element: '.navbar-logo',
//         popover: {
//           title: ' Welcome!',
//           description:
//             "I'm Muhammad Ibrahim — Full-Stack Developer. Let me give you a quick tour of my portfolio.",
//           side: 'bottom',
//           align: 'start',
//         },
//       },
//       {
//         element: '.navbar-links',
//         popover: {
//           title: ' Navigation',
//           description:
//             'Use these links to jump to any section — About, Experience, Projects, Skills, or Contact.',
//           side: 'bottom',
//           align: 'center',
//         },
//       },
//       {
//         element: '.theme-toggle',
//         popover: {
//           title: ' Theme Toggle',
//           description:
//             'Switch between dark and light mode anytime — your preference is saved automatically.',
//           side: 'bottom',
//           align: 'end',
//         },
//       },
//       {
//         element: '.hero-name',
//         popover: {
//           title: ' Hero Section',
//           description: "This is where you'll find who I am, what I do, and how to reach me.",
//           side: 'bottom',
//           align: 'start',
//         },
//       },
//       {
//         element: '.hero-cta',
//         popover: {
//           title: ' Quick Actions',
//           description: 'Jump directly to my projects or get in touch with me using these buttons.',
//           side: 'top',
//           align: 'start',
//         },
//       },
//       {
//         element: '#about',
//         popover: {
//           title: ' About Me',
//           description:
//             'Learn about my background, skills, and what I bring to the table as a developer.',
//           side: 'top',
//           align: 'start',
//         },
//       },
//       {
//         element: '#experience',
//         popover: {
//           title: ' Experience',
//           description:
//             'My professional journey — click each company tab to see my role and contributions.',
//           side: 'top',
//           align: 'start',
//         },
//       },
//       {
//         element: '#projects',
//         popover: {
//           title: ' Projects',
//           description:
//             'Real-world projects I have built — hover over cards for 3D effects and click links to see them live.',
//           side: 'top',
//           align: 'start',
//         },
//       },
//       {
//         element: '#skills',
//         popover: {
//           title: ' Skills',
//           description:
//             'My technical skills with proficiency levels — from frontend to backend and tools.',
//           side: 'top',
//           align: 'start',
//         },
//       },
//       {
//         element: '#contact',
//         popover: {
//           title: ' Contact',
//           description:
//             "Have a project in mind? Fill out the form and I'll get back to you within 24 hours!",
//           side: 'top',
//           align: 'start',
//         },
//       },
//     ];
//   }
// }
