import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientService } from '../services/client.service';
import { ClientDatas } from '../models/client-datas';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';

@Component({
  selector: 'app-client-alter',
  templateUrl: './client-alter.component.html',
  styleUrls: ['./client-alter.component.scss']
})

export class ClientAlterComponent implements OnInit {

 constructor(private clientService: ClientService) {}

  private readonly destroy$: Subject<void> = new Subject();

  clientDatas: ClientDatas[] = [];
  selectedClient?: ClientDatas; // Permitir valores undefined
  mostrarCamposInput: boolean = false;
  mostrarMensagem: boolean = false;
  sucesso: boolean = false;
  mensagem: string = '';
  searchKeyword: string = '';

  ngOnInit(): void {
    this.clientService.getClientDatas().subscribe(client => {
      this.clientDatas = client;
    });
  }

  getClientDatas(): void {
    this.clientService.getClientDatas().subscribe(
      (data: ClientDatas[]) => {
        this.clientDatas = data;
      },
    );
  }

  atualizarClient(): void {
    if (this.selectedClient) {
      this.clientService.putClient(this.selectedClient)
      .subscribe(
        () => {
          console.log('Cliente atualizado com sucesso!');
          this.mostrarMensagem = true;
          this.sucesso = true;
          this.mensagem = 'Cliente alterado com sucesso!';
          setTimeout(() => {
            this.mostrarMensagem = false;
            // this.reloadPage();
          }, 5000);
          this.mostrarCamposInput = false;
        },
        (error: any) => {
          this.mostrarMensagem = true;
          this.sucesso = false;
          this.mensagem = 'Erro ao alterar Cliente, tente novamente!';
          setTimeout(() => {
            this.mostrarMensagem = false;
          }, 5000);
          this.mostrarCamposInput = true;
         }
      );
    }
  }

  onSearch(): void {
    if (this.searchKeyword.trim() === '') {
      this.selectedClient = undefined;
      this.mostrarCamposInput = false;
    } else {
      this.clientService.getClientDatas().subscribe({
        next: (response) => {
          const foundClient = response.find(client =>
            client.cpf.toLowerCase().includes(this.searchKeyword.toLowerCase())
          );
          if (foundClient) {
            this.selectedClient = foundClient;
            this.mostrarCamposInput = true;
          } else {
            this.selectedClient = undefined;
            this.mostrarMensagem = true;
            this.sucesso = false;
            this.mensagem = 'Cliente não encontrado!';
            setTimeout(() => {
              this.mostrarMensagem = false;
            }, 5000);
            this.mostrarCamposInput = false;
          }
        },
        error: (error: any) => console.log(error),
      });
    }
  }

  onClear(): void {
    this.searchKeyword = '';
    this.selectedClient = undefined;
    this.mostrarCamposInput = false;
  }

  reloadPage() {
    window.location.reload();
  }
}


