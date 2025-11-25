import { Component, signal, effect, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../service/chatbot.service';
import { ChatStateService } from '../../service/chat-state.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  private chatbotService = inject(ChatbotService);
  
  // Primero declaramos chatState
  public chatState = inject(ChatStateService);

  // Ahora ya podemos usarlo
  isOpen = this.chatState.isOpen;

  messages = signal<ChatMessage[]>([]);
  newMessage = signal('');
  isLoading = signal(false);

  constructor() {

    // Mensaje de bienvenida
    this.messages.set([{
      text: '¡Hola! Soy el asistente virtual de Guau que corte 🐾. ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date()
    }]);

    effect(() => {
      this.messages();
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  toggleChat() {
    this.chatState.toggle();
  }

  sendMessage() {
    const message = this.newMessage().trim();
    if (!message || this.isLoading()) return;

    this.messages.update(msgs => [...msgs, {
      text: message,
      isUser: true,
      timestamp: new Date()
    }]);

    this.newMessage.set('');
    this.isLoading.set(true);

    const token = localStorage.getItem('token') || undefined;

    this.chatbotService.sendMessage(message, token).subscribe({
      next: (response) => {
        this.messages.update(msgs => [...msgs, {
          text: response.answer,
          isUser: false,
          timestamp: new Date()
        }]);
        this.isLoading.set(false);
      },
      error: () => {
        this.messages.update(msgs => [...msgs, {
          text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta nuevamente.',
          isUser: false,
          timestamp: new Date()
        }]);
        this.isLoading.set(false);
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom() {
    if (this.messagesContainer) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
