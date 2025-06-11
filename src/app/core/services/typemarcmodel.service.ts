import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeMarcModel } from '../interfaces/typemarcmodel.interface';
import { Response } from '../interfaces/response.interface';


@Injectable({
    providedIn: 'root'
})
export class TypeMarcaModelService {

    private dataSubject = new BehaviorSubject<TypeMarcModel[]>([]); // BehaviorSubject para almacenar los datos
    private dataLoaded = false; // Bandera para evitar solicitudes duplicadas

    API = environment.API.concat("/typemarcmodel")
    constructor(private readonly httpClient: HttpClient) { }

    public getAll(): Observable<TypeMarcModel[]> {

        if (this.dataLoaded) return this.dataSubject.asObservable(); // Devuelve el Observable con los datos

        return this.httpClient
            .get<TypeMarcModel[]>(this.API.concat("/types"))
            .pipe(
                tap(data => {
                    this.dataSubject.next(data); // Actualiza el BehaviorSubject con los datos cargados
                    this.dataLoaded = true; // Marca como cargado
                })
            )
    }



    public types(): Observable<TypeMarcModel[]> {
        return this.httpClient
            .get<TypeMarcModel[]>(this.API.concat("/types"))
    }

    public saveType(type: TypeMarcModel): Observable<Response<TypeMarcModel>> {
        return this.httpClient.post<Response<TypeMarcModel>>(this.API.concat("/types"), type)
    }

    public saveMake(make: TypeMarcModel): Observable<Response<TypeMarcModel>> {
        return this.httpClient.post<Response<TypeMarcModel>>(this.API.concat("/makes"), make)
    }

    public deleteType(id:string): Observable<Response<void>> {
        return this.httpClient.delete<Response<void>>(this.API.concat("/types/").concat(id))
    }

    public makes(): Observable<TypeMarcModel[]> {
        return this.httpClient
            .get<TypeMarcModel[]>(this.API.concat("/makes"))
    }

    public marcas(typeId: string): Observable<TypeMarcModel[]> {
        return this.httpClient
            .get<TypeMarcModel[]>(this.API.concat("/marcas/").concat(typeId))
    }

    public models(marcaId: string): Observable<TypeMarcModel[]> {
        return this.httpClient
            .get<TypeMarcModel[]>(this.API.concat("/models/").concat(marcaId))
    }
}