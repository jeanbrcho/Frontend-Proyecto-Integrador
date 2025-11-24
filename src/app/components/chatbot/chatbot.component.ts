import { Component, signal, effect, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../service/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = signal(false);
  messages = signal<ChatMessage[]>([]);
  newMessage = signal('');
  isLoading = signal(false);

  private chatbotService = inject(ChatbotService);

  constructor() {
    // Mensaje de bienvenida
    this.messages.set([{
      text: '¡Hola! Soy el asistente virtual de Guau que corte 🐾. ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date()
    }]);

    // Auto-scroll cuando se agregan mensajes
    effect(() => {
      this.messages();
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  toggleChat() {
    this.isOpen.update(value => !value);
  }

  sendMessage() {
    const message = this.newMessage().trim();
    if (!message || this.isLoading()) return;

    // Agregar mensaje del usuario
    this.messages.update(msgs => [...msgs, {
      text: message,
      isUser: true,
      timestamp: new Date()
    }]);

    this.newMessage.set('');
    this.isLoading.set(true);

    // Obtener token del localStorage si existe
    const token = localStorage.getItem('token') || undefined;

    // Enviar al backend
    this.chatbotService.sendMessage(message, token).subscribe({
      next: (response) => {
        this.messages.update(msgs => [...msgs, {
          text: response.answer,
          isUser: false,
          timestamp: new Date()
        }]);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al enviar mensaje:', error);
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

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}