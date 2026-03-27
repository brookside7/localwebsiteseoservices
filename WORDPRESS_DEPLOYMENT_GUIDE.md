# WordPress Deployment Guide for Hostinger

This guide will help you deploy your Local Website SEO Services WordPress theme to Hostinger.

## Step 1: Prepare the Theme

The WordPress theme is located in the `wordpress-theme` folder. This folder contains all the necessary files for your WordPress site.

## Step 2: Access Your Hostinger WordPress Installation

1. Log in to your Hostinger account
2. Go to your hosting control panel
3. Navigate to your WordPress installation

## Step 3: Upload the Theme

### Method A: Using WordPress Admin (Recommended)

1. Compress the `wordpress-theme` folder into a ZIP file
2. Log in to your WordPress admin panel (yourdomain.com/wp-admin)
3. Go to **Appearance → Themes**
4. Click **Add New**
5. Click **Upload Theme**
6. Choose the ZIP file you created
7. Click **Install Now**
8. Once installed, click **Activate**

### Method B: Using FTP/File Manager

1. Access your Hostinger File Manager or connect via FTP
2. Navigate to `/public_html/wp-content/themes/`
3. Upload the entire `wordpress-theme` folder (not zipped)
4. Rename the folder to something meaningful like `local-seo-services`
5. Go to WordPress Admin → Appearance → Themes
6. Activate your new theme

## Step 4: Configure WordPress Settings

1. **Set up your homepage:**
   - Go to **Settings → Reading**
   - Select "A static page" for your homepage
   - Choose "Home" as your homepage

2. **Configure permalinks:**
   - Go to **Settings → Permalinks**
   - Select "Post name" structure
   - Click **Save Changes**

3. **Set up menus:**
   - Go to **Appearance → Menus**
   - Create a new menu called "Primary Menu"
   - Add pages: Home, About, Services, Locations, Pricing, Case Studies, Blog, Contact
   - Assign it to the "Primary Menu" location
   - Click **Save Menu**

## Step 5: Install Required Pages

The theme expects these pages to exist:
- Home (set as homepage)
- About
- Services
- Locations
- Contact
- Pricing
- Case Studies
- Blog (Posts page)

Create these pages manually if they don't exist:
1. Go to **Pages → Add New**
2. Create each page with the appropriate title
3. For the Services page, select the "Services Page" template
4. For the Contact page, select the "Contact Page" template
5. For the Home page, select the "Home Page" template

## Step 6: Configure Contact Form

The contact form sends emails to your WordPress admin email. To configure:

1. Go to **Settings → General**
2. Set your admin email address
3. Test the contact form to ensure emails are being received

If emails aren't working, you may need to install an SMTP plugin like "WP Mail SMTP" to ensure reliable email delivery.

## Step 7: Add Services (Custom Post Type)

Services are managed as custom posts:

1. Go to **Services → Add New** in the WordPress admin
2. Create individual service pages for:
   - Google Business Profile Optimization
   - On-Page Local SEO
   - Local Citations & NAP Cleanup
   - Review & Reputation Management
   - Technical SEO
   - Generative Engine Optimization (GEO)

## Step 8: Add Locations (Custom Post Type)

Create location pages:

1. Go to **Locations → Add New**
2. Create pages for:
   - Corona, CA
   - Riverside, CA

## Step 9: Create Blog Posts

1. Go to **Posts → Add New**
2. Create blog content to populate your blog section
3. Add featured images to posts for better display

## Step 10: Set Up Footer Widgets (Optional)

1. Go to **Appearance → Widgets**
2. Add widgets to Footer Column 1-4 as desired
3. If you don't add widgets, the theme uses default footer content

## Step 11: Access SEO Tools

The theme includes SEO tools accessible from the WordPress admin:

1. Look for "SEO Tools" in the WordPress admin menu
2. Available tools:
   - GBP Evaluator (fully functional)
   - Instant Audit (placeholder)
   - Landing Page Grader (placeholder)

## Step 12: Customize Site Information

1. Go to **Settings → General**
2. Update:
   - Site Title: "Local Website SEO Services"
   - Tagline: Your business tagline
   - WordPress Address and Site Address (should match your domain)

## WordPress vs React Differences

### Authentication
WordPress has built-in user authentication. The admin dashboard is protected by WordPress login. There's no need for separate authentication like in the React version.

### Database
WordPress uses its own MySQL database instead of Supabase. All data (pages, posts, services, locations, contact form submissions) is stored in WordPress tables.

### Contact Forms
Contact form submissions are sent via email instead of being stored in a database. Consider installing a form plugin like "Contact Form 7" or "WPForms" for more advanced form handling and storage.

## Troubleshooting

### Theme Not Showing Up
- Make sure the folder is in `/wp-content/themes/`
- Check that `style.css` exists in the theme root

### Contact Form Not Working
- Install WP Mail SMTP plugin
- Configure it with your email provider

### Pages Showing 404
- Go to Settings → Permalinks
- Click "Save Changes" to flush rewrite rules

### Styling Issues
- Clear your browser cache
- Check if `style.css` is loading properly
- Try disabling other plugins that might conflict

## Support

For additional help with deployment, contact Hostinger support or refer to their WordPress documentation.

## Next Steps

After deployment:
1. Test all pages and forms
2. Submit your sitemap to Google Search Console
3. Install SEO plugins like Yoast SEO or Rank Math
4. Set up Google Analytics
5. Configure caching for better performance
6. Install a security plugin like Wordfence
