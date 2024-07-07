import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAppDateFormat]'
})
export class AppDateFormatDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let input = this.el.nativeElement.value;
    input = input.replace(/\D/g, ''); // Remove tudo que não é dígito

    if (input.length > 4) {
      input = input.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    } else if (input.length > 2) {
      input = input.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }

    this.control.control?.setValue(input, { emitEvent: false });
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const input = this.el.nativeElement.value;
    if (input.length !== 10) {
      alert('Data de aniversário inválida. Por favor, insira no formato dd/mm/yyyy.');
      this.control.control?.setValue('');
    }
  }
}
