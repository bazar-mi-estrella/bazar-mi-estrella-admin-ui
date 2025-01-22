import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { Page } from '../interfaces/page.interface';
import { Client } from '../interfaces/client.interface';
import { ClientFilter } from '../interfaces/client-filter.interface';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  API = environment.API.concat("/client")


  constructor(private readonly httpClient: HttpClient) { }

 
  public getAllByfilter(params: ClientFilter): Observable<Page<Client>> {


    let httpParams = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined && value !== "") // Filtra los valores definidos
      .reduce((acc, [key, value]) => acc.append(key, value as string), new HttpParams()); // Crea HttpParams directamente

    if (!params.size) httpParams = httpParams.append("size", 20)
    if (!params.page) httpParams = httpParams.append("page", 0)

    return this.httpClient.get<Page<Client>>(this.API.concat("/bandeja"), { params: httpParams })
  }

  public getClientById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.API.concat("/").concat(id))
  }


}
