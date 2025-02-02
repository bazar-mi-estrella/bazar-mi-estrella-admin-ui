import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Page } from '../interfaces/page.interface';
import { WorkerTray } from '../interfaces/worker-tray.interface';
import { Observable } from 'rxjs';
import { WorkerFilter } from '../interfaces/worker-filter.interface';
import { WorkerPost } from '../interfaces/worker-post.interface';
import { Response } from '../interfaces/response.interface';
import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential
} from '@angular/fire/auth';
import { WorkerGet } from '../interfaces/worker-get.interface';

@Injectable({ providedIn: 'root' })
export class WorkerService {

  API = environment.API.concat("/worker")
  constructor(
    private readonly http: HttpClient,
    public auth: Auth
  ) { }

  getAll(values: WorkerFilter): Observable<Page<WorkerTray>> {
    let httparams = new HttpParams()
    httparams = httparams.append('page', 0)
    httparams = httparams.append('size', 20)
    if (values.name) httparams = httparams.append('name', values.name)
    if (values.stateId) httparams = httparams.append('stateId', values.stateId)
    if (values.email) httparams = httparams.append('email', values.email)


    return this.http.get<Page<WorkerTray>>(this.API + `/bandeja`, { params: httparams });
  }

  save(worker: WorkerPost): Observable<Response<WorkerPost>> {
    return this.http.post<Response<WorkerPost>>(this.API, worker);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    sessionStorage.clear()
    return signOut(this.auth);
  }

  findByEmail(email: string): Observable<WorkerGet> {
    return this.http.get<WorkerGet>(this.API.concat("/findemail/").concat(email))
  }
}
