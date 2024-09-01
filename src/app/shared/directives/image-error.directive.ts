import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";

@Directive({
  selector: 'img[onError]',
  standalone: true,
})
export class ImageErrorDirective {
  private hostRef = inject(ElementRef);

  onError = input.required<string>();

  @HostListener('error')
  errored() {
    this.hostRef.nativeElement.src = this.onError();
  }
}
