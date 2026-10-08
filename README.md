
# StayNest 🏡

A full-stack vacation rental & accommodation listing platform inspired by Airbnb. Built with Node.js, Express, MongoDB, and server-rendered EJS templates.

---

## 🌟 Overview

**StayNest** allows travelers to discover, review, and host unique stays around the world. Users can register, list their properties with Cloudinary image uploads, view geolocated properties on a map, and leave ratings and reviews.

---

## ✨ Features

### 🏠 Property Management (Listings)
- **Full CRUD:** Create, read, update, and delete property listings.
- **Image Uploads:** Direct cloud image uploads using **Multer** and **Cloudinary**.
- **Geocoding & Location:** Automatic geocoding using **OpenRouteService / Pelias API** to retrieve latitude & longitude coordinates for interactive maps.
- **Tax / Price Toggle:** Interactive price view toggling taxes and fees.

### ✍️ Reviews & Ratings
- **Star Rating System:** Leave detailed reviews and star ratings for stays.
- **Cascade Deletion:** Automatically cleans up associated reviews when a listing is deleted.
- **Review Authorization:** Only review authors can delete their submitted reviews.

### 🔐 Authentication & Authorization
- **User Authentication:** Secure user signup and login handled with **Passport.js** (`passport-local` & `passport-local-mongoose`).
- **Role & Ownership Protection:** Middleware ensures only the listing owner can edit or delete their property.
- **Session & Flash Messages:** Persistent sessions via **connect-mongo** and contextual user alerts via **connect-flash**.

### 🛡️ Validation & Error Handling
- **Schema Validation:** Robust client and server-side request validation using **Joi**.
- **Async Error Handling:** Centralized async wrappers (`wrapAsync`) and custom `ExpressError` handler.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Backend / Runtime** | Node.js (≥20), Express.js |
| **Database & ODM** | MongoDB Atlas, Mongoose |
| **Templating Engine** | EJS, `ejs-mate` (layouts/partials) |
| **Authentication & Security** | Passport.js, Express Session, Connect-Mongo, Connect-Flash |
| **File Storage & Media** | Cloudinary, `multer-storage-cloudinary`, Multer |
| **Geocoding & Maps** | OpenRouteService (ORS) API / Pelias, Axios |
| **Styling & UI** | Bootstrap 5, FontAwesome, Custom CSS |
| **Validation** | Joi |

---

## 🗄️ Database Models

```
┌───────────────────────────────────────┐
│                User                   │
│───────────────────────────────────────│
│ _id (ObjectId)                        │
│ email (String)                        │
│ username (String) [via passport-local]│
│ hash / salt [via passport-local]      │
└───────────────────┬───────────────────┘
                    │ 1
                    │
                    │ has many
                    ▼ *
┌───────────────────────────────────────┐         ┌───────────────────────────────────┐
│               Listing                 │ 1     * │              Review               │
│───────────────────────────────────────│────────▶│───────────────────────────────────│
│ _id (ObjectId)                        │         │ _id (ObjectId)                    │
│ title (String)                        │         │ comment (String)                  │
│ description (String)                  │         │ rating (Number: 1-5)              │
│ image { url, filename }               │         │ author (Ref -> User)              │
│ price (Number)                        │         │ createdAt (Date)                  │
│ location (String)                     │         └───────────────────────────────────┘
│ country (String)                      │
│ geometry { type, coordinates: [lng,lat]}
│ owner (Ref -> User)                   │
│ reviews [Ref -> Review]               │
└───────────────────────────────────────┘
```

---

## 📁 Project Structure

```
StayNest/
├── app.js               # Express application entry point & middleware setup
├── cloudConfig.js       # Cloudinary & Multer configuration
├── middleware.js        # Auth, ownership, and Joi validation middlewares
├── schema.js            # Joi data validation schemas
├── package.json
│
├── controllers/         # MVC Controllers
│   ├── listings.js      # Listing actions (index, show, create, update, delete)
│   ├── reviews.js       # Review creation and deletion
│   └── users.js         # User registration, login, logout
│
├── models/              # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/              # Express route definitions
│   ├── listing.js       # /listings routes
│   ├── review.js        # /listings/:id/reviews routes
│   └── user.js          # /signup, /login, /logout routes
│
├── utils/               # Utilities & Helpers
│   ├── expressError.js  # Custom error class
│   ├── geocoder.js      # Geocoding via OpenRouteService API
│   └── wrapAsync.js     # Async handler wrapper
│
├── views/               # EJS templates
│   ├── layouts/         # Boilerplate layout (`boilerplate.ejs`)
│   ├── includes/        # Partials (navbar, footer, flash messages)
│   ├── listings/        # Listing pages (index, show, new, edit)
│   ├── users/           # Auth pages (login, signup)
│   └── error.ejs        # Error page
│
├── init/                # Database seed data
│   ├── data.js          # Sample listings
│   └── index.js         # Seed execution script
└── public/              # Static assets (CSS, JS, images)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v20 or higher recommended)
- **MongoDB Atlas** database URI (or local MongoDB server)
- **Cloudinary** account (for media storage)
- **OpenRouteService** API key (for geocoding coordinates)

---

### 1. Clone the Repository

```bash
git clone https://github.com/rahilkm/StayNest.git
cd StayNest
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Variables Configuration

Create a `.env` file in the root directory:

```env
# MongoDB Atlas Connection URI
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/staynest?retryWrites=true&w=majority

# Session Secret
SECRET=your_super_secret_session_key

# Cloudinary Credentials
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# OpenRouteService Geocoding API Key
ORS_API_KEY=your_openrouteservice_api_key

# Port (Optional, defaults to 3000)
PORT=3000
NODE_ENV=development
```

---

### 4. Seed the Database (Optional)

To populate the database with sample property listings:

```bash
node init/index.js
```

---

### 5. Start the Server

```bash
# Start the application
npm start

# Or with nodemon (if installed globally/locally)
npx nodemon app.js
```

Open your browser and navigate to:
```
http://localhost:3000/listings
```

---

## 🛣️ API & Route Endpoints

### 🔑 Authentication Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/signup` | Render signup form | Public |
| `POST` | `/signup` | Register new user | Public |
| `GET` | `/login` | Render login form | Public |
| `POST` | `/login` | Authenticate user | Public |
| `GET` | `/logout` | Terminate session | Authenticated |

### 🏡 Listing Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/listings` | Display all listings (Catalog) | Public |
| `GET` | `/listings/new` | Form to create listing | Authenticated |
| `POST` | `/listings` | Create listing + upload image + geocode | Authenticated |
| `GET` | `/listings/:id` | View listing details & reviews | Public |
| `GET` | `/listings/:id/edit` | Edit listing form | Owner Only |
| `PUT` | `/listings/:id` | Update listing details | Owner Only |
| `DELETE`| `/listings/:id` | Delete listing & associated reviews | Owner Only |

### 💬 Review Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/listings/:id/reviews` | Post a new review & rating | Authenticated |
| `DELETE`| `/listings/:id/reviews/:reviewId`| Delete a specific review | Review Author Only |

---

## 📜 License
MIT
