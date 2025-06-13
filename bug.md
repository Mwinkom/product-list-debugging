# 🐞 Bugs & Fixes – Product List 

This document outlines key bugs encountered during development of the Product List Debugging project, along with their causes, symptoms, and implemented solutions. The goal was to follow clean Angular architecture, improve component communication, and ensure the UI matched the provided Figma design.

---

### 🧩 Bug 1 — Syntax Error: “Declaration expected”

**Where it happened:**  
- `app.component.ts`  
- `add-to-cart.component.ts`

**Cause:**  
A semicolon was mistakenly placed **after the `@Component()` decorator**, which breaks Angular’s decorator syntax.

**Symptoms:**  
- Build failed on app start  
- Error in console: `Declaration expected`

**Fix:**  
- Removed the stray semicolon (`;`) after `@Component({ ... })`  
- Placed the `export class` definition **directly below** the decorator block  

✅ App compiled successfully afterward.

---

### 🧩 Bug 2 — “app-add-to-cart is not a known element”

**Where it happened:**  
- `app.component.html`

**Cause:**  
The `AddToCartComponent` was used in the template, but **not imported** in the component file.

**Symptoms:**  
- Angular template compilation error: Unknown element  
- Console showed `NG8001` warning

**Fix:**  
- Imported `AddToCartComponent` in `AppComponent`  
- Registered it in the `imports` array (since this is a standalone component)

✅ Component rendered correctly after import.

---

### 🧩 Bug 3 — Quantity Could Drop Below 1

**Where it happened:**  
- `AddToCartComponent` quantity control logic

**Cause:**  
Initial logic didn’t prevent the quantity from decrementing below 1, resulting in negative values and inconsistent cart states.

**Symptoms:**  
- Quantity dropped to 0 or negative  
- UI became stuck or unresponsive

**Fix:**  
Rewrote `decreaseProductItem()` to:  
- Decrement only if `quantity > 1`  
- Otherwise, reset cart toggle and call `cartService.removeFromCart(...)`

```ts
decreaseProductItem() {
  if (this.quantity > 1) {
    this.quantity--;
    this.cartService.decrementQuantity(this.dessert.name);
  } else {
    this.isAddedToCart = false;
    this.cartService.removeFromCart(this.dessert.name);
  }
}
```

✅ Quantity stays between 1 and N, and cart remains accurate.

---

### 🧩 Bug 4 — Hardcoded Dessert Items

**Where it happened:**  
- `app.component.html`

**Cause:**  
Multiple dessert cards (e.g., Waffle) were statically written into the HTML instead of being rendered from the `data.json` file.

**Symptoms:**  
- Same dessert displayed multiple times regardless of data  
- Any updates to data.json had no effect on the UI

**Fix:**  
- Removed static dessert blocks  
- Passed loaded data to `ProductListComponent`:
  ```html
  <app-product-list [desserts]="desserts" />
  ```
- Used `*ngFor` inside the product list to dynamically render items

✅ Now, desserts render dynamically and respond to changes in `data.json`.