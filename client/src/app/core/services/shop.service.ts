import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/Pagination';
import { Products } from '../../shared/models/Product';
import { ShopParams } from '../../shared/models/ShopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:7077/api/';
  private http = inject(HttpClient);
  products: Products[] = [];
  types: string[] = [];
  brands: string[] = [];

  // getProducts(brands?: string[], types?: string[],sort?:string) {
  //   let params = new HttpParams();
  //   {
  //     if (brands && brands.length > 0) {
  //       params = params.append('brands', brands.join(','));
  //     }
  //     if (types && types.length > 0) {
  //       params = params.append('types', types.join(','));
  //     }

  //     if(sort)
  //       {
  //         params=params.append('sort',sort);

  //       }

  //     params = params.append('pageSize', 20);
  //     return this.http.get<Pagination<Products>>(this.baseUrl + 'products', { params });
  //   }
  // }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    {
      if (shopParams.brands.length > 0) {
        params = params.append('brands', shopParams.brands.join(','));
      }
      if (shopParams.types.length > 0) {
        params = params.append('types', shopParams.types.join(','));
      }

      if (shopParams.sort) {
        params = params.append('sort', shopParams.sort);
      }

      // ✅ How It Works Altogether

      // You type in the search box → updates shopParams.search.

      // You press Enter → triggers onSearchChange().

      // That calls getProducts() → makes an API request with the query param ?searchTerm=<yourText>.

      // Backend filters products by name or description.

      // Filtered list comes back → displayed in your *ngFor.
      if (shopParams.search) {
        params = params.append('search', shopParams.search);
      }

      params = params.append('pageSize', shopParams.pageSize);
      params = params.append('pageIndex', shopParams.pageNumber);
      return this.http.get<Pagination<Products>>(this.baseUrl + 'products', { params });
    }
  }

  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
      next: (types) => (this.types = types),
      error: (error) => console.log(error),
      complete: () => console.log('Request completed'),
    });
  }
  getBrands() {
    if (this.brands.length > 0) return;

    return this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
      next: (brands) => (this.brands = brands),
      error: (error) => console.log(error),
      complete: () => console.log('Request completed'),
    });
  }
}
