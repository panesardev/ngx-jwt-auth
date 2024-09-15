import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {
  private auth = inject(AuthService);

  state = this.auth.state;
}
