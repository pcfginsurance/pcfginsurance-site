# Deployment Guide

This guide explains how to deploy the PCFG Insurance Services website using Netlify with GitHub continuous deployment.

## Prerequisites

- GitHub account with repository access
- Netlify account
- Supabase project (optional but recommended)

## Step 1: Repository Setup

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/pcfg-insurance-services.git
   git push -u origin main
   ```

## Step 2: Netlify Setup

### Connect Repository
1. Log into [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose "GitHub" and authorize Netlify to access your repositories
4. Select your `pcfg-insurance-services` repository
5. Configure build settings:
   - **Base directory**: Leave empty if project is in root, or set to subdirectory path for monorepos
   - **Build command**: `npm run build` (will be auto-detected from netlify.toml)
   - **Publish directory**: `dist` (will be auto-detected from netlify.toml)
   - **Branch to deploy**: `main`

6. **Important**: Netlify will automatically use the settings from `netlify.toml`, so you can leave the build settings as default

7. **For Monorepo Setup**:
   If your project is in a subdirectory of a larger repository:

### Netlify GitHub Setup Process:

1. **Connect Repository to Netlify**
2. **Configure Build Settings**:
   - If your project is in the repository root: Leave base directory empty
   - If your project is in a subdirectory: Set base directory to the folder path (e.g., `apps/insurance-site`)
3. **Automatic Builds** - Every push to main branch triggers deployment
4. **Deploy Previews** - Pull requests create preview deployments

**Build Configuration:**
- **Base Directory**: Set in Netlify UI based on your repository structure
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

### Environment Variables
In Netlify dashboard, go to Site settings > Environment variables and add:

```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_VERSION=18
```

## Step 3: GitHub Secrets (Optional)

For GitHub Actions integration, add these secrets in your GitHub repository:
Settings > Secrets and variables > Actions

```
NETLIFY_AUTH_TOKEN=your_netlify_personal_access_token
NETLIFY_SITE_ID=your_netlify_site_id
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting Netlify Tokens
1. **Auth Token**: Netlify Dashboard > User settings > Applications > Personal access tokens
2. **Site ID**: Netlify Dashboard > Site settings > General > Site details

## Step 4: Domain Configuration

### Custom Domain (Optional)
1. In Netlify dashboard: Site settings > Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Let's Encrypt)

### DNS Configuration
For `pcfginsurance.com`:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

## Step 5: Form Configuration

Forms are automatically configured via `netlify.toml`. Verify in Netlify dashboard:
- Site settings > Forms
- Should show all 9 forms listed
- Enable reCAPTCHA spam filtering
- Set up form notifications (email/Slack)

## Step 6: Continuous Deployment

### Automatic Deployments
- Push to `main` branch = Production deployment
- Pull requests = Deploy previews
- All branches = Branch deploys (optional)

### Deployment Settings
Configure in Netlify dashboard:
- Site settings > Build & deploy
- Build hooks for external triggers
- Deploy notifications
- Build plugins (if needed)

## Step 7: Monitoring & Analytics

### Build Monitoring
- Netlify Dashboard > Deploys (build logs and status)
- GitHub Actions tab (if using GitHub workflows)
- Email notifications for failed builds

### Performance Monitoring
- Netlify Analytics (paid feature)
- Google Analytics (already integrated)
- Core Web Vitals monitoring

## Troubleshooting

### Common Build Issues

1. **Monorepo Base Directory Issues**:
   ```bash
   # If your project is in a subdirectory, update netlify.toml:
   [build]
     base = "path/to/your/project"
     command = "npm run build"
     publish = "dist"
   ```
   - Ensure the base directory path is correct relative to repository root
   - All other paths in netlify.toml should be relative to the base directory
   - Package.json should be in the base directory

1. **Node Version Mismatch**:
   ```bash
   # Check netlify.toml has correct Node version
   NODE_VERSION = "18"
   ```

2. **Missing Environment Variables**:
   - Verify all required env vars are set in Netlify
   - Check variable names match exactly

3. **Build Command Fails**:
   ```bash
   # Test locally first
   npm install
   npm run build
   ```

4. **Form Submissions Not Working**:
   - Verify `data-netlify="true"` on forms
   - Check form names match netlify.toml
   - Ensure reCAPTCHA is properly configured

### Environment-Specific Issues

#### Production
- Check environment variables in Netlify
- Verify custom domain DNS settings
- Review build logs for errors

#### Deploy Previews
- Ensure pull request builds pass
- Check preview URL in GitHub PR comments
- Test forms on preview deployments

#### Branch Deploys
- Configure branch deploy settings
- Set up branch protection rules
- Monitor build performance

## Security Considerations

### Secrets Management
- Never commit sensitive data to repository
- Use environment variables for all secrets
- Rotate tokens regularly
- Use least-privilege access

### Build Security
- Pin Node.js version in netlify.toml
- Use `npm ci` for consistent installs
- Monitor for security vulnerabilities
- Keep dependencies updated

## Performance Optimization

### Build Performance
- Enable build caching
- Use incremental builds (when available)
- Monitor build times
- Optimize asset pipeline

### Runtime Performance
- CDN automatically enabled
- Asset optimization via Netlify
- Image optimization available
- Edge functions for dynamic content

## Rollback Procedures

### Quick Rollback
1. Netlify Dashboard > Deploys
2. Find previous successful deploy
3. Click "Publish deploy"

### Git Rollback
```bash
# Revert specific commit
git revert <commit-hash>
git push origin main

# Reset to previous commit (careful!)
git reset --hard <commit-hash>
git push --force origin main
```

## Maintenance

### Regular Tasks
- Monitor build performance
- Review form submissions
- Update dependencies monthly
- Check security headers
- Monitor site performance

### Updates
- Test changes in deploy previews
- Use feature branches for major changes
- Monitor post-deployment for issues
- Keep documentation updated

## Support

### Netlify Support
- Community forums
- Documentation
- Support tickets (paid plans)

### GitHub Support
- Community discussions
- GitHub documentation
- Action marketplace

### Emergency Contacts
- Primary: (877) 717-7234
- Email: info@pcfginsurance.com
- Emergency escalation procedures