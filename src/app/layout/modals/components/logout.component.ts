import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { Modal, ModalComponent } from '../modal.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    AsyncPipe,
    ModalComponent,
  ],
  providers: [AuthService],
  template: `
    <app-modal heading="Are you sure?">
      @if (user$ | async; as user) {
        <div class="bg-secondary text-primary flex items-center rounded-md gap-3 mb-4 px-4 py-3 cursor-pointer" routerLink="/dashboard" (click)="modal.close()">
          <img [src]="user.photoURL" alt="user" class="rounded-full w-8 h-8" fallbackImage="/assets/img/user.png">
          <span>Logged in as {{ user.displayName }}</span>
        </div>
      }

      <p class="mb-6">You will be logged out!</p>

      <div class="grid grid-cols-2 gap-6">
        <button class="bg-secondary text-primary" (click)="modal.close()">Back</button>
        <button (click)="logout()">Logout</button>
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent extends Modal {
  private auth = inject(AuthService);

  user$ = this.auth.user$;

  async logout() {
    await this.auth.logout();
    this.modal.close();
  }
}
