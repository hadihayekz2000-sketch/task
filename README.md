POS Dashboard

A full-stack Point of Sale (POS) Dashboard built with React (frontend) and Node.js/Express + MongoDB (backend). This project allows users to manage products, create orders, and visualize sales insights dynamically.

Features
Frontend

Modern responsive UI using CSS grid and flex layouts.

Order creation form with live product selection and quantity input.

Add Product modal with modern design and input validation.

Charts and Analytics:

Sales trends over time (Line Chart)

Busiest hours (Bar Chart)

Top products (Pie Chart)

Dynamic updates: changing product selection updates charts and orders table in real-time.

Loading indicators for API calls.

Toast notifications for successful operations (like adding a product or creating an order).

Backend

Built with Node.js, Express, and MongoDB (Mongoose).

REST API endpoints:

/api/products – get/add products

/api/orders – get/add orders

/api/insights – get dashboard analytics

Real-time stock tracking and validation.

Proper error handling for duplicate products, invalid requests, and server errors.
