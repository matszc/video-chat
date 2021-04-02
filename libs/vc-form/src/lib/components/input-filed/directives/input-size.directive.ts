import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { InputSizeEnum } from '../../../fields-models/input-field.model';

@Directive({
  selector: '[vcInputSize]'
})
export class InputSizeDirective implements OnChanges {

  @Input()
  size: InputSizeEnum;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.size.currentValue === InputSizeEnum.Medium) {
      this.renderer.removeClass(this.el.nativeElement, 'p-inputtext-lg');
      this.renderer.removeClass(this.el.nativeElement, 'p-inputtext-sm');
    }

    if (changes.size.currentValue === InputSizeEnum.Small) {
      this.renderer.removeClass(this.el.nativeElement, 'p-inputtext-lg');
      this.renderer.addClass(this.el.nativeElement, 'p-inputtext-sm');
    }

    if (changes.size.currentValue === InputSizeEnum.Large) {
      this.renderer.addClass(this.el.nativeElement, 'p-inputtext-lg');
      this.renderer.removeClass(this.el.nativeElement, 'p-inputtext-sm');
    }
  }

}
