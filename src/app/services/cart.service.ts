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

  getCurrentCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  addToCart(product: Dessert, quantity: number = 1) {
    const index = this.cartItems.findIndex(item => item.product.name === product.name);
    if (index > -1) {
      this.cartItems[index].quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.updateCart();
  }

  decrementQuantity(productName: string) {
    const index = this.cartItems.findIndex(item => item.product.name === productName);
    if (index > -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.removeFromCart(productName);
        return;
      }
      this.updateCart();
    }
  }

  removeFromCart(productName: string) {
    this.cartItems = this.cartItems.filter(item => item.product.name !== productName);
    this.updateCart();
    
    // Emit an event that can be listened to by the add-to-cart components
    const itemRemovedEvent = new CustomEvent('itemRemoved', { 
      detail: { productName } 
    });
    window.dispatchEvent(itemRemovedEvent);
  }

  private updateCart() {
    this.cartItems$.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }
}
