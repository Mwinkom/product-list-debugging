import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private confirmedOrderItems$ = new BehaviorSubject<CartItem[]>([]);
  private orderTotal$ = new BehaviorSubject<number>(0);
  private showOrderConfirmed$ = new BehaviorSubject<boolean>(false);

  constructor(private cartService: CartService) {}

  getConfirmedOrderItems() {
    return this.confirmedOrderItems$.asObservable();
  }

  getOrderTotal() {
    return this.orderTotal$.asObservable();
  }

  getShowOrderConfirmed() {
    return this.showOrderConfirmed$.asObservable(); // Observable to track order confirmation state
  }

  confirmOrder() {
    // Get current cart items
    const currentItems = [...this.cartService.getCurrentCartItems()];
    const total = this.calculateOrderTotal(currentItems);
    
    // Store order details
    this.confirmedOrderItems$.next(currentItems);
    this.orderTotal$.next(total);
    this.showOrderConfirmed$.next(true);
    
    // Clear the cart
    this.cartService.clearCart();
  }

  startNewOrder() {
    this.showOrderConfirmed$.next(false);
  }

  calculateItemTotal(item: CartItem): number {
    return item.quantity * item.product.price;
  }

  calculateOrderTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + this.calculateItemTotal(item), 0);
  }
}