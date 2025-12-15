# Vercel Deployment Guide

## Production-Ready Configuration

This project is configured with enterprise-grade deployment settings optimized for performance, security, and reliability.

## Build Configuration

### Build Process
- **Install Command**: `npm ci` - Uses lockfile for deterministic builds
- **Build Command**: `NODE_ENV=production npm run build:client`
- **Output Directory**: `dist/public`

### Optimizations

#### Code Splitting
- React vendor bundle separated
- UI component library (Radix UI) in separate chunk
- Animation library (Framer Motion) isolated
- Automatic chunk optimization based on dependencies

#### Asset Optimization
- Images: `/assets/images/[name]-[hash][extname]`
- Fonts: `/assets/fonts/[name]-[hash][extname]`
- JavaScript: `/assets/js/[name]-[hash].js`
- CSS: Code-split and optimized

#### Build Settings
- Minification: ESBuild (fastest)
- Source maps: Disabled in production
- Target: ESNext for modern browsers
- Chunk size warning: 1000KB threshold

## Security Headers

### Global Headers (All Routes)
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Privacy
- `Permissions-Policy` - Restricts browser features
- `Strict-Transport-Security` - Forces HTTPS

### Asset-Specific Headers
- Static assets: 1-year immutable cache
- Fonts: CORS enabled for cross-origin loading
- JavaScript/CSS: Gzip compression enabled

## Caching Strategy

### Immutable Assets (1 year)
- `/assets/*` - All build artifacts
- `*.js`, `*.css` - Compiled code
- `*.jpg`, `*.png`, `*.svg`, etc. - Images
- `*.woff`, `*.woff2`, `*.ttf` - Fonts

### HTML (No Cache)
- `index.html` - Always fresh for SPA routing

## Routing

### SPA Configuration
All routes (`/*`) rewrite to `/index.html` for client-side routing with Wouter.

## Performance

### Regional Deployment
- Primary region: `iad1` (US East)
- Automatic edge caching
- Global CDN distribution

### Build Performance
- Parallel dependency installation
- Optimized Vite build pipeline
- Minimal build artifacts

## Environment Variables

Currently, no environment variables are required for the client build. The application is fully static.

If you need to add environment variables:
1. Add them in Vercel dashboard → Project Settings → Environment Variables
2. Prefix client variables with `VITE_` for Vite to expose them
3. Access via `import.meta.env.VITE_*` in code

## Deployment Checklist

- [x] Build configuration optimized
- [x] Security headers configured
- [x] Caching strategy implemented
- [x] Code splitting enabled
- [x] Asset optimization configured
- [x] SPA routing configured
- [x] Regional deployment set
- [x] Build artifacts excluded from repo

## Monitoring

After deployment, monitor:
- Build times (should be < 2 minutes)
- Bundle sizes (check Vercel build logs)
- Lighthouse scores (should be 90+)
- Core Web Vitals (LCP, FID, CLS)

## Troubleshooting

### Build Fails
1. Check Node.js version (should be 18+)
2. Verify `package-lock.json` is committed
3. Check build logs for specific errors

### Assets Not Loading
1. Verify `outputDirectory` matches build output
2. Check asset paths in `index.html`
3. Ensure Vite base path is correct

### Routing Issues
1. Verify rewrite rule in `vercel.json`
2. Check that all routes serve `index.html`
3. Ensure client router is configured correctly

## Advanced Configuration

### Custom Domain
1. Add domain in Vercel dashboard
2. Configure DNS records
3. SSL certificate auto-provisioned

### Preview Deployments
- Every push to branch creates preview
- Pull requests get unique URLs
- Automatic deployment on merge to main

### Analytics
- Enable Vercel Analytics in dashboard
- View real-time performance metrics
- Track Core Web Vitals
