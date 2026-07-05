# 🚀 Deployment Guide for Roadster Website

## Quick Start (Local Development)

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Visit `http://localhost:5173`

---

## 📦 Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

---

## ☁️ Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts. Your site will be live in seconds!

**OR** use the Vercel website:
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel auto-detects Vite configuration
- Deploy!

### Option 2: Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy via Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

**OR** drag and drop:
- Go to [netlify.com](https://netlify.com)
- Drag the `dist` folder into the deploy area
- Done!

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/roadster",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages in repository settings (source: gh-pages branch)

### Option 4: Traditional Hosting (cPanel, FTP, etc.)

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the entire `dist/` folder to your web hosting

3. Point your domain to the uploaded folder

4. Done!

---

## ⚙️ Environment Configuration

### Build Settings (for hosting platforms)

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

---

## 🔧 Post-Deployment Checklist

### 1. Replace Placeholder Content

#### Car Images
Replace placeholder car backgrounds with real photos:
- Location: `src/pages/Fleet.jsx` and `src/pages/Home.jsx`
- Recommended: High-resolution, professional photos
- Format: JPG or WebP for optimal performance
- Dimensions: Minimum 1200x800px

Add real images to `public/` folder:
```
public/
  ├── cars/
  │   ├── brezza.jpg
  │   ├── swift.jpg
  │   ├── fronx.jpg
  │   ├── scorpio.jpg
  │   ├── thar.jpg
  │   └── mercedes.jpg
```

Update image paths in components.

#### Google Maps
Update the map embed in `src/pages/Contact.jsx` with exact coordinates:
1. Go to Google Maps
2. Find your exact location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe in Contact.jsx

### 2. Update Dynamic Content

- Instagram follower count (Home.jsx, line ~182)
- Add actual testimonials if available
- Update car availability if fleet changes

### 3. SEO & Analytics

#### Add Google Analytics
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Add Facebook Pixel (optional)
```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### 4. Performance Optimization

#### Image Optimization
1. Compress all images before uploading
2. Use WebP format for modern browsers
3. Tools: TinyPNG, Squoosh, ImageOptim

#### Custom Domain
1. Purchase domain from GoDaddy, Namecheap, etc.
2. Point DNS to your hosting provider
3. Enable HTTPS (free with Let's Encrypt on most platforms)

---

## 🔒 Security

- Enable HTTPS (automatic on Vercel/Netlify)
- Set up custom domain with SSL certificate
- Configure security headers if using traditional hosting

---

## 📊 Monitoring & Maintenance

### Track Performance
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### Regular Updates
- Check Instagram follower count
- Update pricing if changed
- Add new cars to fleet
- Monitor WhatsApp conversion rate

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install --legacy-peer-deps
npm run build
```

### Dependency Issues
```bash
# Use legacy peer deps flag
npm install --legacy-peer-deps
```

### Font Loading Issues
Fonts are loaded from Google Fonts CDN. If blocked, download and serve locally.

---

## 📱 Mobile Testing

Test on actual devices:
- iPhone (Safari)
- Android (Chrome)
- WhatsApp in-app browser
- Instagram in-app browser

Use browser dev tools mobile emulation for quick tests.

---

## 🎯 Conversion Tracking

### Track These Events:
1. WhatsApp button clicks
2. Phone call clicks
3. Instagram link clicks
4. Page views per vehicle
5. Time on site

### Add Event Tracking:
Use Google Analytics 4 events or Facebook Pixel events on CTA clicks.

---

## 💡 Tips for Success

1. **Respond Fast**: Average response time under 5 minutes on WhatsApp
2. **High-Quality Photos**: Invest in professional car photography
3. **Social Proof**: Regularly update Instagram and show it on site
4. **Mobile First**: 80%+ of traffic will be mobile
5. **Test CTAs**: A/B test different call-to-action button text

---

## 📞 Support

For technical issues with the website code, refer to the README.md or contact your developer.

For business inquiries:
- WhatsApp: 9540771001
- Instagram: @r0adster_drive

---

**Ready to go live? Deploy now and start generating leads! 🚗💨**
