# 💼 Mini HR Performance Dashboard

A fully responsive and interactive HR dashboard built with **Next.js**, **Tailwind CSS**, and **JavaScript**. It helps HR managers to search, analyze, and manage employee performance — complete with bookmarks, analytics, and more!

---

## 🚀 Live Demo

🔗 **Deployed Link**: [https://hr-matrix-flame.vercel.app/login](https://hr-matrix-flame.vercel.app/login)  
🎥 **Screen Recording**: [https://youtu.be/6EXQbavIgrc](https://youtu.be/6EXQbavIgrc)

---

## 🧰 Tech Stack

- ✅ **Next.js**
- 🎨 **Tailwind CSS** for styling
- 🧠 **Context API** 
- 📈 **Chart.js** for data visualization
- 🌑 **Dark/Light Mode**
- 🛠 **Reusable Components & Custom Hooks**

---

## ✨ Features

### 🏠 Dashboard Homepage (`/`)
- Displays list of users, each user card shows:
  - Full Name, Email, Age, Department
  - Performance Rating (1–5 stars)
  - `View`, `Bookmark`, and `Promote` buttons

### 🔍 Search & Filter
- Search users by name, email, or department 
- Filter using dropdown by:
  - Department
  - Rating

### 👤 User Details Page (`/employee/[id]`)
- Dynamic route for each employee
- Tabs: `Overview`, `Projects`, `Feedback`
- Shows:
  - Address, Phone, Bio
  - Performance history
  - Color-coded badges

### 📌 Bookmark Manager (`/bookmarks`)
- Displays all bookmarked employees
- Allows:
  - Remove from bookmark
  - UI actions like "Promote" 

### 📊 Analytics Page (`/analytics`)
- Visualize:
  - Average rating by department
  - Bookmark trends
- Built using **Chart.js**

### 🧑‍💼 Create User Page (`/create-user`)
- Form to create a new user with basic validation

---

## 🧪 Getting Started (Run Commands)

### ⚙️ Prerequisites
- Node.js 18+
- npm or yarn

---

### 📦 Install Dependencies

```bash
npm install
# or
yarn install

### 📦 Run the development server
npm run dev
# or
yarn dev

