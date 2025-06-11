import { Component } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss'
})

export class AddToCartComponent {
  isAddedToCart = false;
  quantity = 1;

  addToCart() {
    this.isAddedToCart = true;
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
