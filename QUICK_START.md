# ⚡ Quick Start Guide

**Get Roadster website running in 2 minutes!**

---

## 🚀 Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

**Open**: http://localhost:5173

---

## 🌐 Deploy Now

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Follow prompts. Done in 30 seconds!

### Option 2: Netlify
Drag `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

## 📝 Update Content

### Change Phone Number
**Find & Replace**: `9540771001` → Your number

### Update Pricing
**File**: `src/pages/Fleet.jsx` (lines 7-49)
Change `price12` and `price24` values

### Add Car Photos
1. Put images in `public/cars/`
2. Update `src/pages/Fleet.jsx` backgrounds

### Change Colors
**File**: `tailwind.config.js`
```javascript
'racing-red': '#E10600',    // Change hex
'matte-black': '#0A0A0A',   // Change hex
```

---

## ✅ Pre-Launch Checklist

- [ ] Replace placeholder car images
- [ ] Update Google Maps location
- [ ] Test WhatsApp links on mobile
- [ ] Verify all phone numbers
- [ ] Add Google Analytics
- [ ] Enable HTTPS
- [ ] Test on actual phones

---

## 📚 Full Documentation

- **README.md** - Technical details
- **DEPLOYMENT.md** - Hosting guides
- **CUSTOMIZATION.md** - Content updates
- **PROJECT_SUMMARY.md** - Complete overview

---

## 🆘 Common Issues

**Build error?**
```bash
rm -rf node_modules dist
npm install --legacy-peer-deps
npm run build
```

**Fonts not loading?**
Check internet connection (loads from Google Fonts)

**WhatsApp not working?**
Test link format: `https://wa.me/919540771001?text=Test`

---

## 🎯 Key Features

✅ 4 complete pages (Home, Fleet, About, Contact)  
✅ Mobile-responsive design  
✅ Direct WhatsApp & call buttons  
✅ Bold racing aesthetic  
✅ Smooth animations  
✅ SEO optimized  
✅ Production ready  

---

**Ready to launch? Deploy now! 🚗💨**
