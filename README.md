# 📰 TrendWise — AI-Powered Blog Platform

**TrendWise** is a modern, full-stack blogging platform that empowers users to create, explore, and publish content based on real-time trending news. Leveraging the power of AI and live news APIs, TrendWise simplifies content creation for the digital age.

---

## 🚀 Live Preview

> Coming soon...

---

## ✨ Features

- 🔐 **User Authentication**  
  Secure login system using Google OAuth via NextAuth.js

- 🧠 **AI Blog Generation**  
  Automatically generate blog posts from trending news headlines using GNews API + OpenAI (GPT)

- 📝 **Rich Blog Creation**  
  Create blogs with:
  - 📸 Embedded images
  - 🎥 Video links
  - 🐦 Tweet references
  - ✍️ Clean editor interface

- 💬 **Comment System**  
  Authenticated users can post and manage comments on blog articles

- 🌐 **SEO-Optimized Pages**  
  Dynamic meta tags, Open Graph previews, and clean URLs for discoverability

- 📈 **Trending Dashboard (Upcoming)**  
  View and auto-generate posts from trending global topics

---

## 🛠 Tech Stack

| Frontend         | Backend              | Database | Integrations                    |
|------------------|----------------------|----------|----------------------------------|
| React + Vite     | Node.js + Express.js | MongoDB  | OpenAI, GNews API, NextAuth.js   |

---

## 📁 Folder Structure

trendwise/
│
├── client/ # React frontend (Vite)
│ ├── components/ # UI components (Navbar, CommentSection, etc.)
│ ├── pages/ # Route views (Home, Login, CreatePost)
│ └── styles/ # Custom CSS files
│
├── server/ # Express backend
│ ├── models/ # Mongoose models (User, Post, Comment)
│ ├── routes/ # API endpoints
│ └── utils/ # External services (OpenAI, GNews)
│
└── README.md


---

## 📦 Installation

### Prerequisites

- ✅ Node.js v18+
- ✅ MongoDB installed locally or cloud URI (MongoDB Atlas)
- ✅ API keys for:
  - OpenAI
  - GNews
- ✅ `.env` files created in both `/client` and `/server` folders


## Test Credentials
Email: testuser@example.com
Password: Test@123

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trendwise.git
cd trendwise



