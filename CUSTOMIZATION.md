# 🎨 Customization Guide

Quick reference for updating content without touching code structure.

---

## 📝 Contact Information

**File**: All pages use centralized contact info

### WhatsApp Number
**Current**: 9540771001

**To Change**: Search and replace `9540771001` in:
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/pages/Home.jsx`
- `src/pages/Fleet.jsx`
- `src/pages/About.jsx`
- `src/pages/Contact.jsx`

### Phone Numbers
**Current**: 9540771001, 8470004900

**To Change**: Update in:
- `src/components/Footer.jsx` (lines ~40-48)
- `src/pages/Contact.jsx` (lines ~20-28)

### Instagram Handle
**Current**: @r0adster_drive

**To Change**: Search and replace `r0adster_drive` and update follower count in:
- `src/pages/Home.jsx` (line ~182)

### Address
**Current**: 13th St, Sector Alpha II, Brahmpur Rajraula Urf Nawada, UP 201310

**To Change**: Update in:
- `src/components/Footer.jsx` (line ~60)
- `src/pages/Contact.jsx` (line ~45)

---

## 🚗 Fleet Management

**File**: `src/pages/Fleet.jsx` (lines 7-49)

### Current Fleet:
```javascript
const cars = [
  {
    name: 'Maruti Brezza Petrol',
    price12: '₹1,800',
    price24: '₹2,800',
    fuel: 'Petrol',
    seats: '5',
    category: 'budget',
    features: ['Unlimited KM', 'Bluetooth', 'AC'],
  },
  // ... more cars
];
```

### To Add a New Car:
```javascript
{
  name: 'Your Car Name',
  price12: '₹X,XXX',
  price24: '₹X,XXX',
  fuel: 'Petrol/Diesel/CNG',
  seats: '5',
  category: 'budget', // or 'suv' or 'premium'
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  isPremium: false, // Set true only for luxury cars
}
```

### To Update Pricing:
Simply change the `price12` and `price24` values for each car.

### To Remove a Car:
Delete the entire car object from the array.

---

## 🎯 Homepage Featured Cars

**File**: `src/pages/Home.jsx` (lines 28-48)

Update the `featuredCars` array to showcase different vehicles on the homepage.

---

## ✨ Trust Points / Features

**File**: `src/pages/Home.jsx` (lines 9-26)

### Current Features:
- 24/7 Availability
- Zero Security Deposit
- Unlimited KM Options
- Wide Fleet Range

### To Add/Edit:
```javascript
{
  icon: <YourIcon className="w-12 h-12" />,
  title: 'Your Feature Title',
  description: 'Your feature description',
}
```

---

## 🎨 Colors

**File**: `tailwind.config.js`

### Current Colors:
- Racing Red: `#E10600`
- Matte Black: `#0A0A0A`

### To Change:
```javascript
colors: {
  'racing-red': '#E10600', // Change hex code here
  'matte-black': '#0A0A0A', // Change hex code here
}
```

After changing colors, rebuild:
```bash
npm run build
```

---

## 📱 Social Media Links

### Instagram
Search for `instagram.com/r0adster_drive` and update handle.

### Facebook (to add)
Add a new link in Footer and Contact page similar to Instagram.

---

## 📄 Page Content

### About Page - Brand Story
**File**: `src/pages/About.jsx` (lines ~45-70)

Edit the paragraphs in the "WHO WE ARE" section.

### About Page - Mission & Vision
**File**: `src/pages/About.jsx` (lines ~74-87)

Update mission and vision statements.

### About Page - How It Works
**File**: `src/pages/About.jsx` (lines ~8-20)

Modify the 3-step process.

---

## 🗺️ Google Maps

**File**: `src/pages/Contact.jsx` (line ~120)

### Current:
Generic map embed with placeholder coordinates.

