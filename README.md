# LUXE — E-Commerce Store

A modern, responsive e-commerce frontend built with **React** and **Vite**, designed to provide a complete shopping experience — from browsing and discovering products to managing a wishlist, cart, checkout, and account.

LUXE uses the **DummyJSON API** as its product data source and relies on React's built-in state management capabilities, including **Context API**, **useReducer**, and **localStorage** for persistent client-side data.

---

## Features

### Home

* Modern e-commerce landing page
* Hero section with promotional content
* Browse product categories
* Trending products section
* Limited-time offers
* Advantages / benefits section
* Customer testimonials
* Responsive layout

### Shop

A flexible product browsing experience with multiple ways to discover and organize products.

* Browse all available products
* Dynamic category filtering
* Price range filtering
* Minimum rating filtering
* Product search
* Combine search and multiple filters together
* Product sorting:

  * Featured
  * Newest
  * Price: Low to High
  * Price: High to Low
  * Top Rated
  * Best Discount
* Grid / List view toggle
* Responsive filtering interface
* Desktop sidebar filters
* Mobile-friendly filter interface
* Category-based shop routes

### Product Details

A dedicated product page for viewing detailed information about each product.

* Dynamic product pages using React Router route parameters
* Product image gallery powered by Swiper
* Fade and zoom transitions
* Thumbnail navigation synchronized with the main slider
* Product information and pricing
* Discount and stock information
* Category information
* Color variant selection
* Star rating display
* Half-star rating support
* Add products directly to the cart
* Add/remove products from the wishlist
* Responsive product details layout

### Wishlist

* Add products to wishlist from product cards
* Add/remove products directly from the product page
* Remove products from the dedicated wishlist page
* Live wishlist counter in the header
* Wishlist persistence using `localStorage`
* Dedicated account wishlist page

### Cart

LUXE provides both a dedicated cart page and a slide-in cart aside for quick access while shopping.

#### Cart Aside

* Slide-in cart panel accessible throughout the store
* Displays currently added products
* Increase/decrease product quantities
* Remove products directly from the cart aside
* Live cart updates
* Quick access to the full cart
* Quick access to checkout

#### Cart Page

* Full cart overview
* Increase/decrease product quantities
* Remove individual products
* Clear the entire cart
* Persistent cart state using `localStorage`
* Cart data validation when restoring persisted data
* Order summary including:

  * Subtotal
  * Tax
  * Discount
  * Total

### Checkout

A multi-step checkout experience designed to simulate a complete purchasing flow.

**Checkout Flow:**

```text
Shipping Information → Payment → Review → Order Confirmation
```

Features include:

* Multi-step checkout
* Shipping information
* Multiple shipping methods:

  * Standard
  * Express
  * Overnight
* Payment method interface:

  * Credit Card
  * PayPal
  * Apple Pay
* Order review before confirmation
* Place Order functionality
* Orders persisted in `localStorage`
* Cart automatically cleared after placing an order

> **Note:** Payment methods are frontend UI implementations only. No real payment processing is connected.

### Account

A dedicated account area containing multiple sections:

* Account overview
* Orders history
* Wishlist
* Addresses
* Payment information
* Settings
* Order history persisted using `localStorage`
* Form validation

### Responsive Design

The interface is designed to provide a consistent experience across different screen sizes.

* Responsive navigation
* Mobile-friendly shop filters
* Responsive product grids
* Responsive product details
* Mobile cart interface
* Responsive checkout flow
* Responsive account pages

### UI & Interaction

* Scroll-to-top behavior on route changes
* Scroll reveal animations using `IntersectionObserver`
* Interactive product cards
* Responsive navigation and side menus
* Marquee-based promotional content
* Interactive sliders and galleries

---

## State Management

LUXE uses React's built-in state management capabilities instead of an external state management library.

### Context API

Application-wide state is separated into dedicated contexts:

```text
contexts/
├── CartContextProvider.jsx
├── LocalstorageContext.jsx
├── ProductsContext.jsx
├── SearchContext.jsx
└── WishlitContext.jsx
```

These contexts handle shared application data such as:

* Products
* Cart state
* Search state
* Local storage-related state
* Wishlist state

### useReducer

Cart operations are handled through a dedicated reducer:

```text
components/
└── Cart/
    └── CartReducer.jsx
```

This centralizes cart actions such as:

* Add
* Remove
* Increase quantity
* Decrease quantity
* Clear cart

### localStorage

Client-side persistence is used for:

* Cart
* Wishlist
* Orders

This allows important shopping data to remain available after refreshing or revisiting the application.

