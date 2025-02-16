import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../interfaces/page.interface';
import { ProductPost } from '../interfaces/product-post.interface';
import { OrderRefund } from '../interfaces/order-refund.interface';


@Injectable({
    providedIn: 'root'
})
export class RefundService {

    API = environment.API.concat("/refund")

    public filter_offcanvas: boolean = false;


    constructor(private readonly httpClient: HttpClient) { }


    save(data: ProductPost): Observable<ProductPost> {
        return this.httpClient.post<ProductPost>(this.API, data)
    }


    private buildParams(params: any): HttpParams {
        let httpParams = Object.entries(params)
            .filter(([_, value]) => value !== null && value !== undefined && value !== "") // Filtra los valores definidos
            .reduce((acc, [key, value]) => acc.append(key, value as string), new HttpParams()); // Crea HttpParams directamente
        return httpParams
    }

    public getRefunds(params: any): Observable<Page<OrderRefund>> {

        let httpParams = this.buildParams(params)

        if (!params.size) httpParams = httpParams.append("size", 20)
        if (!params.page) httpParams = httpParams.append("page", 0)

        return this.httpClient.get<Page<OrderRefund>>(this.API.concat("/bandeja"), { params: httpParams })
    }



}
