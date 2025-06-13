import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { CartService } from './cart.service';
import { CartItem } from '../models/cart-item.model';
import { of } from 'rxjs';

describe('OrderService', () => {
  let service: OrderService;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let mockCartItems: CartItem[];

  beforeEach(() => {
    // Create mock cart items
    mockCartItems = [
      {
        product: {
          name: 'Test Dessert 1',
          category: 'Test Category',
          price: 5.99,
          image: {
            thumbnail: 'test1-thumb.jpg',
            mobile: 'test1-mobile.jpg',
            tablet: 'test1-tablet.jpg',
            desktop: 'test1-desktop.jpg'
          }
        },
        quantity: 2
      },
      {
        product: {
          name: 'Test Dessert 2',
          category: 'Test Category',
          price: 3.99,
          image: {
            thumbnail: 'test2-thumb.jpg',
            mobile: 'test2-mobile.jpg',
            tablet: 'test2-tablet.jpg',
            desktop: 'test2-desktop.jpg'
          }
        },
        quantity: 1
      }
    ];

    // Create spy for CartService
    const cartSpy = jasmine.createSpyObj('CartService', ['getCurrentCartItems', 'clearCart']);
    cartSpy.getCurrentCartItems.and.returnValue(mockCartItems);

    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: CartService, useValue: cartSpy }
      ]
    });

    service = TestBed.inject(OrderService);
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate item total correctly', () => {
    const item = mockCartItems[0];
    const total = service.calculateItemTotal(item);
    expect(total).toBe(11.98); // 5.99 * 2
  });

  it('should calculate order total correctly', () => {
    const total = service.calculateOrderTotal(mockCartItems);
    expect(total).toBe(15.97); // (5.99 * 2) + (3.99 * 1)
  });

  it('should confirm order and update observables', () => {
    let confirmedItems: CartItem[] = [];
    let orderTotal = 0;
    let showConfirmation = false;

    service.getConfirmedOrderItems().subscribe(items => confirmedItems = items);
    service.getOrderTotal().subscribe(total => orderTotal = total);
    service.getShowOrderConfirmed().subscribe(show => showConfirmation = show);

    service.confirmOrder();

    expect(cartServiceSpy.getCurrentCartItems).toHaveBeenCalled();
    expect(confirmedItems).toEqual(mockCartItems);
    expect(orderTotal).toBe(15.97);
    expect(showConfirmation).toBeTrue();
  });

  it('should start new order and clear cart', () => {
    let showConfirmation = true;
    service.getShowOrderConfirmed().subscribe(show => showConfirmation = show);

    service.startNewOrder();

    expect(showConfirmation).toBeFalse();
    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
  });
});
