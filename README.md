# 🛡️ JobForge - Production-Ready Job Portal Platform

JobForge is a highly responsive, modern, production-grade Job Portal Platform designed to connect candidates with their dream careers while enabling administrators to manage directories, moderate postings, and oversee applications.

The platform is structured into three discrete sub-applications:
1. **`backend`**: Node.js & Express REST API powered by Knex.js query builder and PostgreSQL.
2. **`frontend`**: Responsive React SPA tailored for Job Candidates (Browse Jobs, Apply with PDF upload, Track applications, Light/Dark Mode toggle).
3. **`admin-panel`**: Premium React dashboard tailored for system administrators to moderate and manage corporate partners, publish listings, edit records, and audit applications.

---

## 🏗️ Architecture & Tech Stack

### Database Layer
- **PostgreSQL**: Robust relational persistence layer.
- **Knex.js**: SQL query builder managing database schemas, seeds, and transactional operations.

### Backend Application (`backend/`)
- **Runtime**: Node.js + Express.js
- **JWT Authentication**: Double token (Access / Refresh) silent-refresh auth model.
- **Security**: `helmet` headers, `express-rate-limit` DDoS prevention, `bcryptjs` password hashing.
- **Storage**: `multer` handling secure resume document and corporate logo uploads.

### Candidate Portal (`frontend/`)
- **Framework**: React.js + Vite
- **Routing**: React Router DOM (Gated candidate routes)
- **State**: React Context API (`AuthContext`, `ThemeContext`, `ToastContext`, `JobsContext`)
- **Aesthetics**: Premium Vanilla CSS3 (Custom transitions, dark mode variables, fully fluid and responsive layouts).

### Admin Dashboard (`admin-panel/`)
- **Framework**: React.js + Vite
- **Security Gating**: Admin role authentication guard.
- **State**: React Context API (`AdminAuthContext` with automatic Axios authorization interceptors).
- **Aesthetics**: Sleek glassmorphism variables, stats dashboards, responsive modals, live status pipeline indicators.

---

## 📁 Repository Directory Structure

```text
Job_Portal/
│
├── backend/                # Express API Backend & Database configurations
│   ├── database/           # Database Layer configurations
│   │   ├── migrations/     # PostgreSQL schema tables
│   │   └── seeds/          # Seed scripts (100 jobs, 20 companies, admin, etc.)
│   ├── knexfile.js         # Knex config details
│   ├── public/uploads/     # Multer storage folders for logos/resumes
│   └── src/
│       ├── config/         # DB connection client
│       ├── controllers/    # Request controllers
│       ├── middleware/     # JWT Auth, rate-limiter, upload filters
│       ├── routes/         # Express API routers
│       └── app.js          # App initialization
│
├── frontend/               # Candidate Portal (React + CSS3)
│   └── src/
│       ├── components/     # Navbars, Protective routing, skeletons
│       ├── context/        # Globals context (Auth, Theme, Jobs, Toast)
│       ├── pages/          # Home, Details, Job listings, Profile dashboard
│       └── styles/         # Premium CSS assets
│
└── admin-panel/            # Administrative Portal (React + CSS3)
    └── src/
        ├── components/     # Layout, Sidebar, Topbar, Auth guards
        ├── context/        # AdminAuth, Theme, Toast Context
        ├── pages/          # Analytics, Jobs, Companies, Users, Applications
        └── styles/         # Glassmorphism variable grids
```

---

## 🔑 Default Credentials (Seeded)

The database seed populates the platform with comprehensive data including 20 companies, 100 jobs, and the following accounts:

### 🛡️ Administrator Login (Admin Console)
- **Portal Link**: `http://localhost:3001/login`
- **Email**: `admin@jobportal.com`
- **Password**: `AdminPassword123`

### 💼 Candidate Login (Candidate Portal)
- **Portal Link**: `http://localhost:3000/login`
- **Email**: `amit.sharma@gmail.com`
- **Password**: `Password123`

*(Other preloaded candidate accounts: `priya.patel@yahoo.com`, `rahul.verma@outlook.com`, `anjali.nair@gmail.com`, `vikram.singh@gmail.com` — all using password `Password123`)*

---

## 🚀 Setup & Launch Instructions

Follow these steps to deploy and run the database and the three applications locally:

### Step 1: Database Setup
1. Verify PostgreSQL is active on your host.
2. Create a new database named `job_portal`.
3. In `backend/.env` (or configure via environment variables), specify your PostgreSQL credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=127.0.0.1
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=job_portal
   JWT_ACCESS_SECRET=your_super_secret_access_key
   JWT_REFRESH_SECRET=your_super_secret_refresh_key
   ```

### Step 2: Install Dependencies & Run Database migrations
Navigate to the root and install required packages in the respective workspaces:

```bash
# Install backend and database dependencies
cd backend
npm install

# Run SQL schema migrations
npm run db:migrate

# Populate data seeds (20 companies, 100 jobs, 30 skills, 18 applications)
npm run db:seed
```

### Step 3: Run the REST API Backend
Within the `backend/` directory, launch the API:
```bash
# Runs the API on http://localhost:5000
npm run dev
```

### Step 4: Launch the Candidate Portal
Open a new terminal window, navigate to `frontend/` and launch the React Vite dev server:
```bash
cd frontend
npm install
# Starts the Candidate Portal on http://localhost:3000
npm run dev
```

### Step 5: Launch the Admin Dashboard
Open a new terminal window, navigate to `admin-panel/` and launch the React Vite dev server:
```bash
cd admin-panel
npm install
# Starts the Admin Console on http://localhost:3001
npm run dev
```

---

## 🛠️ Verification Checklist

- [x] **Relational Schema Integrity**: knex migrations creating `users`, `companies`, `jobs`, `applications`, `skills`, and `job_skills` with proper foreign key cascades.
- [x] **Secure JWT Verification**: Strict validation on cookies/headers, custom access refresh silent handling.
- [x] **Secure Uploads**: Logo images and PDF resume uploads checked for MIME sizes and sanitized filenames.
- [x] **Double Portal Separation**: Individual React dev servers isolating recruiters and job seekers cleanly.
- [x] **Dynamic Search & Pagination**: Live query filtering and server-side page breakdowns on listings.
- [x] **Administrative Powers**: Complete company CRUD, job creation/tagging, applicant pipeline transitions, and user directory auditing.
