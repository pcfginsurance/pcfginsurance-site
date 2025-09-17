// Location Detection and Dynamic Content Utility

/**
 * Get user's location and return personalized content
 * @returns {Promise<Object>} Location data and personalized content
 */
export async function getUserLocationContent() {
  const defaultContent = {
    state: 'Multiple States',
    city: 'Central New York',
    heroTitle: 'PCFG Insurance Services - Parish NY | Insurance Agency Serving 15 States',
    heroSubtitle: 'Protecting What Matters Most to Your Business and Family - Comprehensive Insurance Solutions Across 15 States',
    localMessage: 'Serving businesses and families across 15 states from our Central New York location.',
    isLicensedState: true
  };

  try {
    // First try to get location from IP geolocation
    const locationData = await getLocationFromIP();
    
    if (locationData && locationData.state) {
      return generatePersonalizedContent(locationData, defaultContent);
    }
    
    // Fallback to browser geolocation if IP detection fails
    const browserLocation = await getBrowserLocation();
    if (browserLocation) {
      return generatePersonalizedContent(browserLocation, defaultContent);
    }
    
    return defaultContent;
  } catch (error) {
    console.warn('Location detection failed, using default content:', error);
    return defaultContent;
  }
}

/**
 * Get location from IP address using a free geolocation service
 * @returns {Promise<Object|null>} Location data or null
 */
async function getLocationFromIP() {
  try {
    // Using ipapi.co (free tier: 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/', {
      timeout: 3000
    });
    
    if (!response.ok) {
      throw new Error('IP geolocation service unavailable');
    }
    
    const data = await response.json();
    
    return {
      city: data.city,
      state: data.region,
      stateCode: data.region_code,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude
    };
  } catch (error) {
    console.warn('IP geolocation failed:', error);
    return null;
  }
}

/**
 * Get location from browser geolocation API
 * @returns {Promise<Object|null>} Location data or null
 */
async function getBrowserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Reverse geocode coordinates to get city/state
          const { latitude, longitude } = position.coords;
          const locationData = await reverseGeocode(latitude, longitude);
          resolve(locationData);
        } catch (error) {
          console.warn('Reverse geocoding failed:', error);
          resolve(null);
        }
      },
      (error) => {
        console.warn('Browser geolocation failed:', error);
        resolve(null);
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  });
}

/**
 * Reverse geocode coordinates to city/state
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<Object|null>} Location data or null
 */
async function reverseGeocode(lat, lng) {
  try {
    // Using OpenStreetMap Nominatim (free)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'PCFG Insurance Services Website'
        }
      }
    );
    
    const data = await response.json();
    
    return {
      city: data.address?.city || data.address?.town || data.address?.village,
      state: data.address?.state,
      stateCode: getStateCode(data.address?.state),
      country: data.address?.country
    };
  } catch (error) {
    console.warn('Reverse geocoding failed:', error);
    return null;
  }
}

/**
 * Generate personalized content based on user location
 * @param {Object} locationData - User's location data
 * @param {Object} defaultContent - Default content fallback
 * @returns {Object} Personalized content
 */
function generatePersonalizedContent(locationData, defaultContent) {
  const { city, state, stateCode } = locationData;
  
  // Check if user is in one of our licensed states
  const licensedStates = [
    'Alabama', 'Arizona', 'Florida', 'Georgia', 'Indiana',
    'Maryland', 'Maine', 'New Jersey', 'New York', 'North Carolina',
    'Ohio', 'Pennsylvania', 'Tennessee', 'Texas', 'Virginia'
  ];
  
  const licensedStateCodes = [
    'AL', 'AZ', 'FL', 'GA', 'IN', 'MD', 'ME', 'NJ', 'NY', 'NC', 'OH', 'PA', 'TN', 'TX', 'VA'
  ];
  
  const isLicensedState = licensedStates.includes(state) || licensedStateCodes.includes(stateCode);
  
  if (!isLicensedState) {
    return {
      ...defaultContent,
      localMessage: `While we're not currently licensed in ${state || 'your state'}, we serve 15 states and may be able to help with multi-state business needs.`,
      isLicensedState: false
    };
  }
  
  // Generate personalized content for licensed states
  const stateSpecificContent = getStateSpecificContent(state, stateCode, city);
  
  return {
    state: state || stateCode,
    city: city || 'your area',
    heroTitle: stateSpecificContent.heroTitle,
    heroSubtitle: stateSpecificContent.heroSubtitle,
    localMessage: stateSpecificContent.localMessage,
    isLicensedState: true,
    ctaText: stateSpecificContent.ctaText
  };
}

/**
 * Get state-specific content variations
 * @param {string} state - Full state name
 * @param {string} stateCode - State abbreviation
 * @param {string} city - City name
 * @returns {Object} State-specific content
 */
function getStateSpecificContent(state, stateCode, city) {
  const stateDisplay = state || stateCode;
  const cityDisplay = city ? `${city}, ${stateDisplay}` : stateDisplay;
  
  // Special handling for New York (our home state)
  if (state === 'New York' || stateCode === 'NY') {
    const nyContent = getNYSpecificContent(city);
    if (nyContent) return nyContent;
  }
  
  // General state-specific content
  return {
    heroTitle: `${stateDisplay} Insurance Services - PCFG Insurance Licensed in ${stateDisplay}`,
    heroSubtitle: `Protecting businesses and families in ${cityDisplay} with comprehensive insurance solutions. Licensed and ready to serve you.`,
    localMessage: `Proudly serving ${cityDisplay} and surrounding areas with expert insurance solutions tailored to local needs.`,
    ctaText: `Get Your Free ${stateDisplay} Insurance Quote`
  };
}

