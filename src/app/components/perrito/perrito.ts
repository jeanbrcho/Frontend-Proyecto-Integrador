import { Component,HostListener, inject } from '@angular/core';
import { ChatStateService } from '../../service/chat-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perrito',
  imports: [CommonModule],
  templateUrl: './perrito.html',
  styleUrl: './perrito.css'
})
export class Perrito {

  chatState = inject(ChatStateService);
  isMobile = window.innerWidth <= 700;

  toggleChat() {
    this.chatState.toggle();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 700;
  }
}