### To Update:
1. Go to [Google Maps](https://maps.google.com)
2. Find your exact location
3. Click "Share" → "Embed a map"
4. Copy the entire `<iframe>` code
5. Replace lines 120-130 in `src/pages/Contact.jsx`

---

## 🖼️ Images

### Car Images
**Recommended Approach**: Store in `public/cars/` folder

```
public/
  └── cars/
      ├── brezza.jpg
      ├── swift.jpg
      ├── fronx.jpg
      ├── scorpio.jpg
      ├── thar.jpg
      └── mercedes.jpg
```

**Update Fleet Page**: In `src/pages/Fleet.jsx`, replace placeholder backgrounds:

```jsx
// Current (placeholder):
<div className="relative h-52 bg-gradient-to-br from-gray-800 to-gray-900">

// Replace with:
<div className="relative h-52 bg-cover bg-center" 
     style={{ backgroundImage: `url('/cars/brezza.jpg')` }}>
```

### Hero Background
**File**: `src/pages/Home.jsx` (line ~59)

Current placeholder:
```jsx
bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920')]
```

Replace with your own image URL or local path:
```jsx
bg-[url('/hero-image.jpg')]
```

---

## 🏷️ Meta Tags & SEO

**File**: `index.html` (lines 6-17)

### Title
```html
<title>Your New Title Here</title>
```

### Description
```html
<meta name="description" content="Your new description" />
```

### Keywords
```html
<meta name="keywords" content="your, keywords, here" />
```

---

## 📊 Analytics

### Google Analytics
**File**: `index.html`

Add before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual ID.

---

## 🎭 Fonts

**Current**: Bebas Neue (headings), Inter (body)

### To Change:
1. Update Google Fonts import in `src/index.css` (line 1)
2. Update font families in `tailwind.config.js` (lines 11-12)

Example:
```javascript
fontFamily: {
  'heading': ['Your Heading Font', 'sans-serif'],
  'body': ['Your Body Font', 'sans-serif'],
}
```

---

## 🔗 Call-to-Action Buttons

### WhatsApp Message Templates

**Current**: "Hi, I'm interested in renting a car"

**To Change**: Update the URL parameter:
```
https://wa.me/919540771001?text=Your%20New%20Message%20Here
```

Use [URL Encoder](https://www.urlencoder.org/) to encode your message.

### Button Text
Search for button text like "Book on WhatsApp", "Call Now" and update throughout the site.

---

## 📱 Footer

**File**: `src/components/Footer.jsx`

### Quick Links
Update array on lines 7-12 to add/remove pages.

### Social Media
Add new social media links in lines 52-68.

### Copyright Year
Auto-updates via `{new Date().getFullYear()}` on line 97.

---

## 🔄 After Making Changes

1. **Save all files**
2. **Test locally**:
   ```bash
   npm run dev
   ```
3. **Build for production**:
   ```bash
   npm run build
   ```
4. **Deploy** (see DEPLOYMENT.md)

---

## ⚠️ Common Mistakes

1. **Forgetting to encode WhatsApp messages**: Use URL encoding for spaces and special characters
2. **Not rebuilding after color changes**: Always run `npm run build` after Tailwind config changes
3. **Breaking JSON syntax**: When editing arrays/objects, maintain proper commas and brackets
4. **Image paths**: Use `/` prefix for images in `public/` folder (e.g., `/cars/brezza.jpg`)

---

## 💡 Quick Wins

### Easy Updates (No Code Knowledge Required):
- ✅ Contact information
- ✅ Car pricing
- ✅ Fleet features/descriptions
- ✅ About page text
- ✅ Instagram follower count

### Moderate Updates (Basic Code Knowledge):
- ⚠️ Adding new cars to fleet
- ⚠️ Changing colors
- ⚠️ Updating trust points
- ⚠️ Adding images

### Advanced Updates (Developer Required):
- 🔴 Layout changes
- 🔴 Animation modifications
- 🔴 New page creation
- 🔴 Component restructuring

---

## 🆘 Need Help?

**Can't find what you're looking for?**

1. Check README.md for technical documentation
2. Check DEPLOYMENT.md for hosting help
3. Search the codebase for specific text you want to change
4. Use Find & Replace (Cmd/Ctrl + F) in your code editor

**For major changes**, consider hiring a React developer.

---

**Happy customizing! 🎨**
