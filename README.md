# 💄 GlamStudio – Salon Booking Platform

GlamStudio is a full-stack salon booking web application that allows users to explore beauty services, schedule appointments, and securely complete payments online using Stripe.

The platform includes authentication, role-based access (User & Admin), service browsing, testimonials, and an integrated booking and payment workflow.

This project demonstrates a complete modern web application architecture using React, Node.js, MongoDB, and Stripe.

---

# 🌐 Live Application

Frontend (Vercel)
https://salon-booking-app-plum.vercel.app

Backend API (Render)
https://glamstudio-ezax.onrender.com

GitHub Repository
https://github.com/AvantiSavji/salon-booking-app

---

# ✨ Key Features

### User Features

• User Registration
• User Login / Authentication
• Browse Salon Services
• View Service Pricing
• Book Appointment
• Secure Online Payment (Stripe)
• Booking Confirmation Page
• View Testimonials
• Responsive UI for mobile and desktop

### Admin Features

• Admin Login
• Manage Services
• View Bookings
• Manage Customer Appointments
• Monitor payments and bookings

---

# 👥 User Roles

## 1. Customer (User)

Customers can:

* Register an account
* Log in to the platform
* Browse available salon services
* Book appointments
* Pay securely using Stripe
* Receive booking confirmation

## 2. Admin

Admins can:

* Log into the admin panel
* View all bookings
* Manage salon services
* Monitor platform usage

---

# 🧭 Application Workflow

1. User visits the website.
2. User registers or logs in.
3. User browses available salon services.
4. User selects a service and proceeds to booking.
5. Frontend sends request to backend API.
6. Backend creates Stripe Checkout Session.
7. User completes payment through Stripe.
8. After successful payment, user is redirected to the Success page.
9. Booking is confirmed.

---

# 🏗️ Tech Stack

## Frontend

React.js
React Router
Axios
HTML5
CSS3

Purpose:

* Build interactive user interface
* Manage client-side routing
* Communicate with backend APIs

---

## Backend

Node.js
Express.js

Purpose:

* Create RESTful APIs
* Handle booking requests
* Manage Stripe payment sessions
* Connect frontend to database

---

## Database

MongoDB Atlas

Purpose:

* Store booking data
* Store service details
* Manage application data

---

## Payment Gateway

Stripe API

Purpose:

* Secure online payments
* Checkout session creation
* Payment confirmation

---

## Deployment

Frontend Hosting
Vercel

Backend Hosting
Render

Version Control
GitHub

---

# 📡 RESTful API Endpoints

Base URL

https://glamstudio-ezax.onrender.com

---

## Create Stripe Checkout Session

POST
/api/create-checkout-session

Description
Creates a Stripe checkout session for the selected salon service.

Request Example

{
"serviceName": "Hair Styling",
"price": 500
}

Response

{
"url": "https://checkout.stripe.com/session..."
}

---

## Get Services

GET
/api/services

Returns a list of available salon services.

---

## Create Booking

POST
/api/bookings

Creates a booking record.

---

## Get Bookings

GET
/api/bookings

Returns all booking data.

---

# 📂 Project Structure

salon-booking-app

client
├── src
│   ├── components
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Testimonials.jsx
│   │   └── Success.jsx
│   ├── App.jsx
│   └── main.jsx

server
├── routes
├── controllers
├── models
├── stripe.js
└── server.js

README.md

---

# 🔐 Environment Variables

Backend `.env`

PORT=5000

MONGO_URI=your_mongodb_connection_string

STRIPE_SECRET_KEY=your_stripe_secret_key

FRONTEND_URL=https://salon-booking-app-plum.vercel.app

---

# ⚙️ Installation & Setup

## Clone Repository

git clone https://github.com/AvantiSavji/salon-booking-app.git

cd salon-booking-app

---

## Backend Setup

cd server

npm install

npm start

---

## Frontend Setup

cd client

npm install

npm start

---

# 💳 Stripe Test Payment

Use Stripe test card for payments.

Card Number
4242 4242 4242 4242

Expiry Date
Any future date

CVC
Any three digits

---

# 📸 Screenshots

Homepage
<img width="1896" height="826" alt="image" src="https://github.com/user-attachments/assets/82f98620-c02e-42b2-8348-91345e7bc3c3" />


Booking Page
<img width="1896" height="824" alt="image" src="https://github.com/user-attachments/assets/897baabf-806b-4c3c-bdae-621da33b077c" />


Services Page
<img width="1895" height="824" alt="image" src="https://github.com/user-attachments/assets/af987a7f-f847-463b-998c-97c940b086be" />


Testimonials Page
<img width="1893" height="818" alt="image" src="https://github.com/user-attachments/assets/3227a1f7-9032-4b14-a9df-4141ab041fc4" />


About Page
<img width="1889" height="824" alt="image" src="https://github.com/user-attachments/assets/42247c72-065c-4f46-bc8e-d4753534ceb1" />
<img width="1898" height="823" alt="image" src="https://github.com/user-attachments/assets/80bdfa37-dcc6-422a-a204-85925782a72f" />


Gallery Page
<img width="1894" height="819" alt="image" src="https://github.com/user-attachments/assets/cf07750c-f425-4dcf-a263-8a3eeb4b321f" />


Stripe Payment Page
<img width="1919" height="821" alt="image" src="https://github.com/user-attachments/assets/6440d3e8-52cf-4379-b464-b5bd6980076b" />
<img width="1888" height="823" alt="image" src="https://github.com/user-attachments/assets/c24b3177-b047-4259-b789-38e61de27f19" />


Bookings Page
<img width="1897" height="824" alt="image" src="https://github.com/user-attachments/assets/9e2f3373-0531-4216-b997-5a7b63eb6eff" />


Admin Dashboard
<img width="1890" height="825" alt="image" src="https://github.com/user-attachments/assets/91909d0a-8268-46a7-843a-9f191297f14c" />



Admin Appointment Calendar
<img width="1884" height="821" alt="image" src="https://github.com/user-attachments/assets/c2c15447-f90e-4fd6-b0bc-bbf44f72b5c5" />

---
