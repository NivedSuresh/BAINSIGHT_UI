import {Directive, ElementRef, Renderer2, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[zoomInOut]',
  standalone: true
})
export class ZoomInOutDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostBinding('style.backgroundColor') background!: string;

  @HostListener("mouseenter") zoomIn() {
    this.renderer.addClass(this.element.nativeElement, 'zoom-in');
  }

  @HostListener("mouseout") zoomOut() {
    this.renderer.removeClass(this.element.nativeElement, 'zoom-in');
  }

}
