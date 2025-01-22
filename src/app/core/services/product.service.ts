import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductFilter } from '../interfaces/product-filter';
import { Product } from '../interfaces/product.interface';
import { Page } from '../interfaces/page.interface';
import { ProductPost } from '../interfaces/product-post.interface';


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

  public getAllByfilter(params: ProductFilter): Observable<Page<Product>> {


    let httpParams = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined && value !=="") // Filtra los valores definidos
      .reduce((acc, [key, value]) => acc.append(key, value as string), new HttpParams()); // Crea HttpParams directamente

    if (!params.size) httpParams = httpParams.append("size", 20)
    if (!params.page) httpParams = httpParams.append("page", 0)

    return this.httpClient.get<Page<Product>>(this.API.concat("/bandeja"), { params: httpParams })
  }

  // Get Products By id
  public getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.API.concat("/").concat(id))
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 9) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