---

## Routing

LUXE uses **React Router** for client-side navigation.

```text
/
├── /home
├── /shop
├── /shop/:category
├── /product/:id
├── /cart
├── /checkout
├── /confirm-order
└── /account
    ├── /wishlist
    ├── /orders
    ├── /address
    ├── /payment
    └── /settings
```

The application uses a shared `MainLayout` for common layout elements across the main routes.

---

## Project Structure

```text
src/
│
├── assets/
│   ├── CSS/
│   │   ├── Cart/
│   │   │   ├── aside-cart.module.css
│   │   │   └── cart.module.css
│   │   │
│   │   ├── Checkout/
│   │   ├── General/
│   │   ├── Home/
│   │   ├── My-Account/
│   │   ├── Product/
│   │   └── Shop/
│   │
│   └── images/
│
├── components/
│   ├── Account/
│   ├── Cart/
│   │   ├── CartAside/
│   │   │   ├── CartAside.jsx
│   │   │   └── CartAsideProduct.jsx
│   │   │
│   │   ├── CartPage/
│   │   │   └── CartCard.jsx
│   │   │
│   │   └── CartReducer.jsx
│   │
│   ├── Checkout/
│   ├── General/
│   ├── Home/
│   └── Shop/
│
├── contexts/
│   ├── CartContextProvider.jsx
│   ├── LocalstorageContext.jsx
│   ├── ProductsContext.jsx
│   ├── SearchContext.jsx
│   └── WishlitContext.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Account/
│   │   ├── Account.jsx
│   │   ├── Address.jsx
│   │   ├── Orders.jsx
│   │   ├── Payment.jsx
│   │   ├── Settings.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── Checkout/
│   │   └── Checkout.jsx
│   │
│   ├── Shop/
│   │   ├── Shop.jsx
│   │   └── ShopAside.jsx
│   │
│   ├── Cart.jsx
│   ├── Home.jsx
│   └── Product.jsx
│
├── App.jsx
├── project.jsx
└── routes.jsx
```

The project is organized into **pages, reusable components, feature-specific components, shared contexts, layouts, and styling**, keeping the codebase modular and easier to maintain as the application grows.

---

## Technologies & Libraries

### Core

* **React 19**
* **React DOM**
* **Vite**
* **JavaScript / ES Modules**

### Routing

* **React Router DOM**

### State Management

* **React Context API**
* **useReducer**
* **useState**
* **useEffect**
* **localStorage**

### Styling & UI

* **CSS Modules**
* **Bootstrap 5.3**
* **Styled Components**
* Custom responsive CSS
* **Google Fonts — Barlow**

### UI & Interaction

* **Swiper**
* **React Icons**
* **React Fast Marquee**
* **IntersectionObserver**

### Data

* **DummyJSON API**

### Development & Deployment

* **ESLint**
* **GitHub Pages**
* **gh-pages**
* **Vercel**

---

## API

LUXE retrieves its product catalog from the **DummyJSON Products API**.

```text
https://dummyjson.com/products?limit=194
```

Products are fetched when the application starts and made available throughout the application through `ProductsContext`.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/men3m111/myEcommerce.git
```

Navigate to the project directory:

```bash
cd myEcommerce
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Preview

```bash
npm run preview
```

Previews the production build locally.

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

### Deploy

```bash
npm run deploy
```

Builds the project and deploys the generated `dist` directory to GitHub Pages.

The project uses a `predeploy` script that automatically runs the production build before deployment.

---

## Deployment

LUXE is configured to be deployed to both **GitHub Pages** and **Vercel**.

### GitHub Pages

The project uses the `gh-pages` package to deploy the production build.

```bash
npm run deploy
```

The production build is generated in:

```text
dist/
```

and deployed to GitHub Pages.

### Vercel

The project can also be deployed through Vercel using the existing Vite configuration.

After connecting the GitHub repository to Vercel, the project can be deployed with the standard Vite settings:

```text
Build Command: npm run build
Output Directory: dist
```

Vercel can automatically redeploy the project whenever changes are pushed to the connected GitHub repository.

---

## Future Improvements

Potential improvements for future versions include:

* Real authentication and user accounts
* Backend integration
* Database integration
* Real payment processing
* Server-side order management
* Product reviews
* More advanced form validation
* Persistent user profiles
* Improved accessibility
* Advanced animations and page transitions

---

## Author

**Mohamed Abdelmoneim**

Frontend Developer focused on building modern, responsive web applications with React and JavaScript.

---

## License

This project was created for educational and portfolio purposes.
