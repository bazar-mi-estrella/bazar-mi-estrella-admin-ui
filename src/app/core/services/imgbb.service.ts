import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../interfaces/page.interface';
import { Master } from '../interfaces/master.interface';
import { Imgbb } from '../interfaces/imgbb.interface';


@Injectable({
    providedIn: 'root'
})
export class ImgbbService {

    API = environment.API_IMGBB

    public filter_offcanvas: boolean = false;


    constructor(private readonly httpClient: HttpClient) { }

    save(base_img: string): Observable<Imgbb> {

        const formData = new FormData()
        formData.append('image', base_img)

        return this.httpClient.post<Imgbb>(this.API.concat("/upload?key=").concat(environment.API_KEY_IMGBB), formData)

    }

    public findByPrefixAndCorrelatives(prefix: number, correlatives: number[] = []): Observable<Master[]> {

        const httpParams = new HttpParams()
            .set("prefix", prefix)
            .set("correlatives", correlatives.toString())

        return this.httpClient.get<Master[]>(this.API.concat("/find_by_prefix"), { params: httpParams })
    }


}
