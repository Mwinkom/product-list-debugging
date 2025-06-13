import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Dessert } from '../models/desserts.model';

describe('CartService', () => {
  let service: CartService;
  let mockDessert: Dessert;
  let localStorageSpy: jasmine.Spy;

  beforeEach(() => {
    // Mock localStorage
    localStorageSpy = spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue(null);

    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);

    // Create mock dessert for testing
    mockDessert = {
      name: 'Cupcake',
      category: 'Cupcakes',
      price: 5.99,
      image: {
        thumbnail: 'test-thumb.jpg',
        mobile: 'test-mobile.jpg',
        tablet: 'test-tablet.jpg',
        desktop: 'test-desktop.jpg'
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    service.addToCart(mockDessert, 1);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].product.name).toBe('Cupcake');
      expect(items[0].quantity).toBe(1);
    });
    
    expect(localStorageSpy).toHaveBeenCalled();
  });

  it('should increase quantity when adding existing item', () => {
    service.addToCart(mockDessert, 1);
    service.addToCart(mockDessert, 2);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(3);
    });
  });

  it('should decrement quantity', () => {
    service.addToCart(mockDessert, 2);
    service.decrementQuantity(mockDessert.name);
    
    service.getCartItems().subscribe(items => {
      expect(items[0].quantity).toBe(1);
    });
  });

  it('should remove item when decrementing to zero', () => {
    service.addToCart(mockDessert, 1);
    service.decrementQuantity(mockDessert.name);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
    });
  });

  it('should remove item from cart', () => {
    service.addToCart(mockDessert, 1);
    service.removeFromCart(mockDessert.name);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
    });
  });

  it('should calculate total quantity correctly', () => {
    service.addToCart(mockDessert, 2);
    
    const secondDessert = {...mockDessert, name: 'Second Dessert'};
    service.addToCart(secondDessert, 3);
    
    expect(service.getTotalQuantity()).toBe(5);
  });

  it('should clear cart', () => {
    service.addToCart(mockDessert, 2);
    service.clearCart();
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
    });
    
    expect(service.getTotalQuantity()).toBe(0);
  });

  it('should get current cart items', () => {
    service.addToCart(mockDessert, 2);
    
    const items = service.getCurrentCartItems();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });
});
