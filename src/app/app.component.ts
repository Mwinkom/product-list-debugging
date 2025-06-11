import { Component } from '@angular/core';
import desseretData from '../../public/data.json';
import { AddToCartComponent } from "./components/add-to-cart/add-to-cart.component";

// interface
interface Dessert {
  image: DessertImages;
  name: string;
  category: string;
  price: number;
};

interface DessertImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [AddToCartComponent] //Bug Fix: AddToCartComponent must be imported here
}) // Bug Fix: Component decorator should be put before the class declaration

export class AppComponent {
  title = 'Product list';
  desserts:Dessert[] | null = null;

  constructor() {
    this.desserts = desseretData;
  };
};
