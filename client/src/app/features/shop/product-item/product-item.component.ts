import { Component, Input } from '@angular/core';
import { Products } from '../../../shared/models/Product';
import { MatCard, MatCardActions } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-product-item',
  imports: [MatCard, MatCardContent, CurrencyPipe, MatCardActions, MatIcon, MatButton],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Products;
}
