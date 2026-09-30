# Real-Time Monolithic Chat Application

A high-performance, scalable real-time chat application engineered with the **MERN Stack**, **Monolithic Architecture**, **Redis**, **Socket.IO**, and **Next.js**.

---

## 🌟 Key Features

- **Monolithic Backend Architecture**:
    - Unified **Node.js & Express** backend server managing Authentication, JWT, User Directory, Chat REST APIs, and Socket.IO WebSockets in a single cohesive codebase.
    - Simplified deployment, single-port communication, and zero network latency between internal service modules.

- **Real-Time Communication (Socket.IO)**:
    - Instant one-on-one messaging via WebSockets.
    - Real-time user online/offline status detection.
    - Live typing & stopped-typing indicators.
    - Real-time unseen message count and double-tick message read receipts.

- **Caching & Performance (Redis)**:
    - Caching user active statuses and session states for high-concurrency performance.
    - API rate-limiting protection.

- **Modern Frontend (Next.js & Tailwind CSS)**:
    - Responsive, dark-themed UI built with **TypeScript**, **Next.js (App Router)**, and **Tailwind CSS**.
    - Dynamic chat sidebar with user searching, active chat filtering, and instant conversation launcher.
    - File and image attachment uploads via **Cloudinary**.

- **DevOps & Production Ready**:
    - Simple deployment pipeline.
    - AWS EC2 deployment ready with **PM2** process manager.

---

## 🛠 Tech Stack

### **Frontend**

- **Framework**: Next.js (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **State & Networking**: React Context API, Axios, `socket.io-client`, `js-cookie`, `react-hot-toast`

### **Backend (Monolith)**

- **Runtime & Language**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (Mongoose ORM)
- **Caching & Rate Limiting**: Redis
- **Real-Time Engine**: Socket.IO
- **Media Hosting**: Cloudinary

### **Infrastructure & Deployment**

- **Process Manager**: PM2
- **Cloud Infrastructure**: AWS EC2 (Ubuntu)

---

## 🏗 System Architecture

```
                       +-------------------+
                       | Next.js Frontend  |
                       +---------+---------+
                                 |
                     (HTTP / REST & WebSockets)
                                 |
                                 v
                     +-----------------------+
                     |  Monolithic Backend   |
                     |  (Node.js / Express)  |
                     |     (Port 5000)       |
                     +---+---------------+---+
                         |               |
                         v               v
                 +---------------+---------------+
                 |    MongoDB    |     Redis     |
                 |  (Database)   |   (Caching)   |
                 +---------------+---------------+
```

---

## 📁 Repository Structure

```text
├── backend/                  # Monolithic Express Backend
│   ├── src/
│   │   ├── controllers/      # Auth, User & Message Controllers
│   │   ├── models/           # Mongoose Models (User, Chat, Message)
│   │   ├── routes/           # REST API Routes
│   │   ├── socket/           # Socket.IO Connection & Event Handlers
│   │   └── index.ts          # Express Server Entry Point
├── frontend/                 # Next.js App Router, Context Providers, Chat UI
└── README.md
```

---

## ⚙️ Environment Variables

### **Backend (`backend/.env`)**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REDIS_URL=your_redis_connection_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **Frontend (`frontend/.env.local`)**

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** (v18+ recommended)
- **MongoDB Atlas** or local MongoDB instance
- **Upstash Redis** or local Redis server

---

### **1. Setup and Run Backend Server**

```bash
cd backend
npm install
npm run build
npm run dev
```

---

### **2. Setup and Run Frontend**

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
