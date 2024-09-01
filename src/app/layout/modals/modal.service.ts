import { Injectable, ViewContainerRef, signal } from '@angular/core';
import { Modal } from './modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private container: ViewContainerRef;
  
  isOpen = signal(false);

  setContainer(container: ViewContainerRef): void {
    this.container = container;
  }

  open(modal: typeof Modal) {
    this.container.clear();
    this.container.createComponent(modal);
    this.isOpen.set(true);
  }

  async openLazy(modal: () => Promise<typeof Modal>) {
    this.container.clear();
    this.container.createComponent(await modal());
    this.isOpen.set(true);
  }

  close(): void {
    setTimeout(() => this.container.clear(), 300);
    this.isOpen.set(false);
  }
}


