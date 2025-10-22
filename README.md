# 🚚 Invoice Management System - Hauling Invoice Management

> A full-stack web application for managing hauling invoices, built with React, Node.js, Express, and MongoDB. Optimized for iPad use with PDF generation capabilities.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://invoice-system-virid.vercel.app)
[![Backend API](https://img.shields.io/badge/API-live-blue.svg)](https://invoice-system-backend.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

![Invoice System Dashboard](Screenshots/dashboard.png)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

Invoice System is a modern web application designed specifically for L.S. Haulage to streamline the creation and management of hauling invoices. The application features an intuitive interface optimized for iPad use, allowing drivers to create invoices on-the-go with automatic rate calculations and professional PDF generation.

### Problem Statement

Traditional paper-based invoicing was time-consuming, prone to calculation errors, and difficult to track. Drivers needed a mobile-friendly solution to create invoices directly from job sites.

### Solution

A responsive web application with:

- Real-time invoice creation and management
- Automatic rate calculation based on haul routes
- One-click PDF generation
- Cloud-based storage for easy access anywhere
- iPad-optimized interface for field use

---

## ✨ Features

### Core Functionality

- 📄 **Invoice Management**: Create, edit, and view invoices with automatic numbering
- 📊 **Entry Tracking**: Add multiple entries per invoice with date, ticket number, and route details
- 💰 **Automatic Calculations**: Real-time calculation of weights, rates, and totals with 7% fee deduction
- 📍 **Route Management**: Pre-configured haul-from and haul-to locations with associated rates
- 🔍 **Smart Rate Lookup**: Automatic rate population based on selected route
- 🗑️ **Entry Management**: Delete individual entries with confirmation
- 📱 **Responsive Design**: Optimized for iPad and desktop use

### PDF Generation

- 📑 Professional invoice PDF generation with company branding
- 📋 Detailed table of all entries with formatting
- 💵 Automatic subtotal, fee, and total calculations
- 📥 One-click download to device

### User Experience

- 🎨 Clean, modern UI with Tailwind CSS
- ⚡ Fast, responsive interface
- 🔄 Real-time data updates
- ✅ Form validation and error handling
- 🎯 Intuitive navigation

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling
- **jsPDF** - PDF generation
- **jsPDF-AutoTable** - PDF table formatting

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment & DevOps

- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **Git & GitHub** - Version control
- **GitHub Actions** - CI/CD (future)

### Development Tools

- **VS Code** - Code editor
- **Postman** - API testing
- **Git** - Version control
- **npm** - Package management

---

## 📸 Screenshots

### Dashboard

![Dashboard View](Screenshots/dashboard.png)
_Main dashboard showing all invoices with quick navigation_

### Invoice Creation

![Create Invoice](Screenshots/create-invoice_blank.png)
_Invoice creation form with entry management_

### Invoice Form

![Invoice Form](Screenshots/create_invoice_with_entries.png)
_Detailed invoice with entries and calculations_

### PDF Generation

![PDF Preview](Screenshots/pdf-preview.png)
_Professional PDF invoice output_

### Mobile View (iPad)

![iPad View](screenshots/ipad-view.png)
_Responsive design optimized for iPad_

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local) or **MongoDB Atlas** account
- **Git**

### Quick Start

```bash
# Clone the repository
git clone https://github.com/gurpinders/invoice-system.git

# Navigate to project directory
cd invoice-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 📦 Installation

### Backend Setup

1. **Navigate to backend folder:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```bash
touch .env
```

4. **Add environment variables** (see [Environment Variables](#environment-variables))

5. **Start the backend server:**

```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend folder:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```bash
touch .env
```

4. **Add environment variables** (see [Environment Variables](#environment-variables))

5. **Start the development server:**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend `.env`

Create a `.env` file in the `backend` folder:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/invoiceDB?retryWrites=true&w=majority

# Server Port
PORT=3001

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Node Environment
NODE_ENV=development
```

### Frontend `.env`

Create a `.env` file in the `frontend` folder:

```env
# Backend API URL
VITE_API_URL=http://localhost:3001
```

### Production Environment Variables

**Render (Backend):**

- `MONGODB_URI`: Your MongoDB Atlas connection string
- `FRONTEND_URL`: Your Vercel deployment URL
- `NODE_ENV`: production

**Vercel (Frontend):**

- `VITE_API_URL`: Your Render backend URL

---

## 💻 Usage

### Creating an Invoice

1. Click **"Create New Invoice"** button on the dashboard
2. Enter an **Invoice Number** (e.g., "Jan 1-15, 2025")
3. Click **"Create Invoice"** button
4. The form will activate for adding entries

### Adding Entries

1. Select a **Date** for the entry
2. Enter a **Ticket Number**
3. Select **Haul From** location (dropdown)
4. Select **Haul To** location (dropdown)
5. Rate auto-populates based on route
6. Enter **Weight** (in tonnes)
7. Click **"Add Entry"** button

### Generating PDF

1. After adding entries, scroll to the **Invoice Totals** section
2. Click **"Generate PDF"** button
3. PDF will automatically download with format: `Invoice_[InvoiceNumber].pdf`

### Managing Invoices

- **View All Invoices**: Click on dashboard cards
- **Edit Invoice**: Click on any invoice card to add more entries
- **Delete Entry**: Click "Delete" button on any entry row

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:3001
Production: https://invoice-system-backend.onrender.com
```

### Endpoints

#### Invoices

**Get All Invoices**

```http
GET /api/invoices
```

**Get Single Invoice**

```http
GET /api/invoices/:id
```

**Create Invoice**

```http
POST /api/invoices
Content-Type: application/json

{
  "invoiceNumber": "Jan 1-15, 2025"
}
```

**Add Entry to Invoice**

```http
POST /api/invoices/:id/entries
Content-Type: application/json

{
  "date": "2025-01-15",
  "ticket": "12345",
  "haulFrom": "Dufferin Quarry",
  "haulTo": "Kennedy Caledon",
  "weight": 18.5,
  "ratePerTonne": 12.50
}
```

**Delete Entry**

```http
DELETE /api/invoices/:invoiceId/entries/:entryId
```

#### Locations

**Get Haul From Locations**

```http
GET /api/locations/from
```

**Get Haul To Locations**

```http
GET /api/locations/to
```

#### Rates

**Search Rate by Route**

```http
GET /api/rates/search?haulFrom=Dufferin Quarry&haulTo=Kennedy Caledon
```

---

## 🚀 Deployment

### Prerequisites for Deployment

- MongoDB Atlas account (free tier)
- Render account (free tier)
- Vercel account (free)
- GitHub repository

### Deploy Backend to Render

1. **Create Web Service** on Render
2. **Connect GitHub** repository
3. **Configure Build Settings:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add Environment Variables:**
   - `MONGODB_URI`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
5. **Deploy**

### Deploy Frontend to Vercel

1. **Import Project** from GitHub
2. **Configure Settings:**
   - Root Directory: `frontend`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Add Environment Variable:**
   - `VITE_API_URL`: Your Render backend URL
4. **Deploy**

### Post-Deployment

1. Update backend CORS with Vercel URL
2. Test all functionality on production
3. Verify MongoDB Atlas IP whitelist (0.0.0.0/0)

---

## 📁 Project Structure

```
invoice-system/
├── backend/
│   ├── models/
│   │   ├── Invoice.js          # Invoice schema
│   │   ├── Rate.js             # Rate schema
│   │   └── Location.js         # Location schema (if applicable)
│   ├── routes/
│   │   ├── invoices.js         # Invoice routes
│   │   ├── locations.js        # Location routes
│   │   └── rates.js            # Rate routes
│   ├── server.js               # Main server file
│   ├── package.json            # Backend dependencies
│   └── .env                    # Environment variables (not in git)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx   # Main dashboard component
│   │   │   └── InvoiceForm.jsx # Invoice creation/edit form
│   │   ├── App.jsx             # Root component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── public/
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   └── .env                    # Environment variables (not in git)
│
├── screenshots/                # Project screenshots
├── README.md                   # This file
├── DEPLOYMENT_GUIDE.md         # Detailed deployment instructions
├── .gitignore                  # Git ignore rules
└── LICENSE                     # MIT License
```

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **User Authentication**: Multi-user support with login/logout
- [ ] **Role-Based Access**: Admin, driver, and viewer roles
- [ ] **Multiple Drivers**: Support for multiple drivers and trucks
- [ ] **Email Integration**: Send PDF invoices via email
- [ ] **Search & Filter**: Search invoices by date, number, or amount
- [ ] **Data Export**: Export to CSV/Excel
- [ ] **Analytics Dashboard**: Revenue tracking and statistics
- [ ] **Invoice Templates**: Customizable invoice layouts
- [ ] **Payment Tracking**: Mark invoices as paid/unpaid
- [ ] **Mobile App**: Native iOS/Android apps
- [ ] **Offline Support**: PWA with offline capabilities
- [ ] **Notifications**: Email/SMS reminders for pending invoices
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Multi-currency**: Support for different currencies
- [ ] **Recurring Invoices**: Automated invoice generation

### Technical Improvements

- [ ] Add comprehensive testing (Jest, React Testing Library)
- [ ] Implement Redux for state management
- [ ] Add TypeScript for type safety
- [ ] Set up CI/CD pipeline with GitHub Actions
- [ ] Add error logging (Sentry)
- [ ] Implement rate limiting on API
- [ ] Add API documentation (Swagger)
- [ ] Database backups automation
- [ ] Performance optimization
- [ ] Accessibility improvements (WCAG compliance)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Contact

**Gurpinder Singh**

- GitHub: [@gurpinders](https://github.com/gurpinders)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: psandhu0124@gmail.com
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

**Project Link:** [https://github.com/gurpinders/invoice-system](https://github.com/gurpinders/invoice-system)

**Live Demo:** [https://invoice-system-virid.vercel.app](https://invoice-system-virid.vercel.app)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [jsPDF](https://github.com/parallax/jsPDF)
- [Vercel](https://vercel.com)
- [Render](https://render.com)

---

## 📊 Project Stats

- **Lines of Code:** ~2,500+
- **Components:** 2 main React components
- **API Endpoints:** 7 RESTful endpoints
- **Database Collections:** 3 (Invoices, Rates, Locations)
- **Dependencies:** 20+ npm packages
- **Development Time:** 2 weeks
- **Status:** Production Ready ✅

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made by Gurpinderjeet Sandhu

</div>
