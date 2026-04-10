import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://pcfginsurance.com';
  const currentDate = new Date().toISOString();

  const blogPosts = await getCollection('blog');
  const blogEntries = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastmod: post.data.pubDate ? post.data.pubDate.toISOString() : currentDate,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  // All pages with proper priority and change frequency according to Google guidelines
  const pages = [
    // Homepage - highest priority
    { url: '', lastmod: currentDate, changefreq: 'weekly', priority: '1.0' },

    // Main service pages - high priority
    { url: '/services', lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { url: '/contact', lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { url: '/commercial-quote', lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { url: '/personal-lines-quote', lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },

    // About pages
    { url: '/about', lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { url: '/the-team', lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { url: '/careers', lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },

    // Personal Insurance
    { url: '/personal-insurance', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/auto-insurance', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/homeowners-insurance', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/life-insurance', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/health-insurance', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/long-term-care-insurance', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/critical-illness-insurance', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { url: '/annuities', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { url: '/life-insurance-needs-analysis', lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },

    // Commercial Insurance
    { url: '/business-owners-policy', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/commercial-auto', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/general-liability', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/workers-compensation', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },

    // Employee Benefits
    { url: '/employee-benefits', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { url: '/vitaledge', lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { url: '/cyberpartners', lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },

    // Other pages
    { url: '/industries', lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { url: '/client-services', lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { url: '/blog', lastmod: currentDate, changefreq: 'weekly', priority: '0.6' },

    // Legal pages
    { url: '/privacy', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { url: '/terms', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { url: '/security-policy', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },
    { url: '/accessibility', lastmod: currentDate, changefreq: 'yearly', priority: '0.3' },

    // Blog posts (dynamically loaded)
    ...blogEntries,
  ];

  // Generate XML according to Google's sitemap protocol
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex'
    }
  });
};
