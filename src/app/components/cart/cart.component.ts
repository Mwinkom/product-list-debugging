import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/cart-item.model';
import { OrderConfirmedComponent } from '../order-confirmed/order-confirmed.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, OrderConfirmedComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity = 0;
  showOrderConfirmed = false;
  confirmedOrderItems: CartItem[] = [];
  confirmedOrderTotal = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalQuantity = this.cartService.getTotalQuantity();
    });

    this.orderService.getShowOrderConfirmed().subscribe(show => {
      this.showOrderConfirmed = show;
    });

    this.orderService.getConfirmedOrderItems().subscribe(items => {
      this.confirmedOrderItems = items;
    });

    this.orderService.getOrderTotal().subscribe(total => {
      this.confirmedOrderTotal = total;
    });
  }

  removeItem(productName: string): void {
    this.cartService.removeFromCart(productName);
  }

  getItemTotal(item: CartItem): number {
    return this.orderService.calculateItemTotal(item);
  }

  getOrderTotal(): number {
    return this.orderService.calculateOrderTotal(this.cartItems);
  }

  confirmOrder(): void {
    this.orderService.confirmOrder();
  }

  startNewOrder(): void {
    this.orderService.startNewOrder();
  }
}