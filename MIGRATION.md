# WordPress to Static Site Migration Guide

This guide will help you migrate from your existing WordPress site to this new static site while preserving SEO value and avoiding ranking drops.

## Pre-Migration Checklist

### 1. Document Your Current Site Structure

Before making any changes:

- Export a list of all current URLs from WordPress (use a sitemap plugin or screaming frog)
- Document your current rankings for key terms
- Take screenshots of current traffic in Google Analytics
- Back up your WordPress site completely
- Export your Google Search Console data

### 2. URL Planning

**Important:** Keep your URL structure as similar as possible to minimize redirects.

**Common WordPress URLs:**
- `/services/local-seo/` → Keep as `/services/local-seo/`
- `/location/corona-ca/` → Map to `/locations/corona-ca/`
- `/blog/post-title/` → Keep as `/blog/post-title/` (if migrating blog)

**Rule:** If the page serves the same purpose on the new site, keep the same URL.

### 3. Create Redirect Map

Use the provided `REDIRECTS_TEMPLATE.txt` file to map old URLs to new URLs for any that change.

## Migration Steps

### Step 1: Upload New Site Files

1. Upload all files from this project to your Hostinger `public_html` directory
2. Test the site on a subdomain first if possible (staging.yourdomain.com)
3. Verify all pages load correctly
4. Test all forms and tools functionality

### Step 2: Configure 301 Redirects in Hostinger

**Option A: Using .htaccess (Recommended)**

Create/edit `.htaccess` file in your public_html root:

```apache
# 301 Redirects for SEO preservation

# Example redirects - customize based on your redirect map
Redirect 301 /old-page-url/ https://yourdomain.com/new-page-url/
Redirect 301 /another-old-url/ https://yourdomain.com/new-url/

# Redirect old blog URLs if not migrating blog
Redirect 301 /blog/ https://yourdomain.com/

# Catch-all for old WordPress URLs to homepage (last resort)
# RedirectMatch 301 ^/wp-content/.*$ https://yourdomain.com/
```

**Option B: Using Hostinger Control Panel**

1. Log into Hostinger control panel
2. Navigate to Advanced → Redirects
3. Add individual 301 redirects for each changed URL
4. Test each redirect after adding

### Step 3: Update Google Search Console

1. Keep your existing verified property
2. Submit the new sitemap.xml:
   - Go to Sitemaps section
   - Submit: `https://yourdomain.com/sitemap.xml`
3. Leave old sitemap submitted for 30 days during transition

### Step 4: Update Google Analytics

1. Verify your GA tracking code is working on the new site
2. Keep historical data from WordPress site
3. Monitor traffic carefully for the first 30 days

### Step 5: Post-Launch Monitoring (Critical!)

**Week 1:**
- Check Google Search Console daily for crawl errors
- Monitor 404 errors and add redirects for any you find
- Verify all important pages are being crawled
- Check that key rankings haven't dropped significantly

**Week 2-4:**
- Monitor organic traffic in GA
- Check rankings for your most important keywords
- Review Search Console for any security or mobile usability issues
- Fix any 404s that appear

**Month 2-3:**
- Continue monitoring but with less frequency
- Traffic should stabilize by month 2
- Rankings may fluctuate but should recover by month 3

## Common Issues and Solutions

### Issue: 404 Errors After Migration

**Solution:**
- Check the URL path is correct (case-sensitive)
- Verify file exists in correct directory
- Add 301 redirect from old URL
- Check .htaccess for conflicts

### Issue: Pages Not Indexing

**Solution:**
- Verify robots.txt allows crawling
- Check pages exist in sitemap.xml
- Request indexing in Google Search Console
- Ensure meta robots tags don't block indexing

### Issue: Rankings Dropped

**Solution:**
- Normal to see 5-10% fluctuation during migration
- Verify all redirects are working (301, not 302)
- Check that content from old pages wasn't lost
- Ensure schema markup is present on new pages
- Wait 30-60 days for things to stabilize

### Issue: Forms Not Working

**Solution:**
- Forms in this build are front-end only (placeholder endpoints)
- You'll need to connect forms to an email service or form handler
- Options: Formspree, Netlify Forms, custom PHP script, or email service

## Hostinger-Specific Notes

### Accessing .htaccess

1. Log into Hostinger control panel
2. Navigate to File Manager
3. Go to public_html
4. Click the settings icon (top right)
5. Enable "Show hidden files"
6. Edit .htaccess file

### Setting Up Email Forms

If you want forms to send emails:

1. Create email addresses in Hostinger control panel
2. Add PHP form handler (example code available on request)
3. Update form action attributes to point to PHP handler
4. Test thoroughly

### SSL Certificate

1. Ensure SSL certificate is installed (Hostinger provides free SSL)
2. Force HTTPS redirect in .htaccess:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Post-Launch Checklist

- [ ] All pages load without errors
- [ ] All redirects working (test old URLs)
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Analytics tracking verified
- [ ] Forms tested and working
- [ ] Mobile version tested on real devices
- [ ] Site speed tested (Google PageSpeed Insights)
- [ ] No mixed content warnings (HTTP resources on HTTPS pages)
- [ ] All internal links working
- [ ] Schema markup validated (Google Rich Results Test)

## Timeline Expectations

- **Day 1-7:** Google discovers and crawls new pages
- **Week 2-4:** Rankings may fluctuate during re-evaluation
- **Month 2:** Traffic should stabilize near pre-migration levels
- **Month 3:** Rankings should fully recover or improve

**Important:** Do not panic if you see traffic drops in the first 2 weeks. This is normal. Most sites fully recover by month 2-3 if redirects are properly configured.

## When to Get Help

Contact a developer or SEO professional if:

- Traffic drops more than 30% after 2 weeks
- 404 errors keep appearing despite adding redirects
- Pages aren't being indexed after 2 weeks
- You're seeing security warnings
- Forms aren't working and you can't troubleshoot

## Additional Resources

- Google Search Console Help: https://support.google.com/webmasters
- Hostinger Knowledge Base: https://support.hostinger.com
- Test Redirects: https://httpstatus.io
- Validate Schema: https://validator.schema.org
- Test Mobile: https://search.google.com/test/mobile-friendly

## Notes

- This site is built as static HTML/CSS/JS with no server-side dependencies
- Tools work entirely in the browser (no external APIs)
- All form submissions need to be connected to a form handler service
- The site will work on any hosting that serves static files
- No database required
- No WordPress plugins needed
