# Internal Linking Implementation Examples

This document provides copy-paste ready code examples for implementing the internal linking strategy across your PCFG Insurance website.

---

## Example 1: Adding Breadcrumbs + SmartNavigation to Business Insurance Page

### File: `src/pages/workers-compensation.astro`

**BEFORE:**
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="Workers Compensation Insurance"
  description="Comprehensive workers' compensation insurance..."
>
  <!-- Page content -->
</Layout>
```

**AFTER:**
```astro
---
import Layout from '../layouts/Layout.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import SmartNavigation from '../components/SmartNavigation.astro';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Business Insurance', href: '/services' },
  { label: 'Workers Compensation', href: '/workers-compensation' }
];
---

<Layout
  title="Workers Compensation Insurance | PCFG Insurance Services"
  description="Comprehensive workers' compensation insurance for New York businesses. Protect your employees and comply with state requirements."
>
  <!-- Add breadcrumbs right after opening Layout -->
  <div class="container mx-auto px-4 py-4">
    <Breadcrumbs items={breadcrumbs} />
  </div>

  <!-- Page content -->
  <section class="py-16">
    <!-- Your existing content -->
  </section>

  <!-- Add SmartNavigation before closing Layout -->
  <SmartNavigation />
</Layout>
```

**Changes made:**
1. ✅ Imported Breadcrumbs component
2. ✅ Imported SmartNavigation component
3. ✅ Defined breadcrumb hierarchy
4. ✅ Added breadcrumbs at top of page
5. ✅ Added SmartNavigation at bottom of page

---

## Example 2: Adding ContextualLinks to Service Page

### File: `src/pages/commercial-auto.astro`

**Add this section before your footer/closing tags:**

```astro
---
import Layout from '../layouts/Layout.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import ContextualLinks from '../components/ContextualLinks.astro';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Business Insurance', href: '/services' },
  { label: 'Commercial Auto', href: '/commercial-auto' }
];
---

<Layout title="Commercial Auto Insurance | PCFG Insurance">
  <div class="container mx-auto px-4 py-4">
    <Breadcrumbs items={breadcrumbs} />
  </div>

  <!-- Your main content here -->
  <section class="py-16">
    <!-- Existing content -->
  </section>

  <!-- Add Related Services section -->
  <section class="bg-gray-50 py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
        Related Business Insurance
      </h2>
      <ContextualLinks
        pageType="business"
        currentService="Commercial Auto"
        className="max-w-6xl mx-auto"
      />
    </div>
  </section>
</Layout>
```

---

## Example 3: Adding Cross-Category Links

### File: `src/pages/business-owners-policy.astro`

**Add this "You May Also Need" section:**

```astro
<!-- Add after main content, before footer -->
<section class="py-16 bg-blue-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-900 mb-4 text-center">
      Complete Your Business Protection
    </h2>
    <p class="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
      A Business Owners Policy is a great start, but most businesses need additional coverage for complete protection.
    </p>

    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- Workers Compensation -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <svg class="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          Workers' Compensation
        </h3>
        <p class="text-gray-600 mb-4">
          Required by law in New York for most businesses. Protects employees and your business from workplace injury costs.
        </p>
        <a href="/workers-compensation" class="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center">
          Learn More
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Commercial Auto -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <svg class="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
        </svg>
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          Commercial Auto Insurance
        </h3>
        <p class="text-gray-600 mb-4">
          If your business owns vehicles or employees drive for work, commercial auto insurance is essential.
        </p>
        <a href="/commercial-auto" class="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center">
          Learn More
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Employee Benefits -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <svg class="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          Employee Benefits
        </h3>
        <p class="text-gray-600 mb-4">
          Attract and retain top talent with competitive health insurance, retirement plans, and other benefits.
        </p>
        <a href="/employee-benefits" class="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center">
          Learn More
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

---

## Example 4: Adding In-Content Contextual Links

### File: `src/pages/general-liability.astro`

**BEFORE:**
```astro
<p class="text-lg text-gray-700 mb-6">
  General liability insurance protects your business from third-party claims
  of bodily injury, property damage, and advertising injury. This is essential
  coverage for businesses in all industries, especially those that interact
  with customers or work at client locations.
</p>
```

**AFTER:**
```astro
<p class="text-lg text-gray-700 mb-6">
  General liability insurance protects your business from third-party claims
  of bodily injury, property damage, and advertising injury. This is essential
  coverage for
  <a href="/industries" class="text-blue-600 hover:underline font-medium">businesses in all industries</a>,
  especially those that interact with customers or work at client locations.
  Many businesses combine general liability with
  <a href="/business-owners-policy" class="text-blue-600 hover:underline font-medium">a Business Owners Policy</a>
  for comprehensive protection.
</p>
```

**More examples:**

