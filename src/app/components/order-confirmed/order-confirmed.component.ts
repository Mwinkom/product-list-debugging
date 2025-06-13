import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-confirmed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmed.component.html',
  styleUrl: './order-confirmed.component.scss'
})
export class OrderConfirmedComponent implements OnInit {
  @Input() cartItems: CartItem[] = [];
  @Input() orderTotal: number = 0;
  @Output() startNewOrder = new EventEmitter<void>();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // If inputs are not provided, use the service data
    this.orderService.getConfirmedOrderItems().subscribe(items => {
      if (this.cartItems.length === 0) {
        this.cartItems = items;
      }
    });

    this.orderService.getOrderTotal().subscribe(total => {
      if (this.orderTotal === 0) {
        this.orderTotal = total;
      }
    });
  }

  getItemTotal(item: CartItem): number {
    return this.orderService.calculateItemTotal(item);
  }

  onStartNewOrder(): void {
    this.orderService.startNewOrder();
    this.startNewOrder.emit();
  }
}