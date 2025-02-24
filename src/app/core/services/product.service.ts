import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductFilter } from '../interfaces/product-filter';
import { Product } from '../interfaces/product.interface';
import { Page } from '../interfaces/page.interface';
import { ProductPost } from '../interfaces/product-post.interface';
import { Paginator } from '../interfaces/paginator.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API = environment.API.concat("/product")

  public filter_offcanvas: boolean = false;


  constructor(private readonly httpClient: HttpClient) { }

  activeImg: string | undefined;

  handleImageActive(img: string) {
    this.activeImg = img;
  }
  save(data: ProductPost): Observable<ProductPost> {
    return this.httpClient.post<ProductPost>(this.API, data)
  }

  public getAllByfilter(params: ProductFilter, paginator: Paginator): Observable<Page<Product>> {

    let httpParams = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined && value !== "") // Filtra los valores definidos
      .reduce((acc, [key, value]) => acc.append(key, value as string), new HttpParams()); // Crea HttpParams directamente

    if (!params.size) httpParams = httpParams.append("size", paginator.size)
    if (!params.page) httpParams = httpParams.append("page", paginator.number)

    return this.httpClient.get<Page<Product>>(this.API.concat("/bandeja"), { params: httpParams })
  }

  // Get Products By id
  public getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.API.concat("/").concat(id))
  }

  public localProducts: Product[] = [];

  autocomplete(name: string): Observable<Product[]> {

    // Buscar en la lista local
    const filteredLocal = this.localProducts.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );

    if (filteredLocal.length > 0) {
      return of(filteredLocal);
    }

    // Si no hay coincidencias en la lista local, hacer la petición HTTP
    let httpParams = new HttpParams()
      .set('size', '10')
      .set('page', '0')
      .set('name', name);

    return this.httpClient
      .get<Page<Product>>(`${this.API}/bandeja`, { params: httpParams })
      .pipe(
        map((page: Page<Product>) => page.content));
  }


}
