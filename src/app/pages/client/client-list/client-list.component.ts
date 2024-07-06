import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientDatas } from '../models/client-datas';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {

  private readonly destroy$: Subject<void> = new Subject();
  clientDatas: ClientDatas[] = [];
  searchKeyword: string = '';

  constructor(private ClientService: ClientService) {}

  ngOnInit(): void {
    this.getClientDatasService();
  }

  getClientDatasService(): void {
    this.ClientService.getClientDatas().subscribe(
      (data: ClientDatas[]) => {
        this.clientDatas = data;
      },
    );
  }


  onSubmit(): void {
    this.getClientDatasService();
  }

  onSearch(): void {
    if (this.searchKeyword.trim() === '') {
      this.clientDatas = [...this.clientDatas];
    } else {
      console.log(this.searchKeyword)
      this.ClientService.getClientDatas().subscribe({
        next: (response) => {
          this.clientDatas = response.filter((todo) =>
            todo.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
          );
        },
        error: (error: any) => console.log(error),
      });
    }
  }

  clearResults(): void {
    this.clientDatas = [];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