```astro
<p class="text-lg text-gray-700 mb-6">
  If your business operates vehicles,
  <a href="/commercial-auto" class="text-blue-600 hover:underline font-medium">commercial auto insurance</a>
  should be part of your coverage plan alongside general liability.
</p>

<p class="text-lg text-gray-700 mb-6">
  Looking for a comprehensive package? Our
  <a href="/business-owners-policy" class="text-blue-600 hover:underline font-medium">Business Owners Policy</a>
  combines general liability with property coverage at a competitive rate.
</p>

<p class="text-lg text-gray-700 mb-6">
  Not sure which coverage is right for your business?
  <a href="/commercial-quote" class="text-blue-600 hover:underline font-medium">Request a free quote</a>
  and we'll help you build the perfect protection plan.
</p>
```

---

## Example 5: Fixing Orphaned Pages

### File: `src/pages/about.astro`

**Add this section to link to /the-team:**

```astro
<!-- Add before footer -->
<section class="py-16 bg-gradient-to-br from-blue-50 to-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">
        Meet the PCFG Insurance Team
      </h2>
      <p class="text-lg text-gray-700 mb-8">
        Our experienced insurance professionals bring decades of combined expertise
        in business insurance, personal insurance, and employee benefits. We're here
        to help you find the right coverage for your unique needs.
      </p>
      <a
        href="/the-team"
        class="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
      >
        View Our Full Team
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>
    </div>
  </div>
</section>
```

### File: `src/pages/life-insurance.astro`

**Add this prominent CTA section to link to /life-insurance-needs-analysis:**

```astro
<!-- Add after main content sections, before final CTA -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        How Much Life Insurance Do You Need?
      </h2>
      <p class="text-xl text-blue-100 mb-8">
        Use our free calculator to determine the right amount of coverage to protect
        your family's financial future. Get a personalized recommendation in minutes.
      </p>
      <a
        href="/life-insurance-needs-analysis"
        class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-xl hover:shadow-2xl text-lg"
      >
        Calculate Your Coverage Needs
        <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
        </svg>
      </a>
    </div>
  </div>
</section>
```

---

## Example 6: Enhanced Footer with All Links

### File: `src/components/Footer.astro`

**Update the footer legal links section:**

```astro
<footer class="bg-gray-900 text-gray-300 py-12">
  <div class="container mx-auto px-4">
    <!-- Main footer content -->
    <div class="grid md:grid-cols-4 gap-8 mb-8">
      <!-- Quick Links Column -->
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><a href="/" class="hover:text-white transition">Home</a></li>
          <li><a href="/about" class="hover:text-white transition">About Us</a></li>
          <li><a href="/the-team" class="hover:text-white transition">Our Team</a></li>
          <li><a href="/services" class="hover:text-white transition">Business Insurance</a></li>
          <li><a href="/personal-insurance" class="hover:text-white transition">Personal Insurance</a></li>
          <li><a href="/employee-benefits" class="hover:text-white transition">Employee Benefits</a></li>
        </ul>
      </div>

      <!-- Resources Column -->
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Resources</h3>
        <ul class="space-y-2">
          <li><a href="/resources" class="hover:text-white transition">Resources & Guides</a></li>
          <li><a href="/insurance-glossary" class="hover:text-white transition">Insurance Glossary</a></li>
          <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
          <li><a href="/industries" class="hover:text-white transition">Industries We Serve</a></li>
          <li><a href="/careers" class="hover:text-white transition">Careers</a></li>
        </ul>
      </div>

      <!-- Client Services Column -->
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Client Services</h3>
        <ul class="space-y-2">
          <li><a href="/client-services" class="hover:text-white transition">Client Portal</a></li>
          <li><a href="/commercial-quote" class="hover:text-white transition">Commercial Quote</a></li>
          <li><a href="/personal-lines-quote" class="hover:text-white transition">Personal Quote</a></li>
          <li><a href="/contact" class="hover:text-white transition">Contact Us</a></li>
        </ul>
      </div>

      <!-- Contact Column -->
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Contact</h3>
        <ul class="space-y-2">
          <li>
            <a href="tel:+13156252621" class="hover:text-white transition">
              (315) 625-2621
            </a>
          </li>
          <li>
            <a href="mailto:info@pcfginsurance.com" class="hover:text-white transition">
              info@pcfginsurance.com
            </a>
          </li>
          <li class="text-gray-400">
            2841 County Route 57<br>
            Parish, NY 13131
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom footer with legal links -->
    <div class="border-t border-gray-700 pt-8">
      <div class="flex flex-wrap justify-center gap-4 text-sm mb-4">
        <a href="/privacy" class="hover:text-white transition">Privacy Policy</a>
        <span class="text-gray-600">•</span>
        <a href="/terms" class="hover:text-white transition">Terms of Service</a>
        <span class="text-gray-600">•</span>
        <a href="/security-policy" class="hover:text-white transition">Security Policy</a>
        <span class="text-gray-600">•</span>
        <a href="/accessibility" class="hover:text-white transition">Accessibility</a>
      </div>
      <p class="text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} PCFG Insurance Services. All rights reserved.
        <br class="sm:hidden">
        <span class="hidden sm:inline">|</span>
        Licensed in Multiple States
      </p>
    </div>
  </div>
</footer>
```

---

## Example 7: Personal Insurance Page Cross-Links

### File: `src/pages/auto-insurance.astro`

