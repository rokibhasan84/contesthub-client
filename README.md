# CompeteZone – Online Contest Platform

# Project Name
  CompeteZone
# Project Description
CompeteZone is a full-stack MERN based web application where users can participate in different types of contests such as image design, article writing, and video editing.
The platform supports multiple user roles (User, Creator, Admin) with role-based dashboards and permissions.
Creators can create contests, users can participate by submitting their work, and admins can approve contests and manage users.

🚀 Live Features
🌐 Public Features

Browse all approved contests
Search contests by contest type
View contest details
Responsive design for mobile, tablet & desktop
Light / Dark theme toggle.

👤 User Features
Firebase Authentication (Email/Password & Google)
Participate in contests
Submit contest work (submission link)
View participated contests
Profile management.

✍️ Creator Features
Add new contests
View own contests
View all submissions for own contests
Contest submission tracking.

🛡️ Admin Features
Admin dashboard
Approve / Reject contests
Manage users (assign roles)
Manage all contests
Delete contests

🧩 Role System
Role
Permissions
User
Participate in contests
Creator
Create contests, view submissions
Admin
Approve contests, manage users & contests

🏗️ Tech Stack
Frontend
React
React Router
Tailwind CSS
DaisyUI
Axios
Firebase Authentication
Framer Motion
Backend
Node.js
Express.js
MongoDB (Atlas)
Mongoose
JWT Authentication

🔐 Authentication & Authorization
Firebase handles authentication
JWT is generated after login
JWT is verified on protected backend routes
Role-based route protection (Admin / Creator)

📦 Contest Data Structure
Copy code
Js
{
  name,
  image,
  description,
  type,
  fee,
  prize,
  deadline,
  creatorEmail,
  status,
  submissions: [],
  winner
}

📤 Submission System
Submissions are stored inside contest document
No separate submissions collection
Each user can submit only once per contest

🔑 Environment Variables
Client
Copy code

VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=xxxx
Server
Copy code

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

# How to Run Locally
Backend
Copy code
Bash
npm install
npm run dev
Frontend
Copy code
Bash
npm install
npm run dev

# 📱 Responsive Design
Mobile-first layout
Dashboard sidebar collapses on mobile
Fully responsive navbar and dashboard
🎯 Assignment Requirements Fulfilled
✔ Authentication
✔ Role based dashboard
✔ Contest CRUD
✔ Contest participation
✔ Admin approval system
✔ Responsive UI
✔ Clean code structure

👨‍💻 Author
[MD ROKIB HASAN]
Batch: Assignment-11
















# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
