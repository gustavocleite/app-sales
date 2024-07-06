import { Injectable } from '@angular/core';
import { ClientDatas } from '../models/client-datas';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost:8080/api/v1/client';

  constructor(private http: HttpClient) { }

  getClientDatas(): Observable<ClientDatas[]> {
    return this.http.get<ClientDatas[]> (
      this.apiUrl
      )
    };

  postClient(clientDatas: ClientDatas ): Observable<any>{
    return this.http.post<ClientDatas>(
      this.apiUrl, clientDatas)
  }

  putClient(clientDatas: ClientDatas): Observable<ClientDatas> {
    return this.http.put<ClientDatas>(`{$this.apiUrl}/$clientDatas.id}`, clientDatas);
  }

  deletClient(id: number) : Observable<any> {
    return this.http.delete<ClientDatas>(`${this.apiUrl}/${id}`);
  }
}
