import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Products } from './shared/models/Product';
import { Pagination } from './shared/models/Pagination';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: '../tailwind.css',
})
export class AppComponent implements OnInit, OnDestroy {
  baseUrl = 'http://localhost:5089/api/';
  private http = inject(HttpClient);
  protected title = 'Automobile';

  products: Products[] = [];

  ngOnInit(): void {
    this.http.get<Pagination<Products>>(this.baseUrl + 'products').subscribe({
      next: (products) => (this.products = products.data),
      error: (error) => console.log(error),
      complete: () => console.log('Request completed'),
    });
  }

  ngOnDestroy(): void {}
}
