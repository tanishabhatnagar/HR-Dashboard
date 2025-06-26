# 💼 HR Dashboard

A responsive and feature-rich HR Dashboard built with **Next.js App Router**, **Tailwind CSS**, and **Chart.js**. It helps HR managers track employee performance, bookmark top talent, and gain insights through interactive charts.

---
## 🚀 Live Demo & Preview

🔗 **Deployed App**: [https://hr-matrix-flame.vercel.app](https://hr-matrix-flame.vercel.app)

🎥 **Screen Recording**: [![Watch the video](https://www.youtube.com/watch?v=6EXQbavIgrc)](https://www.youtube.com/watch?v=6EXQbavIgrcZ)


## 🧰 Tech Stack

- **Next.js**
- **Tailwind CSS**
- **Chart.js**
- **Cookie-based Login Authentication**
- **Dark/Light Mode Support**
- **Context API for State Management**
- **Reusable Components & Custom Hooks**

---

## ✨ Features

### ✅ Core Functionalities

- **Login System** – Basic cookie-based authentication
- **Dark/Light Mode** toggle
- **Responsive Design** (Mobile to Desktop)
- **Form Validations** – On login and user creation
-  **Pagination** Paginated employee list (mocked logic or custom hook)

### 👩‍💼 Employee Dashboard (`/`)
- Displays employee cards with Name, Email, Age, Department
- Shows performance rating (1–5 stars)
- Action buttons: `View`, `Bookmark`, `Promote`

### 🔎 Search & Filter
- Real-time search by name, email, department
- Filter by department & performance rating

### 👤 Employee Details Page (`/employee/[id]`)
- Tabs: Overview, Projects, Feedback (mocked)
- Shows bio, address, phone, history with badges

### 📌 Bookmark Manager (`/bookmarks`)
- Manage all bookmarked employees
- Remove from bookmarks or trigger UI actions

### 📊 Analytics Dashboard (`/analytics`)
- Charts showing:
  - Average department-wise ratings
  - Bookmark trends
- Built with **Chart.js**

### 🧑‍💼 Create User Page (`/create-user`)
- Add new employees via form
- Form includes validations



---

## 📦 Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev
