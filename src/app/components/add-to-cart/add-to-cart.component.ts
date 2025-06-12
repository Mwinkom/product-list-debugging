import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dessert } from '../../models/desserts.model';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss'
})

export class AddToCartComponent {
  @Input() dessert!: Dessert; 
  @Output() itemAdded = new EventEmitter<{ product: Dessert; quantity: number }>();  

  isAddedToCart = false;
  quantity = 1;

  addToCart() {
    this.isAddedToCart = true;
    console.log('Emitting from AddToCart:', this.dessert, this.quantity);
    this.itemAdded.emit({ product: this.dessert, quantity: this.quantity }); 
  }

  //Old code that was not working properly
  // decreaseProductItem() {
  //   if (this.quantity < 1) {
  //     this.isAddedToCart = false;
  //   }
  //   this.quantity--;
  // }

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
    }
    else {
      this.isAddedToCart = false; // Bug Fix: Ensure isAddedToCart is set to false when quantity is 1
    }
  } // Bug Fix: Ensure quantity does not go below 1

  increaseProductItem() {
    ++this.quantity;
  }

};
