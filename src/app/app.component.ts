import { Component, OnInit } from '@angular/core';
import { DessertService } from './services/dessert.service';
import { Dessert } from './models/desserts.model';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, ProductListComponent] //Bug Fix: AddToCartComponent must be imported here
}) // Bug Fix: Component decorator should be put before the class declaration

export class AppComponent implements OnInit {
  title = 'Product list';
  desserts:Dessert[] = []; 

  constructor(private dessertService: DessertService) {}

  ngOnInit(): void {
    this.dessertService.getDesserts().subscribe((data) => {
      this.desserts = data;
    });
  }

};