**Add this section for cross-selling:**

```astro
<!-- Add after main content -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-4 text-center">
        Save More with Bundled Coverage
      </h2>
      <p class="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Bundle your auto insurance with other policies to save up to 25% on your premiums.
      </p>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Homeowners Bundle -->
        <div class="bg-white rounded-lg shadow-md p-8 border-2 border-transparent hover:border-blue-500 transition">
          <div class="flex items-start mb-4">
            <div class="flex-shrink-0">
              <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Auto + Homeowners Bundle
              </h3>
              <p class="text-gray-600 mb-4">
                The most popular bundle. Protect your home and vehicles with one policy and enjoy significant savings.
              </p>
              <ul class="space-y-2 mb-4">
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Save up to 25% on both policies
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  One bill, one agent, one call
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Simplified claims process
                </li>
              </ul>
              <a href="/homeowners-insurance" class="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center">
                Learn About Homeowners Insurance
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Life Insurance -->
        <div class="bg-white rounded-lg shadow-md p-8 border-2 border-transparent hover:border-blue-500 transition">
          <div class="flex items-start mb-4">
            <div class="flex-shrink-0">
              <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Add Life Insurance Protection
              </h3>
              <p class="text-gray-600 mb-4">
                While auto insurance protects your vehicle, life insurance protects your family's financial future.
              </p>
              <ul class="space-y-2 mb-4">
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Protect your family's finances
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Term and permanent options
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Affordable monthly premiums
                </li>
              </ul>
              <a href="/life-insurance" class="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center">
                Explore Life Insurance Options
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Example 8: Resource Page with InternalLinkHub Sidebar

### File: `src/pages/blog.astro`

**Add sidebar with link hub:**

```astro
---
import Layout from '../layouts/Layout.astro';
import InternalLinkHub from '../components/InternalLinkHub.astro';
---

<Layout title="Insurance Blog & Articles | PCFG Insurance">
  <div class="container mx-auto px-4 py-12">
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Main content area -->
      <div class="lg:col-span-2">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Insurance Blog</h1>
        <p class="text-xl text-gray-600 mb-12">
          Expert insights and tips on business insurance, personal insurance, and risk management.
        </p>

        <!-- Blog posts would go here -->
        <div class="space-y-8">
          <!-- Blog post cards -->
        </div>
      </div>

      <!-- Sidebar with InternalLinkHub -->
      <aside class="lg:col-span-1">
        <div class="sticky top-4 space-y-6">
          <!-- Quick Links Hub -->
          <InternalLinkHub
            variant="sidebar"
            maxLinks={6}
            className="bg-white rounded-lg shadow-lg p-6"
          />

          <!-- CTA Box -->
          <div class="bg-blue-600 text-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-3">Need Coverage?</h3>
            <p class="mb-4">Get a free quote in minutes.</p>
            <a
              href="/commercial-quote"
              class="block w-full bg-white text-blue-600 text-center py-2 rounded font-semibold hover:bg-gray-100 transition mb-2"
            >
              Business Quote
            </a>
            <a
              href="/personal-lines-quote"
              class="block w-full bg-blue-700 text-white text-center py-2 rounded font-semibold hover:bg-blue-800 transition"
            >
              Personal Quote
            </a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</Layout>
```

---

## Quick Reference: Component Usage

### SmartNavigation
```astro
import SmartNavigation from '../components/SmartNavigation.astro';

<!-- Add before closing Layout tag -->
<SmartNavigation />
```

### ContextualLinks
```astro
import ContextualLinks from '../components/ContextualLinks.astro';

<ContextualLinks
  pageType="business|personal|benefits|service|quote|general"
  currentService="Service Name"
  className="optional-classes"
/>
```

### InternalLinkHub
```astro
import InternalLinkHub from '../components/InternalLinkHub.astro';

<InternalLinkHub
  variant="sidebar|footer|inline|related"
  maxLinks={4-8}
  className="optional-classes"
/>
```

### Breadcrumbs
```astro
import Breadcrumbs from '../components/Breadcrumbs.astro';

<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Current Page', href: '/current-page' }
]} />
```

---

## Testing Checklist

After implementing internal links:

- [ ] All links work correctly (no 404s)
- [ ] Breadcrumbs show correct hierarchy
- [ ] SmartNavigation suggests relevant pages
- [ ] ContextualLinks show appropriate related content
- [ ] Links have proper hover states
- [ ] Links are keyboard accessible (test with Tab key)
- [ ] Screen reader announces links correctly
- [ ] Mobile responsiveness looks good
- [ ] Page load speed not negatively impacted
- [ ] Schema.org markup validates (for breadcrumbs)

---

## Rollout Plan

**Week 1: Test on 3 pages**
- /workers-compensation
- /auto-insurance
- /about

**Week 2: Deploy to all service pages (20 pages)**
- All business insurance pages
- All personal insurance pages
- All life & health pages

**Week 3: Deploy to remaining pages (20 pages)**
- Company pages
- Resource pages
- Legal pages

**Week 4: Monitor & optimize**
- Check analytics
- Fix any issues
- Optimize based on user behavior