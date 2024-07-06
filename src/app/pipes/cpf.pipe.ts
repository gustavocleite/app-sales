import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const cpfDigitsOnly = value.replace(/\D/g, '');

    if (cpfDigitsOnly.length !== 11) return value;

    return cpfDigitsOnly.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
