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

  clientDatas: ClientDatas[] = [];
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
    this.clientService.postClient(this.newClient)
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

}
