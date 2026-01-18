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

To access the admin dashboard, you need to create an admin user. Follow these steps:

### Step 1: Create Your Account
1. Start the development server (this happens automatically)
2. Visit: http://localhost:3000/login
3. You won't be able to log in yet - you need to sign up first

### Step 2: Sign Up via Supabase
Since email confirmation is disabled, you'll need to create your user account through the Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run this SQL command (replace with your email and password):

```sql
-- Create a new user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'your-email@example.com',  -- CHANGE THIS
  crypt('your-password', gen_salt('bf')),  -- CHANGE THIS
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  ''
) RETURNING id;
```

### Step 3: Make Yourself an Admin
After creating your user account, you need to set the is_admin flag to true:

1. In the Supabase SQL Editor, run:

```sql
-- Set your user as admin (replace the email with yours)
UPDATE profiles
SET is_admin = true
WHERE email = 'your-email@example.com';
```

**Alternative Method:** If the profile wasn't automatically created, you can manually create it:

```sql
-- Get your user ID first
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Then create the profile with admin access (replace USER_ID with the ID from above)
INSERT INTO profiles (id, email, is_admin)
VALUES ('USER_ID', 'your-email@example.com', true);
```

### Step 4: Login to Admin Dashboard
1. Go to: http://localhost:3000/login
2. Enter your email and password
3. You should now have access to the Admin Dashboard at http://localhost:3000/admin

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
