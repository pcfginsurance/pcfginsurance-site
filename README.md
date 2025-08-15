# PCFG Insurance Services Website

A comprehensive insurance agency website built with Astro, featuring form processing through both Netlify and Supabase, with continuous deployment through GitHub.

## Features

- **Dual Form Processing**: Forms are configured to work with both Netlify Forms and Supabase for redundancy
- **Spam Protection**: All forms include reCAPTCHA integration
- **Progressive Web App**: PWA capabilities with offline support
- **Responsive Design**: Mobile-first design with excellent UX
- **SEO Optimized**: Comprehensive meta tags and schema markup
- **Analytics Integration**: Google Analytics, AdRoll, and PageSense tracking
- **Continuous Deployment**: Automatic deployments via GitHub integration
- **Environment Management**: Secure handling of environment variables

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

## Deployment

### Netlify Continuous Deployment Setup

1. **Connect Repository to Netlify**:
   - Log into your Netlify dashboard
   - Click "New site from Git"
   - Choose GitHub and authorize Netlify
   - Select your repository
   - Configure build settings (auto-detected from netlify.toml)
   - For monorepos: Set base directory to the folder containing your project

2. **Environment Variables**:
   Set these in your Netlify dashboard under Site settings > Environment variables:
   ```
   PUBLIC_SUPABASE_URL=your_supabase_project_url
   PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_VERSION=18
   ```

3. **GitHub Secrets** (for GitHub Actions):
   Set these in your GitHub repository under Settings > Secrets and variables > Actions:
   ```
   NETLIFY_AUTH_TOKEN=your_netlify_auth_token
   NETLIFY_SITE_ID=your_netlify_site_id
   PUBLIC_SUPABASE_URL=your_supabase_project_url
   PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Automatic Deployments**:
   - Push to `main` branch triggers production deployment
   - Pull requests create deploy previews
   - Build logs available in Netlify dashboard

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the site
npm run build

# Deploy using Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

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

## GitHub Integration

### Branch Protection
Configure branch protection rules in GitHub:
- Require pull request reviews
- Require status checks to pass
- Restrict pushes to main branch

### Automated Workflows
The included GitHub Action workflow:
- Runs on push to main branch
- Installs dependencies and builds the site
- Deploys to Netlify automatically
- Creates deploy previews for pull requests

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
├── .github/
│   └── workflows/      # GitHub Actions workflows
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
| `npm start`       | Alias for `npm run dev`                  |
| `npm test`        | Run tests (placeholder)                  |

## Development Workflow

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd pcfg-insurance-services

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Deployment
```bash
# Create a new branch for features
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "Your commit message"
git push origin feature/your-feature-name

# Create pull request in GitHub
# After review and merge to main, Netlify will auto-deploy
```

## Environment Variables Setup

### Required Environment Variables
- `PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `NODE_VERSION` - Node.js version (18)

### Local Development
Create a `.env` file in the root directory:
```
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Production Deployment
Set environment variables in:
- **Netlify Dashboard**: Site settings > Environment variables
- **GitHub Secrets**: Repository settings > Secrets and variables > Actions

## Continuous Integration

The site includes automated workflows for:
- **Build Validation**: Ensures all code builds successfully
- **Form Testing**: Validates form configurations
- **Deploy Previews**: Creates preview deployments for pull requests
- **Production Deployment**: Automatic deployment on main branch updates

## Security Features

- **Form Spam Protection**: reCAPTCHA integration on all forms
- **Security Headers**: Comprehensive security headers via netlify.toml
- **Content Security**: Protection against XSS and other attacks
- **HTTPS Enforcement**: Automatic HTTPS redirects
- **Asset Optimization**: Automatic compression and caching