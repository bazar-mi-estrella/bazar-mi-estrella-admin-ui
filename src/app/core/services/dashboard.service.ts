import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../interfaces/page.interface';
import { ProductPost } from '../interfaces/product-post.interface';
import { Order } from '../interfaces/order.interface';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    API = environment.API.concat("/order")

    public filter_offcanvas: boolean = false;


    constructor(private readonly httpClient: HttpClient) { }


    save(data: ProductPost): Observable<ProductPost> {
        return this.httpClient.post<ProductPost>(this.API, data)
    }

    public getMain(params:any): Observable<Page<Order>> {

        let httpParams = Object.entries(params)
            .filter(([_, value]) => value !== null && value !== undefined && value !== "") // Filtra los valores definidos
            .reduce((acc, [key, value]) => acc.append(key, value as string), new HttpParams()); // Crea HttpParams directamente

        return this.httpClient.get<Page<Order>>(this.API, { params: httpParams })
    }

    // Get Products By id
    public getById(id: string): Observable<Order> {
        return this.httpClient.get<Order>(this.API.concat("/").concat(id))
    }


}
