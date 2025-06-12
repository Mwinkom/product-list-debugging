import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { Dessert } from '../models/desserts.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    const stored = localStorage.getItem('cart');
    this.cartItems = stored ? JSON.parse(stored) : [];
    this.cartItems$.next(this.cartItems);
  }

  getCartItems() {
    return this.cartItems$.asObservable();
  }

  addToCart(product: Dessert, quantity: number = 1) {
  const index = this.cartItems.findIndex(item => item.product.name === product.name);
    if (index > -1) {
      this.cartItems[index].quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
     console.log('CartService updated:', this.cartItems);
    this.cartItems$.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }


  getTotalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

}
