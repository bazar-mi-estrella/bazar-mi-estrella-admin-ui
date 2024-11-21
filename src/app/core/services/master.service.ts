import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../interfaces/page.interface';
import { Master } from '../interfaces/master.interface';


@Injectable({
    providedIn: 'root'
})
export class MasterService {

    API = environment.API.concat("/master")

    public filter_offcanvas: boolean = false;


    constructor(private readonly httpClient: HttpClient) { }

    activeImg: string | undefined;

    handleImageActive(img: string) {
        this.activeImg = img;
    }

    public findByPrefixAndCorrelatives(prefix: number, correlatives: number[] = []): Observable<Master[]> {

        const httpParams = new HttpParams()
            .set("prefix", prefix)
            .set("correlatives", correlatives.toString())

        return this.httpClient.get<Master[]>(this.API.concat("/find_by_prefix"), { params: httpParams })
    }

   
}
