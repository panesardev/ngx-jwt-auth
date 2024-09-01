import { ChangeDetectionStrategy, Component, inject, ViewContainerRef } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-render-modal',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderModalComponent {
  private modal = inject(ModalService);
  private container = inject(ViewContainerRef);

  constructor() {
    this.modal.setContainer(this.container);
  }
}
