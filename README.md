# Dessert Product List with Cart 🍧

A responsive Angular application for browsing and ordering desserts with a shopping cart feature.

## Features 💫

- **Product Catalog**: Browse a variety of desserts with images, descriptions, and prices
- **Shopping Cart**: Add items to cart, adjust quantities, and remove items
- **Responsive Design**: Optimized for desktop (1024px+), tablet (768px), and mobile (375px) views
- **Order Confirmation**: Review your order and start a new shopping session
- **Persistent Cart**: Cart contents are saved in localStorage between sessions

## Setup and Installation

1. **Installation**:
   ```bash
   # Clone the repository (if not already done)
   git clone <repository-url>
   
   # Navigate to the project directory
   cd product-list-debugging
   
   # Install dependencies
   npm install
   ```

2. **Development Server**:
   ```bash
   # Start the development server
   ng serve
   
   # Access the application at http://localhost:4200/
   ```

## Application Structure

- **Product List**: Displays dessert items in a responsive grid (3 columns on desktop/tablet, 1 column on mobile)
- **Cart Component**: Shows selected items, quantities, and total price
- **Add to Cart**: Interactive controls for adding items and adjusting quantities
- **Order Confirmation**: Modal that appears after confirming an order

## Component Architecture & Communication

### Services
- **CartService**: Manages cart state using BehaviorSubject for real-time updates
  - Provides methods for adding, removing, and updating cart items
  - Persists cart data in localStorage
  - Exposes cart items as an Observable for components to subscribe to

- **OrderService**: Handles order processing and confirmation
  - Manages order state using BehaviorSubjects
  - Communicates with CartService to process orders
  - Provides methods for calculating totals and managing order confirmation

### Component Communication
- **@Input/@Output Pattern**:
  - ProductCard receives dessert data via @Input
  - AddToCart component emits events when items are added via @Output
  - OrderConfirmed component receives order data via @Input

- **Observable Pattern**:
  - Components subscribe to CartService and OrderService observables
  - Real-time updates when cart items change or orders are processed
  - Automatic UI updates through Angular's change detection

- **Event Communication**:
  - Custom events for synchronizing add-to-cart buttons with cart state
  - Event listeners for handling item removal across components

## Key Technologies

- **Angular 19**: Framework for building the application
- **SCSS**: For styling with variables and mixins
- **LocalStorage**: For persisting cart data between sessions
- **Responsive Design**: Using CSS Grid and Flexbox
- **RxJS**: For reactive state management with Observables and BehaviorSubjects

## Author
Mildred Naab
