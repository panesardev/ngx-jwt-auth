import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NotFoundComponent {

}
