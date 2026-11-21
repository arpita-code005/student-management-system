# Student Management System 🎓

A secure Full-Stack web application designed to manage students and teachers with Role-Based Access Control (RBAC). Built using Node.js, Express, MongoDB, and Vanilla JavaScript.

## 🚀 Key Features

*   **Authentication & Security:** Secure Login and Register using **JWT (JSON Web Tokens)** and **bcrypt** for password hashing.
*   **Role-Based Access Control (RBAC):**
    *   **Admin (Principal):** Can create and delete Teachers, and view all Students across the system.
    *   **Teacher:** Can only view and manage their own assigned Students. Cannot access Admin routes.
*   **Data Integrity (Unassigned Logic):** If a Teacher is deleted, their assigned Students are not deleted. Instead, they become "Unassigned" (userId set to null) and remain in the system.
*   **Complete CRUD:** Full Create, Read, Update, and Delete functionality for Students and Teachers.
*   **Security Middlewares:** `authMiddleware` (checks login) and `adminOnly` (checks role) protect the backend routes.

## 💻 Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API, DOM Manipulation)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (Mongoose ODM)
*   **Security & Validation:** JWT, bcrypt, Joi

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arpita-code005/student-management-system.git