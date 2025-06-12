import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Dessert } from '../../models/desserts.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalQuantity = this.cartService.getTotalQuantity();
    });
  }

  removeItem(productName: string): void {
    // Find the corresponding add-to-cart component and reset it
    this.cartService.removeFromCart(productName);
  }

  getItemTotal(item: CartItem): number {
    return item.quantity * item.product.price;
  }

  getOrderTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }
}
