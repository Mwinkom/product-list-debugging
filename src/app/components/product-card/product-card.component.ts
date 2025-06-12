import { Component, Input } from '@angular/core';
import { Dessert } from '../../models/desserts.model';
import { CartService } from '../../services/cart.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [AddToCartComponent, CommonModule],
})
export class ProductCardComponent {
  @Input() dessert!: Dessert;

  constructor(private cartService: CartService) {}

  handleAddToCart(event: { product: Dessert; quantity: number }) {
    console.log('ProductCard received:', event);
    this.cartService.addToCart(event.product, event.quantity);
  }
}
