# 💼 HR Dashboard

A responsive and feature-rich HR Dashboard built with **Next.js**, **Tailwind CSS**, and **Chart.js**. It helps HR managers track employee performance, bookmark top talent, and gain insights through interactive charts.

---
## 🚀 Live Demo & Preview

🔗 **Deployed App**: [https://hr-matrix-flame.vercel.app](https://hr-matrix-flame.vercel.app)

## 🎥  Demo Video
<a href="https://youtu.be/6EXQbavIgrc" target="_blank">
  <img src="https://img.youtube.com/vi/6EXQbavIgrc/sddefault.jpg" alt="Watch the video" width="600">
</a>



## 🧰 Tech Stack

- **Next.js**
- **Tailwind CSS**
- **Chart.js**
- **Dark/Light Mode Support**
- **Context API for State Management**
- **Reusable Components & Custom Hooks**

---

## ✨ Features

### ✅ Core Functionalities

- **Dark/Light Mode** toggle
- **Responsive Design** (Mobile to Desktop)
- **Form Validations** – On login and user creation
-  **Pagination** Paginated employee list 

### 👩‍💼 Employee Dashboard (`/`)
- Displays employee cards with Name, Email, Age, Department
- Shows performance rating (1–5 stars)
- Action buttons: `View`, `Bookmark`, `Promote`

### 🔎 Search & Filter
- Real-time search by name, email, department
- Filter by department & performance rating

### 👤 Employee Details Page (`/employee/[id]`)
- Tabs: Overview, Projects, Feedback 
- Shows bio, address, phone, history with badges

### 📌 Bookmark Manager (`/bookmarks`)
- Manage all bookmarked employees
- Add or Remove from bookmarks 

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
cd hr-dashboard/Client

# Install dependencies
npm install

# Run the development server
npm run dev
