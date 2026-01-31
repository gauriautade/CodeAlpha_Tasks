🛒 HappyCart – Full Stack E-Commerce Website

HappyCart is a full-stack e-commerce web application developed as my first complete e-commerce project.
The project implements a complete shopping flow including user authentication, product listing, cart management, order placement, order history, and an admin panel.

The application is built using HTML, CSS, JavaScript (Vanilla), Node.js, Express.js, and MongoDB.

🎯 Project Objective

To understand frontend and backend integration

To implement authentication & authorization

To build a real-world e-commerce workflow

To learn role-based access control (Admin / User)

To design clean and responsive UI pages

✨ Features Implemented
👤 User Features

User Registration & Login

Secure password hashing using bcrypt

JWT-based authentication

Browse products with image, price, and description

Product details page

Add products to cart

Increase / decrease quantity in cart

Remove items from cart

Checkout with delivery details

Mock payment options (COD, UPI, Card)

Order success page

My Orders page showing:

Ordered products

Quantity

Total price

Order date

Protected pages (only logged-in users can access cart & orders)

🛒 Cart & Checkout

Cart stored using localStorage

Dynamic total calculation

Cart cleared after successful order

Separate checkout page with background image

Order summary before placing order

🧑‍💼 Admin Features

Role-based system (user / admin)

Admin-only panel (admin.html)

View all customer orders

Admin routes protected on backend

Admin pages hidden from normal users

Backend security ensures normal users cannot access admin APIs

🎨 UI & Design

Modern and responsive design

Background images for:

Home (Hero section)

Cart page

Checkout page

Orders page

Success page

Login & Register pages

Card-based layouts

Clean and professional UI

🛠️ Technologies Used
Frontend

HTML

CSS

JavaScript (Vanilla)

Live Server (VS Code)

Backend

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

bcrypt

dotenv

📂 Project Structure

happycart/
│
├── backend/
│   ├── .env
│   ├── server.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   ├── user.js
│   │   ├── product.js
│   │   └── order.js
│   │
│   └── routes/
│       ├── authRoutes.js
│       ├── productRoutes.js
│       ├── orderRoutes.js
│       └── ordersRoutes.js
│
└── frontend/
    ├── index.html
    ├── login.html
    ├── register.html
    ├── cart.html
    ├── checkout.html
    ├── order.html
    ├── orders.html
    ├── product.html
    ├── admin.html
    ├── success.html
    ├── README.md
    │
    ├── css/
    │   ├── style.css
    │   ├── auth.css
    │   ├── cart.css
    │   ├── checkout.css
    │   ├── order.css
    │   ├── orders.css
    │   ├── product.css
    │   ├── admin.css
    │   └── success.css
    │
    ├── images/
    │   └── (product & background images)
    │
    └── js/
        ├── main.js
        ├── auth.js
        ├── login.js
        ├── cart.js
        ├── checkout.js
        ├── order.js
        ├── orders.js
        ├── product.js
        ├── admin.js
        └── admin-orders.js



🔐 Authentication & Security

Passwords are encrypted using bcrypt

JWT tokens used for authentication

Protected backend routes using middleware

Role-based authorization for admin features

Frontend uses localStorage only (backend never uses browser APIs)

🚀 How to Run the Project Locally
1️⃣ Install Backend Dependencies
cd backend
npm install

2️⃣ Create .env File
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

3️⃣ Start Backend Server
node server.js

4️⃣ Run Frontend

Open frontend/index.html

Or use Live Server in VS Code

🧪 Admin Setup

To make a user admin in MongoDB:

db.users.updateOne(
  { email: "admin@email.com" },
  { $set: { role: "admin" } }
)