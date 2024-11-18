import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Page } from '../interfaces/page.interface';
import { User } from '../interfaces/users.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    private API = environment.API
    constructor(private http: HttpClient) { }
    /***
     * Get All User
     */
    getAll(values: User): Observable<Page<User>> {
        let httparams = new HttpParams()
        httparams = httparams.append('page', 0)
        httparams = httparams.append('size', 20)
        if (values.name) httparams = httparams.append('name', values.name)
        if (values.stateId) httparams = httparams.append('stateId', values.stateId)
        if (values.email) httparams = httparams.append('email', values.email)


        return this.http.get<Page<User>>(this.API + `/user/bandeja`, { params: httparams });
    }

    /***
     * Facked User Register
     */
    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
}
