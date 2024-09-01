import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {
  
}
