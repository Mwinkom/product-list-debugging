import { Component, Input, OnInit, HostListener } from '@angular/core';
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
export class ProductCardComponent implements OnInit {
  @Input() dessert!: Dessert;
  screenWidth: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  getImageForScreenSize(): string {
    if (this.screenWidth <= 375) {
      return this.dessert.image.mobile;
    } else if (this.screenWidth <= 768) {
      return this.dessert.image.tablet;
    } else {
      return this.dessert.image.desktop;
    }
  }

  handleAddToCart(event: { product: Dessert; quantity: number }) {
    this.cartService.addToCart(event.product, event.quantity);
  }
}
