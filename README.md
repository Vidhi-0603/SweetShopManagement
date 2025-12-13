# 🍬 Sweet Shop Management System

A full‑stack **Sweet Shop Management System** built as part of a kata to demonstrate backend API development, frontend SPA design, database usage, authentication, and **Test‑Driven Development (TDD)** practices.

This project is intentionally developed using **tests first**, with a clear Red‑Green‑Refactor workflow reflected in the Git commit history.

---

## 📁 Project Structure

```
SWEETSHOPMANAGEMENT/
│
├── Backend/        # REST API (Node.js + Express)
│   ├── src/
│   ├── tests/
│   ├── jest.config.js
│   └── package.json
│
├── Frontend/       # Single Page Application (Vite + React)
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md       # Root documentation
```

---

## 🎯 Project Goals

- Design and build a **secure RESTful backend API**
- Implement **user authentication** using JWT
- Manage sweets inventory with purchase and restock functionality
- Build a **modern frontend SPA** to consume the API
- Follow **Test‑Driven Development (TDD)** principles
- Maintain a **clean, professional Git commit history**

---

## 🧠 Tech Stack

### Backend
- Node.js
- Express
- JavaScript
- Jest + Supertest (Testing)
- Database: (to be added)

### Frontend
- React
- Vite
- Tailwind CSS

---

## 🔐 Core Features

### Authentication
- User registration
- User login
- JWT‑based protected routes

### Sweets Management
- Add, view, update, delete sweets
- Search sweets by name, category, or price range
- Role‑based access (Admin / User)

### Inventory
- Purchase sweets (decreases quantity)
- Restock sweets (Admin only)

---

## 🧪 Testing & TDD Approach

This project follows **Test‑Driven Development (TDD)**:

1. **Red** – Write failing tests
2. **Green** – Implement minimum code to pass tests
3. **Refactor** – Improve code while keeping tests passing

The Git commit history clearly reflects this workflow using small, intentional commits.

### Run Backend Tests

```bash
cd Backend
npm test
```

### Run Coverage Report

```bash
npm run test:coverage
```

Coverage reports are generated locally and excluded from version control.

---

## 🚀 Getting Started (Development)

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 📌 Notes

- Environment variables (`.env`) are not committed
- `node_modules`, build outputs, and test reports are ignored via `.gitignore`
- Frontend and Backend are developed independently but integrated via API

---

## 📄 License

This project is created for learning and assessment purposes.

---

✅ *This README will evolve as features are implemented.*