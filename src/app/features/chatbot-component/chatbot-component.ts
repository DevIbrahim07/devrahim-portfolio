import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { environment } from '../../../environments/environment';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

@Component({
  selector: 'app-chatbot-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-component.html',
  styleUrl: './chatbot-component.scss',
})
export class ChatbotComponent {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('inputField') inputField!: ElementRef;

  isOpen = signal(false);
  isTyping = signal(false);
  userInput = '';
  messageIdCounter = 0;
  private shouldScrollToBottom = false;

  messages = signal<Message[]>([]);

  suggestedQuestions = [
    'What projects has Ibrahim built?',
    "What is Ibrahim's tech stack?",
    'Is Ibrahim available for hire?',
    // // 'Tell me about Talkora project',
    // "What is Ibrahim's experience?",
  ];

  showSuggestions = signal(true);

  ngOnInit() {
    // Welcome message
    this.addMessage(
      'assistant',
      "Hi! 👋 I'm Ibrahim's AI assistant. I can answer questions about his skills, projects, and experience. How can I help you?",
    );
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  toggleChat() {
    const newState = !this.isOpen();
    this.isOpen.set(newState);

    if (newState) {
      setTimeout(() => {
        this.animateOpen();
        this.inputField?.nativeElement?.focus();
      }, 50);
    } else {
      this.animateClose();
    }
  }

  animateOpen() {
    gsap.fromTo(
      '.chat-window',
      { opacity: 0, scale: 0.85, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.5)' },
    );

    gsap.fromTo(
      '.chat-message',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.2 },
    );
  }

  animateClose() {
    gsap.to('.chat-window', {
      opacity: 0,
      scale: 0.85,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
    });
  }

  async sendMessage(text?: string) {
    const message = text || this.userInput.trim();
    if (!message || this.isTyping()) return;

    this.userInput = '';
    this.showSuggestions.set(false);
    this.addMessage('user', message);
    this.isTyping.set(true);
    this.shouldScrollToBottom = true;

    try {
      const history = this.messages()
        .filter((m) => !m.isTyping)
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch(`${environment.apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });

      const data = await response.json();

      if (data.success) {
        this.addMessage('assistant', data.message);
      } else {
        this.addMessage(
          'assistant',
          'AI service is temporarily unavailable. Please try again in a moment!',
        );
      }
    } catch {
      this.addMessage('assistant', 'Connection error. Please check your internet and try again.');
    } finally {
      this.isTyping.set(false);
      this.shouldScrollToBottom = true;
    }
  }

  addMessage(role: 'user' | 'assistant', content: string) {
    const newMessage: Message = {
      id: ++this.messageIdCounter,
      role,
      content,
      timestamp: new Date(),
    };

    this.messages.update((msgs) => [...msgs, newMessage]);
    this.shouldScrollToBottom = true;

    setTimeout(() => {
      const msgEls = document.querySelectorAll('.chat-message');
      const lastMsg = msgEls[msgEls.length - 1] as HTMLElement;
      if (lastMsg) {
        gsap.fromTo(
          lastMsg,
          { opacity: 0, y: 15, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
        );
      }
    }, 20);
  }

  scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat() {
    this.messages.set([]);
    this.messageIdCounter = 0;
    this.showSuggestions.set(true);
    this.ngOnInit();
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
