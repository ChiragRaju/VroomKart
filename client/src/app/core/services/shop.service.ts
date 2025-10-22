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

  //   | Step | Action                      | Example                                |
  // | ---- | --------------------------- | -------------------------------------- |
  // | 1    | User clicks `/products/3`   | Router loads ProductDetailComponent    |
  // | 2    | Component reads route param | `id = 3`                               |
  // | 3    | Component calls service     | `getProductById(3)`                    |
  // | 4    | Service calls API           | `GET /api/products/3`                  |
  // | 5    | Backend returns product     | `{ id: 3, name: 'Bike', price: 1200 }` |
  // | 6    | Component stores data       | `this.product = response`              |
  // | 7    | Template displays product   | UI updates automatically               |

  getProductById(id: number) {
    return this.http.get<Products>(this.baseUrl + 'products/' + id);
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
