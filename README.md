# PCFG Insurance Services Website

A comprehensive insurance agency website built with Astro, featuring form processing through both Netlify and Supabase.

## Features

- **Dual Form Processing**: Forms are configured to work with both Netlify Forms and Supabase for redundancy
- **Spam Protection**: All forms include reCAPTCHA integration
- **Progressive Web App**: PWA capabilities with offline support
- **Responsive Design**: Mobile-first design with excellent UX
- **SEO Optimized**: Comprehensive meta tags and schema markup
- **Analytics Integration**: Google Analytics, AdRoll, and PageSense tracking

## Form Processing

### Netlify Forms
All forms are configured with:
- `data-netlify="true"` for automatic detection
- `data-netlify-recaptcha="true"` for spam protection
- Hidden `form-name` field for identification
- Custom thank you page at `/thank-you`

### Supabase Integration
Forms also submit to Supabase for:
- Lead tracking and analytics
- CRM integration
- Backup data storage
- Advanced reporting

## Available Forms

1. **Quick Quote Form** (`quick-quote`) - Homepage sidebar form
2. **Contact Form** (`contact`) - Main contact page form
3. **Commercial Quote Forms**:
   - Workers' Compensation (`workers-comp-quote`)
   - Commercial Auto (`commercial-auto-quote`)
   - General Liability (`general-liability-quote`)
   - Business Owner's Policy (`bop-quote`)
4. **Personal Lines Quote** (`personal-lines-quote`) - Multi-step personal insurance form
5. **Claim Report** (`claim-report`) - Insurance claim reporting
6. **Career Application** (`career-application`) - Job application form

## Project Structure

```
src/
├── components/           # Reusable UI components
├── layouts/             # Page layouts
├── pages/               # Website pages (auto-routed)
├── utils/               # Utility functions
│   ├── supabase.js     # Supabase client and form submission
│   ├── netlify-forms.js # Netlify form utilities
│   ├── form-handler.js  # Enhanced form handling
│   └── pwa.js          # PWA utilities
public/
├── admin/              # Netlify CMS admin panel
├── icons/              # PWA icons
├── manifest.json       # PWA manifest
├── _redirects          # Netlify redirects
└── thank-you.html      # Form success page
```

## Commands
All commands are run from the root of the project, from a terminal:

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Installs dependencies                     |
| `npm run dev`     | Starts local dev server at `localhost:4321` |
| `npm run build`   | Build your production site to `./dist/`  |
| `npm run preview` | Preview your build locally                |

## Deployment

This site is configured for deployment on Netlify with:
- Automatic form processing
- reCAPTCHA spam protection
- CMS admin panel at `/admin`
- Proper redirects and SPA fallbacks

## Environment Variables

Set these in your Netlify dashboard:
- `PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key