import { Component } from '@angular/core';
import { ClientDatas } from '../models/client-datas';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent {

  constructor(private clientService: ClientService) {}

  mostrarLiveAlert = false;
  mostrarMensagem: boolean = false;
  sucesso: boolean = false;
  mensagem: string = '';

clienteDatas: ClientDatas[] = [];
newClient: ClientDatas = {
  id: -1,
  cpf: '',
  name: '',
  email: '',
  dateOfBirth: '',
  isDeleted: false
}

formatDateForBackend(date: string): string {
  const parts = date.split('/');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return '';
}

  onSubmitPosT(): void {
    console.log("Data depois de formatar" + this.newClient.dateOfBirth)
    this.clientService?.postClient(this.newClient)
    .subscribe({
      next: (response: any) => {
        console.log('Cliente inserido com sucesso!', response);
        this.mostrarMensagem = true;
        this.sucesso = true;
        this.mensagem = 'Cliente inserido com sucesso!';
        this.newClient= {
          id: -1,
          cpf: '',
          name: '',
          email: '',
          dateOfBirth: '',
          isDeleted: false
        };
        setTimeout(() => {
          this.mostrarMensagem = false;
        }, 5000);
      },

      error: (error: any) => {
        this.mostrarMensagem = true;
        this.sucesso = false;
        this.mensagem = 'Erro ao inserir Cliente, tente novamente!';
        setTimeout(() => {
          this.mostrarMensagem = false;
        }, 5000);
      }
    })
  }


  formatDate(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    // Formata para dd/mm/yyyy
    if (input.length > 4) {
        input = input.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    } else if (input.length > 2) {
        input = input.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }
    event.target.value = input;
  }


  validateDate(event: any) {
    let input = event.target.value;
    if (input.length !== 10) {
        alert('Data de aniversário inválida. Por favor, insira no formato dd/mm/yyyy.');
        event.target.value = '';
    }
  }

}
