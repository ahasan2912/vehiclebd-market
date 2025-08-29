# Project Name: VehicleBD-Market
VehicleBD-Market is a simple full-stack project built with Next.js, TypeScript, Tailwind CSS and MongoDB Databas. It features two roles: normal users and admins. Normal users can register, log in, place product orders, edit or delete their orders, while admins can add products, manage users, and handle the complete order list. This project ensures a smooth and structured vehicle marketplace experience.
# Role Base
VehicleBD-Market website two role: **Admin** && **User**.
- **Admin Email:** ahasanhabib2912@gmail.com
- **Admin Password:** @Admin123@

## 1. Admin
- **Add Product** – Add new vehicles/products with details (title, price, image, description, category, etc.) and keep product information updated.
- **Manage All Product** – View all products, edit/update/delete any product.
- **Manage Users** - View all users and remove any user if needed.
- **Manage Orders** – View all orders in the list, update order status, or delete orders as needed.

## 2. Normal User
- **Place Orders** – Normal users can browse products and place vehicle orders.
- **User Dashboard** – Users can access their dashboard to view, edit, or delete their orders.

## 3. Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Authentication:** Next-auth, OAuth
- **Hosting:** Vercel.

## 4. Features
- **User Authentication** – Login/Register using NextAuth.js with email/password and OAuth providers.
- **User Dashboard – Manage orders**: place, edit, delete, and track order status.
- **Admin Dashboard** – Manage products, users, and all orders efficiently.
- **Product Management** Add, edit, delete products and control availability status.
- **Order Management** – Track all orders, update status, and send notifications to users.- **Responsive UI** – Modern and fully responsive interface built with Tailwind CSS.
- **Role-Based Access** – Different functionalities for Admin and Normal Users.
## 5. Future Improvements
- Mobile App version with Flutter/React Native.
- Realtime communication between User,and Admin using Socket.IO.
- Add secure online payment gateway for vehicle bookings and purchases.
## 6. Known Issues / Bug
- When logging in with Credentials, the user role is not received immediately.
- As a result, the dashboard is not displayed right after login.
- Once the page is reloaded, the role appears and the dashboard is displayed correctly.
## 7. Installation & Setup
- https://github.com/ahasan2912/vehiclebd-market
- cd VehicleBD-Market
- npm install
- npm run dev

## 8. Deploying with Vercel
## [Live-site: ](https://bicycles-marketplace.vercel.app)
