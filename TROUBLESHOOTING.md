# Troubleshooting Guide

## Login Issues

### "Invalid login credentials" Error

**Possible causes:**
1. Wrong email or password
2. Account doesn't exist yet
3. Supabase connection issue

**Solutions:**
1. Make sure you've created an account first by clicking "Don't have an account? Create one"
2. Check that your password is at least 6 characters
3. Try creating a new account with a different email

### Can't Access Admin Dashboard After Login

**Possible causes:**
1. Authentication state not loading
2. Browser cache issues

**Solutions:**
1. Refresh the page after logging in
2. Clear browser cache and cookies
3. Try in an incognito/private window
4. Check browser console for errors (F12 > Console tab)

### "Missing Supabase environment variables" Error

**Possible causes:**
1. .env file not loaded
2. Environment variables not set correctly

**Solutions:**
1. Check that `.env` file exists in project root
2. Verify it contains:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Restart the development server
4. Run `npm run build` to verify variables are loaded

## Contact Form Issues

### Form Submissions Not Saving

**Possible causes:**
1. Database connection issue
2. RLS policies blocking insert

**Solutions:**
1. Check browser console for errors
2. Verify Supabase connection in Network tab (F12)
3. Test database connection by trying to sign up/login

### Leads Not Showing in Admin Dashboard

**Possible causes:**
1. RLS policy restricting access
2. User not authenticated

**Solutions:**
1. Ensure you're logged in
2. Check browser console for errors
3. Try refreshing the page
4. Verify leads exist by checking Supabase dashboard

## Build Issues

### Build Fails with Module Errors

**Solutions:**
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Try `npm run build` again

### Vite Build Warnings

**Solutions:**
- Warnings about chunk size are normal for production builds
- They don't affect functionality
- To resolve, you can implement code splitting (advanced)

## Database Issues

### Profile Not Created After Sign Up

**Possible causes:**
1. Database trigger not working
2. RLS policy too restrictive

**Solutions:**
1. Check Supabase logs for errors
2. Manually create profile:
   ```sql
   -- Get your user ID
   SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

   -- Create profile
   INSERT INTO profiles (id, email, is_admin)
   VALUES ('user-id-here', 'your-email@example.com', true);
   ```

### Can't Query Tables

**Solutions:**
1. Verify you're authenticated
2. Check RLS policies are enabled
3. Ensure your user has appropriate access

## Getting More Help

### Debugging Steps

1. **Open Browser Console** (F12 > Console tab)
   - Look for red error messages
   - Copy the full error text

2. **Check Network Tab** (F12 > Network tab)
   - Look for failed requests (red)
   - Check the response for error details

3. **Check Supabase Logs**
   - Go to your Supabase dashboard
   - Navigate to Logs section
   - Look for API errors

### Common Console Errors

**"Failed to fetch"**
- Network issue or CORS problem
- Check Supabase URL in .env file
- Verify internet connection

**"Invalid API key"**
- Wrong anon key in .env file
- Copy the key again from Supabase dashboard

**"Row Level Security policy violation"**
- User doesn't have permission
- Check RLS policies in Supabase
- Verify user is authenticated

### Reset Everything

If nothing works, try a fresh start:

1. Delete all users from Supabase:
   ```sql
   DELETE FROM auth.users;
   ```

2. Clear browser data:
   - Cookies
   - Local storage
   - Cache

3. Restart dev server

4. Create a new account

### Still Having Issues?

Check:
- Supabase project is active (not paused)
- .env file has correct project URL
- Browser allows cookies
- No browser extensions blocking requests
