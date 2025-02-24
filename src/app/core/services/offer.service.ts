import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductFilter } from '../interfaces/product-filter';
import { Page } from '../interfaces/page.interface';
import { Paginator } from '../interfaces/paginator.interface';
import { Offer } from '../interfaces/offer.interface';
import { OfferPost } from '../interfaces/offer-post.interface';
import { Response } from '../interfaces/response.interface';


@Injectable({
    providedIn: 'root'
})
export class OfferService {

    API = environment.API.concat("/offers")


    constructor(private readonly httpClient: HttpClient) { }


    save(data: OfferPost): Observable<Response<OfferPost>> {
        return this.httpClient.post<Response<OfferPost>>(this.API, data)
    }

    public getAllByfilter(params: ProductFilter, paginator: Paginator): Observable<Page<Offer>> {

        let httpParams = Object.entries(params)
            .filter(([_, value]) => value !== null && value !== undefined && value !== "") // Filtra los valores definidos
            .reduce((acc, [key, value]) => acc.append(key, value as string), new HttpParams()); // Crea HttpParams directamente

        if (!params.size) httpParams = httpParams.append("size", paginator.size)
        if (!params.page) httpParams = httpParams.append("page", paginator.number)

        return this.httpClient.get<Page<Offer>>(this.API.concat("/bandeja"), { params: httpParams })
    }

}
