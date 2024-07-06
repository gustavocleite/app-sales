import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfFormat]'
})
export class CpfFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let input = this.el.nativeElement.value;
    input = input.replace(/\D/g, ''); // Remove tudo que não é dígito
    input = input.substring(0, 11); // Limita ao tamanho máximo do CPF (11 dígitos)

    if (input.length > 3) {
      input = input.replace(/^(\d{3})(\d)/, '$1.$2');
    }
    if (input.length > 6) {
      input = input.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (input.length > 9) {
      input = input.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    this.el.nativeElement.value = input;
  }
}
