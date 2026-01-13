# 🚀 Deployment Guide

This guide will help you deploy your React portfolio website to various hosting platforms.

## Quick Deployment Options

### 1. Vercel (Recommended - Easiest)

**Steps:**
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts and your site will be live!

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect Vite and deploy

---

### 2. Netlify

**Steps:**
1. Build your project:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

**Or use Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Your site is live!

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

---

### 3. GitHub Pages

**Steps:**
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/portfolio/',
     plugins: [react()],
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

---

### 4. Firebase Hosting

**Steps:**
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase:
   ```bash
   firebase init hosting
   ```
   - Select your project
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## Pre-Deployment Checklist

- [ ] Update personal information (name, bio, etc.)
- [ ] Replace placeholder images with your own
- [ ] Update EmailJS credentials (if needed)
- [ ] Update social media links in footer
- [ ] Test contact form functionality
- [ ] Verify all project links work
- [ ] Check mobile responsiveness
- [ ] Run production build: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Update meta tags in `index.html`
- [ ] Add custom domain (optional)

---

## Custom Domain Setup

### Vercel
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Configure DNS or use Netlify DNS

### GitHub Pages
1. Add `CNAME` file to `public` folder with your domain
2. Update DNS records with GitHub IPs

---

## Environment Variables

If you need to hide your EmailJS credentials:

1. Create `.env` file:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_vweutds
   VITE_EMAILJS_TEMPLATE_ID=template_zbyngcg
   VITE_EMAILJS_PUBLIC_KEY=pffwusc_J9i7KIPN_
   ```

2. Update `App.jsx`:
   ```javascript
   emailjs.sendForm(
     import.meta.env.VITE_EMAILJS_SERVICE_ID,
     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
     formRef.current,
     import.meta.env.VITE_EMAILJS_PUBLIC_KEY
   )
   ```

3. Add environment variables to your hosting platform

---

## Performance Optimization

Already included in the build:
- ✅ Code splitting
- ✅ Minification
- ✅ Tree shaking
- ✅ Asset optimization
- ✅ Lazy loading ready

---

## Troubleshooting

**Issue: Blank page after deployment**
- Check browser console for errors
- Verify `base` path in `vite.config.js`
- Ensure all assets are loading correctly

**Issue: Contact form not working**
- Verify EmailJS credentials
- Check CORS settings
- Test in production environment

**Issue: Images not loading**
- Use absolute paths or import images
- Check image URLs are accessible
- Verify image file names and extensions

---

## Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [pages.github.com](https://pages.github.com)

---

**Your portfolio is ready to go live! 🎉**
