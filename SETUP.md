# Local SEO Services - Setup Guide

## Overview

Your React + Tailwind CSS application with Supabase backend is ready! This guide will help you get started.

## Database Setup

The database has been configured with two tables:

### 1. Leads Table
- Stores all contact form submissions from your website
- Includes fields: name, email, phone, company, message, service_interest, source, status
- Automatically tracks created_at and updated_at timestamps

### 2. Profiles Table
- Extends Supabase's built-in auth.users table
- Tracks which users are admins
- Automatically creates a profile when a user signs up

## Creating Your First Admin User

**IMPORTANT: The login system has been simplified for easy setup!**

All authenticated users now have admin access by default, so you can create an account and immediately access the dashboard.

### Quick Start (2 Minutes)

1. **Visit the login page**: http://localhost:3000/login
2. **Click "Don't have an account? Create one"**
3. **Fill in the form**:
   - Your email address
   - A password (minimum 6 characters)
4. **Click "Create Account"** - your account will be created instantly!
5. **Sign in** with your email and password
6. **Access the admin dashboard** at http://localhost:3000/admin

That's it! You're ready to start using the application.

### How Authentication Works

- **Sign Up**: Creates a new user account with Supabase Auth (no email confirmation needed)
- **Auto Admin**: All authenticated users are treated as admins by default
- **Profile Creation**: A profile is automatically created via database trigger when you sign up
- **Protected Routes**: Only authenticated users can access /admin

### Restricting Admin Access Later (Optional)

If you want to restrict admin access to specific users later, follow these steps:

**Step 1:** Update specific users to be admins via SQL:
```sql
-- Make a specific user an admin
UPDATE profiles SET is_admin = true WHERE email = 'admin@example.com';

-- Remove admin access from a user
UPDATE profiles SET is_admin = false WHERE email = 'regular-user@example.com';
```

**Step 2:** Update the auth logic in `src/contexts/AuthContext.jsx` line 97:

Change from:
```javascript
isAdmin: user ? (profile?.is_admin !== false) : false,
```

To:
```javascript
isAdmin: profile?.is_admin || false,
```

This will make the system check the `is_admin` flag strictly instead of allowing all users.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   └── ProtectedRoute.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── lib/               # Libraries and utilities
│   └── supabaseClient.js
├── pages/             # Page components
│   ├── AboutPage.jsx
│   ├── AdminDashboard.jsx
│   ├── ContactPage.jsx
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── ServicesPage.jsx
├── App.jsx            # Main app with routing
├── main.jsx          # Entry point
└── index.css         # Global styles with Tailwind
```

## Features

### Public Features
- **Homepage**: Hero section, services overview, and CTAs
- **Services Page**: Detailed service descriptions
- **About Page**: Company information
- **Contact Page**: Contact form that saves leads to database
- **Responsive Design**: Works on all devices

### Admin Features
- **Secure Login**: Email/password authentication
- **Admin Dashboard**: View and manage all leads
- **Lead Management**: Update lead status (new, contacted, qualified, closed)
- **Real-time Updates**: Dashboard refreshes to show latest leads
- **Protected Routes**: Admin pages require authentication

## Environment Variables

Your `.env` file contains:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

These are already configured and working.

## Available Commands

```bash
# Start development server (handled automatically)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Brand Colors

The application uses your brand colors:
- **Primary (Blue)**: Used for buttons, links, and key actions
- **Secondary (Gray)**: Used for text and backgrounds

These are configured in `tailwind.config.js` and can be customized.

## Deployment

The project is ready for deployment to any static hosting service that supports Vite:
- Vercel
- Netlify
- GitHub Pages
- Any hosting service

Just run `npm run build` and deploy the `dist` folder.

## Support

If you have questions or need help, refer to the documentation:
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev)
