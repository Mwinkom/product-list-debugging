import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dessert } from '../../models/desserts.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input() desserts: Dessert[] = [];  
}
