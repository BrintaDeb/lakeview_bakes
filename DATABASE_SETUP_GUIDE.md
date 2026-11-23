# Lakeview Milk Bar — Database Setup & Deployment Guide

This application includes a flexible **Modular Database Layer** (`src/lib/db.ts`). It operates out-of-the-box locally with an atomic persistent JSON store (`src/data/db/`), and is pre-architected to connect to **MongoDB Atlas** or **Hostinger MySQL / PostgreSQL** whenever you deploy.

---

## Option 1: Running with MongoDB (e.g. MongoDB Atlas / Self-Hosted)

### Step 1: Create a MongoDB Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free Tier available).
2. Create a cluster and database named `lakeview_db`.
3. Create a database user and whitelist `0.0.0.0/0` (or your host IP).
4. Copy the connection string:
   ```env
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/lakeview_db?retryWrites=true&w=majority
   ```

### Step 2: Add Environment Variable
Add the connection string to your `.env` or `.env.local`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/lakeview_db?retryWrites=true&w=majority
```

---

## Option 2: Deploying to Hostinger (MySQL / cPanel / VPS)

### Step 1: Import the MySQL Schema
1. Open your **Hostinger hPanel** or **cPanel**.
2. Go to **Databases** → **phpMyAdmin**.
3. Create a database named `lakeview_db`.
4. Click **Import** and choose [`database_schema.sql`](file:///c:/Users/Shreyam/Downloads/Lakeview/database_schema.sql).
5. Click **Go** to execute. This creates all tables:
   - `users`: Patron profiles & phone numbers
   - `orders`: All cake and sundae orders
   - `order_items`: Item breakdown, weights, eggless recipes, and piped cake inscriptions
   - `user_addresses`: Saved delivery addresses
   - `user_vehicles`: Saved car-hop vehicle number plates

### Step 2: Configure Environment Variables on Hostinger
In your Next.js application settings on Hostinger:
```env
DB_HOST=localhost
DB_USER=u123456789_lakeview
DB_PASSWORD=YourStrongPasswordHere
DB_NAME=u123456789_lakeview_db
DB_PORT=3306
```

---

## Option 3: Local Zero-Setup Mode (Default)
When neither `MONGODB_URI` nor `DB_HOST` are set, the app automatically persists all users and orders into:
- `src/data/db/users.json`
- `src/data/db/orders.json`

This ensures that development, demos, and local testing work **100% reliably with zero configuration**.

---

## Phone Authentication & OTP Testing
- **Test Mobile Number:** Any 10-digit Indian number (e.g., `9876543210`)
- **Universal OTP Code:** `1930` (A tribute to Lakeview Milk Bar's founding year)
- When prompted, the verification code is pre-filled on the screen for instant frictionless testing.