/**
 * Get New York specific content with major city targeting
 * @param {string} city - City name in NY
 * @returns {Object|null} NY-specific content or null
 */
function getNYSpecificContent(city) {
  const majorNYCities = {
    'Syracuse': {
      heroTitle: 'Syracuse NY Insurance Agency - PCFG Insurance Services Central NY',
      heroSubtitle: 'Protecting Syracuse businesses and families with comprehensive insurance solutions. Local expertise, competitive rates.',
      localMessage: 'Proudly serving Syracuse, Central New York, and the greater CNY region with expert insurance solutions.',
      ctaText: 'Get Your Free Syracuse Insurance Quote'
    },
    'Rochester': {
      heroTitle: 'Rochester NY Insurance Services - PCFG Insurance Western NY',
      heroSubtitle: 'Comprehensive insurance solutions for Rochester businesses and families. Expert service throughout Western New York.',
      localMessage: 'Serving Rochester, Western New York, and surrounding communities with personalized insurance protection.',
      ctaText: 'Get Your Free Rochester Insurance Quote'
    },
    'Buffalo': {
      heroTitle: 'Buffalo NY Insurance Agency - PCFG Insurance Western NY',
      heroSubtitle: 'Protecting Buffalo businesses and families with comprehensive insurance coverage. Licensed throughout Western New York.',
      localMessage: 'Proudly serving Buffalo, Niagara Falls, and all of Western New York with expert insurance solutions.',
      ctaText: 'Get Your Free Buffalo Insurance Quote'
    },
    'Albany': {
      heroTitle: 'Albany NY Insurance Services - PCFG Insurance Capital Region',
      heroSubtitle: 'Comprehensive insurance solutions for Albany area businesses and families. Expert service throughout the Capital Region.',
      localMessage: 'Serving Albany, Troy, Schenectady, and the entire Capital Region with personalized insurance protection.',
      ctaText: 'Get Your Free Albany Insurance Quote'
    },
    'Utica': {
      heroTitle: 'Utica NY Insurance Agency - PCFG Insurance Central NY',
      heroSubtitle: 'Protecting Utica businesses and families with comprehensive insurance solutions. Local expertise in Central New York.',
      localMessage: 'Serving Utica, Rome, and the greater Mohawk Valley with expert insurance solutions.',
      ctaText: 'Get Your Free Utica Insurance Quote'
    },
    'Binghamton': {
      heroTitle: 'Binghamton NY Insurance Services - PCFG Insurance Southern Tier',
      heroSubtitle: 'Comprehensive insurance solutions for Binghamton area businesses and families. Expert service throughout Southern Tier NY.',
      localMessage: 'Serving Binghamton, Endicott, Johnson City, and the Southern Tier with personalized insurance protection.',
      ctaText: 'Get Your Free Binghamton Insurance Quote'
    }
  };
  
  return majorNYCities[city] || {
    heroTitle: 'New York Insurance Services - PCFG Insurance Licensed in NY',
    heroSubtitle: 'Protecting New York businesses and families with comprehensive insurance solutions. Licensed throughout New York State.',
    localMessage: `Serving ${city || 'your area'} and all of New York State with expert insurance solutions from our Central NY location.`,
    ctaText: 'Get Your Free New York Insurance Quote'
  };
}

/**
 * Convert state name to state code
 * @param {string} stateName - Full state name
 * @returns {string} State code
 */
function getStateCode(stateName) {
  const stateMap = {
    'Alabama': 'AL', 'Arizona': 'AZ', 'Florida': 'FL', 'Georgia': 'GA',
    'Indiana': 'IN', 'Maryland': 'MD', 'Maine': 'ME', 'New Jersey': 'NJ',
    'New York': 'NY', 'North Carolina': 'NC', 'Ohio': 'OH', 'Pennsylvania': 'PA',
    'Tennessee': 'TN', 'Texas': 'TX', 'Virginia': 'VA'
  };
  
  return stateMap[stateName] || '';
}

/**
 * Cache location data to avoid repeated API calls
 * @param {Object} locationData - Location data to cache
 */
function cacheLocationData(locationData) {
  try {
    localStorage.setItem('pcfg_user_location', JSON.stringify({
      ...locationData,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn('Failed to cache location data:', error);
  }
}

/**
 * Get cached location data if still valid
 * @returns {Object|null} Cached location data or null
 */
function getCachedLocationData() {
  try {
    const cached = localStorage.getItem('pcfg_user_location');
    if (!cached) return null;
    
    const data = JSON.parse(cached);
    const oneHour = 60 * 60 * 1000;
    
    // Cache is valid for 1 hour
    if (Date.now() - data.timestamp < oneHour) {
      return data;
    }
    
    // Clear expired cache
    localStorage.removeItem('pcfg_user_location');
    return null;
  } catch (error) {
    console.warn('Failed to get cached location data:', error);
    return null;
  }
}

// Make functions available globally
if (typeof window !== 'undefined') {
  window.locationUtils = {
    getUserLocationContent,
    cacheLocationData,
    getCachedLocationData
  };
}