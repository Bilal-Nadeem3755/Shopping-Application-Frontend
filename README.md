# Shopping Application Frontend

A modern e-commerce frontend built with React and integrated with a FastAPI backend. The application provides a complete shopping experience with authentication, product browsing, cart management, checkout, orders, reviews, payments, and an admin dashboard.

## Features

### Authentication

- User signup and login
- JWT-based authentication
- Email verification
- Forgot password
- Reset password
- Protected routes
- Admin route protection

### Shopping

- Browse products
- View product details
- Product ratings and reviews
- Add products to cart
- Update cart quantities
- Remove products from cart
- Clear cart
- Stock availability

### Checkout & Payments

- Checkout flow
- Stripe payment integration
- Payment confirmation
- Order success page

### Orders

- View personal orders
- View order details
- Track order status

### User Profile

- View user profile
- Manage account information

### Admin Dashboard

- Product management
- User management
- Order management
- Coupon management
- Review management
- Return management

## Tech Stack

- React 18
- JavaScript
- Vite
- React Router
- Tailwind CSS
- Axios
- Stripe
- JWT Decode
- React Icons
- Lucide React

## Project Structure

```text
src/
├── admin/
│   ├── AdminDashboard.jsx
│   ├── AdminLayout.jsx
│   ├── AdminUsers.jsx
│   ├── CouponsAdmin.jsx
│   ├── OrdersAdmin.jsx
│   ├── ProductsAdmin.jsx
│   ├── ReturnsAdmin.jsx
│   └── ReviewsAdmin.jsx
│
├── components/
│   ├── Footer.jsx
│   ├── Hero-section.jsx
│   ├── Navbar.jsx
│   ├── PaymentForm.jsx
│   ├── ProductDetail.jsx
│   ├── Products.jsx
│   ├── Progress-Bar.jsx
│   └── ReviewForm.jsx
│
├── context/
│   └── CartContext.jsx
│
├── pages/
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── ForgotPassword.jsx
│   ├── Login.jsx
│   ├── Orders.jsx
│   ├── Profile.jsx
│   ├── ResetPassword.jsx
│   ├── Signup.jsx
│   ├── Success.jsx
│   └── VerifyEmail.jsx
│
├── routes/
│   ├── AdminRoute.jsx
│   └── ProtectedRoute.jsx
│
├── api/
│   └── api.js
│
├── utils/
│   └── api.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx