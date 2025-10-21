import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Products } from '../../shared/models/Product';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/ShopParams';
import { MatPaginator } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/Pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatListOption,
    MatSelectionList,
    MatMenuTrigger,
    MatPaginator,
    FormsModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  protected title = 'Automobile';
  shopParams: ShopParams = new ShopParams();
  pageSizeOptions = [5, 10, 15, 20];

  // products: Products[] = [];
  products?: Pagination<Products>;
  selectedTypes: string[] = [];
  selectedBrands: string[] = [];
  selectedSort: string = 'name';
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ];

  ngOnInit(): void {
    this.initializeShops();
  }

  initializeShops() {
    this.shopService.getTypes();
    this.shopService.getBrands();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => (this.products = response),
      error: (error) => console.log(error),
      complete: () => console.log('Request completed'),
    });
  }

  onSearchChange() {
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  handlePageEvent(event: any) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  onSortChange(event: MatSelectionListChange) {
    const seletedOption = event.options[0];
    if (seletedOption) {
      this.shopParams.sort = seletedOption.value;
      this.shopParams.pageNumber = 1;
      //implement sorting logic here based on selectedSort value
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedTypes: this.shopParams.brands,
        selectedBrands: this.shopParams.types,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.shopParams.types = result.selectedTypes;
        this.shopParams.brands = result.selectedBrands;
        this.shopParams.pageNumber = 1;
        this.getProducts();
      }
    });
  }
}
