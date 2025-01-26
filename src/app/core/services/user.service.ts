import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Page } from '../interfaces/page.interface';
import { WorkerTray } from '../interfaces/worker-tray.interface';
import { Observable } from 'rxjs';
import { WorkerFilter } from '../interfaces/worker-filter.interface';

@Injectable({ providedIn: 'root' })
export class WorkerService {

    API = environment.API.concat("/worker")
    constructor(private readonly http: HttpClient) { }

    getAll(values: WorkerFilter): Observable<Page<WorkerTray>> {
        let httparams = new HttpParams()
        httparams = httparams.append('page', 0)
        httparams = httparams.append('size', 20)
        if (values.name) httparams = httparams.append('name', values.name)
        if (values.stateId) httparams = httparams.append('stateId', values.stateId)
        if (values.email) httparams = httparams.append('email', values.email)


        return this.http.get<Page<WorkerTray>>(this.API + `/bandeja`, { params: httparams });
    }

    /***
     * Facked User Register
     */
    register(user: WorkerTray) {
        return this.http.post(`/users/register`, user);
    }
}
