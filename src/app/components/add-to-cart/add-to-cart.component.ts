import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Dessert } from '../../models/desserts.model';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss'
})

export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() dessert!: Dessert; 
  @Output() itemAdded = new EventEmitter<{ product: Dessert; quantity: number }>();  

  isAddedToCart = false;
  quantity = 1;
  private itemRemovedListener: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Check if this item is already in the cart when component initializes
    this.cartService.getCartItems().subscribe(items => {
      const existingItem = items.find(item => item.product.name === this.dessert.name);
      if (existingItem) {
        this.isAddedToCart = true;
        this.quantity = existingItem.quantity;
      } else {
        this.isAddedToCart = false;
        this.quantity = 1;
      }
    });

    // Listen for item removed events
    this.itemRemovedListener = (event: CustomEvent) => {
      if (event.detail.productName === this.dessert.name) {
        this.isAddedToCart = false;
        this.quantity = 1;
      }
    };
    
    window.addEventListener('itemRemoved', this.itemRemovedListener);
  }

  ngOnDestroy(): void {
    // Clean up event listener
    window.removeEventListener('itemRemoved', this.itemRemovedListener);
  }

  addToCart() {
    this.isAddedToCart = true;
    console.log('Emitting from AddToCart:', this.dessert, this.quantity);
    this.itemAdded.emit({ product: this.dessert, quantity: this.quantity }); 
  }

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.decrementQuantity(this.dessert.name);
    }
    else {
      this.isAddedToCart = false;
      this.cartService.removeFromCart(this.dessert.name);
    }
  }

  increaseProductItem() {
    ++this.quantity;
    this.cartService.addToCart(this.dessert, 1);
  }
};
