# 🌸 Socially – A Full Stack Social Media Web App

**Socially** is a full-stack social media web application that allows users to connect, share posts, upload images, follow other users, comment on posts, and interact just like a real social media platform.

This project is built using **HTML, CSS, JavaScript** for the frontend and **Node.js, Express.js, MongoDB** for the backend.

---

## 🚀 Features

### 👤 User Authentication
- User Registration
- User Login with encrypted passwords (bcrypt)
- Authentication validation
- Secure session handling using JWT
- Logout functionality

### 📝 Posts
- Create text posts
- Upload image posts
- View all posts in real-time feed
- Like posts
- Delete own posts

### 💬 Comments
- Add comments on posts
- View all comments for each post

### 🤝 Follow System
- Follow other users
- Unfollow users
- View followers and following lists

### 🖼 Profile
- View user profile
- Update username and bio
- Upload profile picture
- View followers & following count
- Profile posts grid layout

### 📸 Stories
- Upload image stories
- Stories auto-expire after 24 hours

### 🔍 Search
- Search users by username
- Instant dropdown search results

### 🎨 UI / UX
- Modern social media style UI
- Responsive design
- Custom background images for:
  - Login page
  - Register page
  - Profile page

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (Image Uploads)
- bcryptjs
- JSON Web Token (JWT)
- dotenv

---

## 📂 Project Structure

social-media-app/
│
├── backend/
│ ├── models/
│ │ ├── User.js
│ │ ├── Post.js
│ │ ├── Comment.js
│ │ ├── Story.js
│ │ └── Notification.js
│ │
│ ├── routes/
│ │ ├── auth.js
│ │ ├── user.js
│ │ ├── post.js
│ │ ├── comment.js
│ │ ├── story.js
│ │ └── notification.js
│ │
│ ├── uploads/
│ │ └── (uploaded images)
│ │
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── css/
│ │ ├── style.css
│ │ ├── bg.jpg
│ │ └── profile-bg.jpg
│ │
│ ├── js/
│ │ ├── auth.js
│ │ ├── feed.js
│ │ ├── profile.js
│ │ ├── followers.js
│ │ ├── following.js
│ │ └── register.js
│ │
│ ├── index.html
│ ├── register.html
│ ├── feed.html
│ ├── profile.html
│ ├── followers.html
│ ├── following.html
│ └── upload.html
│
└── README.md



---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/socialapp
JWT_SECRET=your_secret_key


▶️ How to Run the Project
1️⃣ Backend Setup
cd backend
npm install
npx nodemon server.js

2️⃣ Frontend

Open frontend/index.html in browser
OR

Use Live Server (VS Code recommended)

🧪 Database Collections

Users

Posts

Comments

Followers / Following

Stories

Notifications

🔒 Security

Passwords are hashed using bcrypt

JWT-based authentication

Users can delete only their own posts

Unauthorized access is blocked

📸 Screens Supported

Login Page

Register Page

Feed Page

Profile Page

Followers / Following

Image Uploads

Stories

📌 Future Enhancements

Real-time chat

Post sharing

Saved posts

Dark mode

Notifications panel

👩‍💻 Author

Developed by: Gauri
Project Type: Full Stack Web Development
Purpose: Learning, Internship, Academic Project