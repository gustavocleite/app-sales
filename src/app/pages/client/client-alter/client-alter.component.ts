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
  selectedClient!: ClientDatas;
  mostrarCamposInput: boolean = true;
  mostrarMensagem: boolean = false;
  sucesso: boolean = false;
  mensagem: string = '';

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

  onClientSelectionChange() {
    this.selectedClient
  }

   atualizarClient(): void {
    // Chama o método putLoja do serviço, passando a loja selecionada
    this.clientService.putClient(this.selectedClient)
    .subscribe(
      () => {
        console.log('Cliente atualizado com sucesso!');
        this.mostrarMensagem = true;
        this.sucesso = true;
        this.mensagem = 'Cliente alterado com sucesso!';
        setTimeout(() => {
          this.mostrarMensagem = false;
          this.reloadPage();
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
       }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
function takeUntil(destroy$: Subject<void>): import("rxjs").OperatorFunction<ClientDatas[], unknown> {
  throw new Error('Function not implemented.');
}

