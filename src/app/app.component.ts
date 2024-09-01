import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { RenderModalComponent } from './layout/modals/render-modal.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RenderModalComponent,
  ],
  template: `
    <app-navbar class="select-none"/>
    
    <main>
      <router-outlet/>
    </main>
    
    <app-footer class="select-none"/>

    @defer {
      <app-render-modal/>
    }
  `,
})
export class AppComponent {

}
