# 🕒 Time-Track-AI — AI-Powered Daily Time Tracking Dashboard

A web application that helps users log daily activities, track how their 24 hours are spent, and visualize insights through interactive analytics. Built using React, Firebase, and AI-assisted tools.

---

## 🔗 1. Live Demo (Deployed Link)
👉 **[https://bindushabavurupudi.github.io/Time-Track-AI/](https://bindushabavurupudi.github.io/Time-Track-AI/)**

---

## 📁 2. GitHub Repository
👉 **[https://github.com/bindushabavurupudi/Time-Track-AI](https://github.com/bindushabavurupudi/Time-Track-AI)**

---

## 🎥 3. Video Walkthrough Link
👉 **[Video Walkthrough Coming Soon](#)**  

**Your video must include:**
- Login / Signup  
- Adding activities  
- Remaining minutes logic  
- Dashboard view  
- “No Data Available” state  
- Analytics page  
- How AI tools helped in development  

---

## 📝 4. Project Description

Time-Track-AI is a smart daily time tracker where users can log activities with their duration, stay within the 1440-minute daily limit, and view insights such as:

- Category-based time usage  
- Activity duration comparisons  
- Total minutes spent  
- Number of activities logged  

This project was built using modern tools and powerful AI assistance to speed up development, improve design, and enhance user experience.

---

## 🤖 5. How AI Was Used in Development

### **Lovable AI**
- Generated UI screens  
- Created component structure  
- Helped design clean & responsive layout  

### **ChatGPT**
- Debugged routing & Firebase errors  
- Guided GitHub Pages deployment  
- Completed logic for adding/editing/deleting activities  
- Implemented Vite config and Router basename logic  
- Enhanced UI/UX and animations  

AI significantly reduced development time and improved the quality of the final product.

---

## 🛠️ 6. Tech Stack

### **Frontend**
- React + TypeScript  
- Vite  
- TailwindCSS  
- ShadCN UI  
- Recharts (for charts)

### **Backend**
- Firebase Authentication  
- Firebase Firestore  

### **Deployment**
- GitHub Pages (Vite → docs folder)

---

## ✨ 7. Features

### 🔐 Authentication
- Email/Password Login  
- Google Login  
- Protected Routes  
- Unauthorized users redirected automatically  

### 📝 Activity Tracking
- Add, Edit, and Delete activities  
- Category selection  
- Duration input in minutes  
- Enforces max **1440 minutes/day**  
- Shows remaining minutes dynamically  

### 📊 Analytics Dashboard
- Date-based insights  
- Pie Chart → Category breakdown  
- Bar Chart → Activity durations  
- Summary statistics:
  - Total minutes logged  
  - Number of activities  
  - Category distribution  

### 🎨 UI / UX
- Glassmorphism design  
- Smooth animations  
- Dark theme  
- Fully responsive layout  
- Beautiful “No Data Available” empty state  

---

## 💻 8. How to Run the Project Locally

### **Step 1 — Clone the Repository**
git clone https://github.com/bindushabavurupudi/Time-Track-AI
cd Time-Track-AI
### **Step 2 — Install Dependencies**
npm install
### **Step 3 — Add Firebase Configuration**

Create a .env file:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

⚠️ Make sure you also add
bindushabavurupudi.github.io
to Authorized Domains in Firebase Authentication.
### **Step 4 — Start the Development Server**
npm run dev

Your app will run at:
👉 **[http://localhost:8080/](http://localhost:8080/)**

### **Step 5 — Build for Deployment**
npm run build
This creates the docs/ folder used by GitHub Pages.

---
## 🖼️ 9. Screenshots (Recommended)

Add screenshots here after taking them:

- ![Home Screen](./screenshots/home.png)
- ![Dashboard](./screenshots/dashboard.png)
- ![Analytics Page](./screenshots/analytics.png)
- ![No Data Screen](./screenshots/no-data.png)
---
## 🔮 10. Future Improvements

- Weekly & Monthly analytics
- Export to CSV/PDF
- Voice-based activity logging
- AI suggestions for productivity optimization
- Activity reminders / notifications
