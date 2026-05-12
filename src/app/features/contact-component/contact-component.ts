// import { Component, AfterViewInit, ElementRef, ViewChild, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { environment } from '../../../environments/environment';

// gsap.registerPlugin(ScrollTrigger);

// @Component({
//   selector: 'app-contact-component',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './contact-component.html',
//   styleUrl: './contact-component.scss',
// })
// export class ContactComponent implements AfterViewInit {
//   @ViewChild('contactSection') sectionRef!: ElementRef;

//   formData = {
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   };

//   isSubmitting = signal(false);
//   submitStatus = signal<'idle' | 'success' | 'error'>('idle');

//   socials = [
//     {
//       label: 'GitHub',
//       url: 'https://github.com/DevIbrahim07',
//       icon: 'github',
//     },
//     {
//       label: 'LinkedIn',
//       url: 'https://linkedin.com/in/DevIbrahim07',
//       icon: 'linkedin',
//     },
//     {
//       label: 'Email',
//       url: 'mailto:Dev.ibrahim0077@gmail.com',
//       icon: 'email',
//     },
//   ];

//   ngAfterViewInit() {
//     setTimeout(() => this.animateSection(), 100);
//   }

//   animateSection() {
//     if (!this.sectionRef?.nativeElement) return;
//     const section = this.sectionRef.nativeElement;

//     gsap.fromTo(
//       '.contact-heading',
//       { opacity: 0, x: -40 },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.8,
//         ease: 'power3.out',
//         scrollTrigger: { trigger: section, start: 'top 80%' },
//       },
//     );

//     gsap.fromTo(
//       '.contact-left',
//       { opacity: 0, x: -50 },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.9,
//         ease: 'power3.out',
//         scrollTrigger: { trigger: section, start: 'top 75%' },
//       },
//     );

//     gsap.fromTo(
//       '.contact-right',
//       { opacity: 0, x: 50 },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.9,
//         ease: 'power3.out',
//         scrollTrigger: { trigger: section, start: 'top 75%' },
//       },
//     );

//     gsap.fromTo(
//       '.social-link',
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         ease: 'back.out(1.5)',
//         stagger: 0.1,
//         scrollTrigger: { trigger: '.contact-socials', start: 'top 88%' },
//       },
//     );
//   }

//   async onSubmit() {
//     if (!this.formData.name || !this.formData.email || !this.formData.message) return;

//     this.isSubmitting.set(true);
//     this.submitStatus.set('idle');

//     try {
//       const response = await fetch(`${environment.apiUrl}/contact`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(this.formData),
//       });

//       if (response.ok) {
//         this.submitStatus.set('success');
//         this.formData = { name: '', email: '', subject: '', message: '' };
//         this.animateSuccess();
//       } else {
//         this.submitStatus.set('error');
//       }
//     } catch {
//       this.submitStatus.set('error');
//     } finally {
//       this.isSubmitting.set(false);
//       setTimeout(() => this.submitStatus.set('idle'), 5000);
//     }
//   }

//   animateSuccess() {
//     gsap.fromTo(
//       '.success-msg',
//       { opacity: 0, y: -10, scale: 0.95 },
//       { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
//     );
//   }

//   onInputFocus(event: FocusEvent) {
//     const input = event.target as HTMLElement;
//     gsap.to(input, {
//       scale: 1.01,
//       duration: 0.2,
//       ease: 'power2.out',
//     });
//   }

//   onInputBlur(event: FocusEvent) {
//     const input = event.target as HTMLElement;
//     gsap.to(input, {
//       scale: 1,
//       duration: 0.2,
//       ease: 'power2.out',
//     });
//   }
// }
import { Component, AfterViewInit, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.scss',
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection') sectionRef!: ElementRef;

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  socials = [
    { label: 'GitHub', url: 'https://github.com/ibrahim', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/ibrahim', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:Dev.ibrahim0077@gmail.com', icon: 'email' },
  ];

  ngAfterViewInit() {
    setTimeout(() => this.animateSection(), 100);
  }

  animateSection() {
    if (!this.sectionRef?.nativeElement) return;
    const section = this.sectionRef.nativeElement;

    gsap.fromTo(
      '.contact-heading',
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
      '.contact-left',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      },
    );

    gsap.fromTo(
      '.contact-right',
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      },
    );

    gsap.fromTo(
      '.social-link',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.5)',
        stagger: 0.1,
        scrollTrigger: { trigger: '.contact-socials', start: 'top 88%' },
      },
    );
  }

  async onSubmit() {
    console.log('Service ID:', environment.emailjs.serviceId);
    console.log('Template ID:', environment.emailjs.templateId);
    console.log('Public Key:', environment.emailjs.publicKey);
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          subject: this.formData.subject || 'No subject',
          message: this.formData.message,
          time: new Date().toLocaleString(),
        },
        environment.emailjs.publicKey,
      );

      this.submitStatus.set('success');
      this.formData = { name: '', email: '', subject: '', message: '' };
      this.animateSuccess();
    } catch (error) {
      console.error('EmailJS error:', error);
      this.submitStatus.set('error');
    } finally {
      this.isSubmitting.set(false);
      setTimeout(() => this.submitStatus.set('idle'), 5000);
    }
  }

  animateSuccess() {
    gsap.fromTo(
      '.success-msg',
      { opacity: 0, y: -10, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
    );
  }

  onInputFocus(event: FocusEvent) {
    const input = event.target as HTMLElement;
    gsap.to(input, { scale: 1.01, duration: 0.2, ease: 'power2.out' });
  }

  onInputBlur(event: FocusEvent) {
    const input = event.target as HTMLElement;
    gsap.to(input, { scale: 1, duration: 0.2, ease: 'power2.out' });
  }
}
