# 🚀 Full Stack Developer Portfolio

A modern, responsive, and production-ready React portfolio website featuring a stunning dark mode design, smooth animations, and full EmailJS integration for contact functionality.

![Portfolio Preview](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-Integrated-00C853?style=for-the-badge)

## ✨ Features

### 🎨 Design
- **Modern Dark Mode Theme** - Professional dark color palette with purple/blue accents
- **Fully Responsive** - Mobile-first design that looks perfect on all devices
- **Smooth Animations** - Subtle hover effects, transitions, and scroll animations
- **Premium UI/UX** - Polished, professional design ready for production

### 📱 Sections

1. **Sticky Navbar**
   - Smooth scroll navigation
   - Hamburger menu for mobile with slide-in animation
   - Active state highlighting
   - Backdrop blur effect

2. **Hero Section**
   - Eye-catching headline with gradient text
   - Professional tagline
   - Call-to-action buttons
   - Hero image with modern styling

3. **About Me**
   - Profile image
   - Professional bio
   - Skills showcase with icons
   - Responsive grid layout

4. **Services**
   - 6 service cards with icons
   - Hover animations
   - Responsive grid (1-4 columns based on screen size)
   - Web Development, UI/UX, React, Backend, AI Integration, Mobile Responsive

5. **Portfolio**
   - 6 project showcases
   - Project images, descriptions, and tech stacks
   - Live demo and GitHub links
   - Hover scale effects

6. **Testimonials**
   - 5 client testimonials
   - Avatar images
   - Client names and positions
   - Quote styling

7. **Contact Form**
   - Fully functional with EmailJS
   - Real-time form validation
   - Success/error notifications
   - Auto-reset after submission
   - Mobile-friendly layout

8. **Footer**
   - Social media links
   - Copyright notice
   - Responsive design

### 🔧 Technical Features

- **React 18.3.1** - Latest React with hooks
- **Vite 7.3.0** - Lightning-fast build tool
- **EmailJS Integration** - Working contact form
- **Smooth Scrolling** - Native smooth scroll behavior
- **Mobile Menu** - Fully functional hamburger menu
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Google Fonts** - Inter font family
- **Zero Console Errors** - Clean, production-ready code
- **Build Optimized** - Minified and optimized for production

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📧 EmailJS Configuration

The contact form is integrated with EmailJS. Current configuration:

- **Service ID**: `service_vweutds`
- **Template ID**: `template_zbyngcg`
- **Public Key**: `pffwusc_J9i7KIPN_`
- **From Email**: `nwaqas1166@gmail.com`

### To Update EmailJS Settings:

1. Go to [EmailJS Dashboard](https://www.emailjs.com/)
2. Update your service and template IDs
3. Replace the credentials in `src/App.jsx`:

```javascript
emailjs.sendForm(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  formRef.current,
  'YOUR_PUBLIC_KEY'
)
```

## 🎨 Customization

### Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #121212;
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  /* ... more colors */
}
```

### Content

Update the content in `src/App.jsx`:

- **Personal Info**: Change name, title, bio in the Hero and About sections
- **Services**: Modify service cards in the Services section
- **Projects**: Update project data in the Portfolio section
- **Testimonials**: Change testimonial content
- **Social Links**: Update footer social media links

### Images

Replace the Unsplash placeholder images with your own:

```javascript
// Example in Hero section
<img 
  src="your-image-path.jpg" 
  alt="Your description"
/>
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

## 🌟 Key Technologies

- **React** - UI library
- **Vite** - Build tool
- **EmailJS** - Email service
- **CSS3** - Styling with custom properties
- **Google Fonts** - Typography
- **Unsplash** - Placeholder images

## 📦 Project Structure

```
portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main component with all sections
│   ├── index.css        # Global styles and design system
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## ✅ Production Checklist

- [x] All sections implemented and functional
- [x] Fully responsive (mobile, tablet, desktop)
- [x] Dark mode theme
- [x] Smooth animations and transitions
- [x] EmailJS contact form working
- [x] Success/error notifications
- [x] Mobile hamburger menu
- [x] Smooth scroll navigation
- [x] SEO meta tags
- [x] Google Fonts loaded
- [x] Zero console errors
- [x] Build optimization
- [x] Professional design

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

For questions or support, please use the contact form on the website or reach out via email.

---

**Built with ❤️ using React and modern web technologies**
