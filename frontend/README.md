# eXocriador Portfolio

Professional portfolio website showcasing full-stack development services and projects.

## 🚀 Features

- **Modern React 19** with TypeScript
- **PWA Ready** - Installable as a mobile app
- **Accessibility First** - WCAG 2.1 AA compliant
- **Performance Optimized** - Core Web Vitals monitoring
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Responsive Design** - Mobile-first approach
- **Interactive Animations** - Smooth scroll animations and particles
- **Contact Form** - Formspree integration

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, CSS Modules
- **Build Tool**: Vite 7
- **Animations**: React Intersection Observer, TSParticles
- **Performance**: Web Vitals API
- **PWA**: Service Worker, Web App Manifest
- **Linting**: ESLint 9 with React rules

## 📱 PWA Features

- Offline functionality
- Install prompt
- Push notifications support
- Background sync
- App-like experience

## ♿ Accessibility Features

- Skip to main content link
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast focus indicators
- Semantic HTML structure

## 🎯 Performance Features

- Core Web Vitals monitoring
- Performance budgets
- Resource loading optimization
- Long task detection
- Layout shift monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/eXocriador/exocriador-art.git

# Navigate to project directory
cd exocriador-art

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About/          # About section
│   ├── Contact/        # Contact form
│   ├── Footer/         # Footer
│   ├── Header/         # Navigation header
│   ├── Hero/           # Hero section
│   ├── Portfolio/      # Portfolio projects
│   ├── WhatIOffer/     # Services section
│   └── SkipLink/       # Accessibility skip link
├── constants/           # Content constants
├── data/               # Static data
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── animations.ts   # Animation utilities
│   ├── scrollUtils.ts  # Scroll navigation
│   └── webVitals.ts   # Performance monitoring
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## 🔧 Configuration

### TypeScript

The project uses strict TypeScript configuration with:

- Strict mode enabled
- No unused variables
- No implicit returns
- No unchecked indexed access

### ESLint

ESLint is configured with:

- React Hooks rules
- React Refresh for Vite
- TypeScript support
- Accessibility best practices

### PWA

PWA features are configured in:

- `public/manifest.json` - Web App Manifest
- `public/sw.js` - Service Worker
- `index.html` - PWA meta tags

## 📊 Performance Monitoring

The app automatically monitors:

- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)
- Time to First Byte (TTFB)

Performance data is logged to console and can be sent to analytics services.

## ♿ Accessibility Compliance

The app follows WCAG 2.1 AA guidelines:

- Proper heading structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## 🔍 SEO Features

- Meta tags optimization
- Open Graph support
- Twitter Cards
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration

## 📱 PWA Installation

Users can install the app on their devices:

1. Visit the website
2. Look for install prompt
3. Add to home screen
4. Enjoy app-like experience

## 🚀 Deployment

### Build

```bash
npm run build
```

### Deploy

The built files in `dist/` can be deployed to:

- Vercel
- Netlify
- AWS S3
- Any static hosting service

## 📈 Analytics

Performance metrics are automatically collected and can be integrated with:

- Google Analytics 4
- Custom analytics endpoints
- Performance monitoring services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Email**: exocriador@gmail.com
- **GitHub**: [@eXocriador](https://github.com/eXocriador)
- **LinkedIn**: [@exocriador](https://linkedin.com/in/exocriador)
- **Telegram**: [@exocriador](https://t.me/exocriador)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- TSParticles for interactive animations
- Web Vitals team for performance metrics
