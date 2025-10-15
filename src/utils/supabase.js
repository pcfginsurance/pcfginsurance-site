import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase credentials are configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Forms will use webhook only.');
} else {
  console.log('Supabase credentials found:', { url: supabaseUrl.substring(0, 20) + '...', key: supabaseAnonKey.substring(0, 20) + '...' });
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit form data to the appropriate Supabase table
 * @param {Object} data - The form data to submit
 * @param {string} formType - The type of form being submitted
 * @returns {Promise} - The Supabase insert promise
 */
export async function submitToSupabase(data, formType) {
  // If Supabase is not configured, skip Supabase submission
  if (!supabase) {
    console.log('Supabase not configured, skipping database submission');
    return { success: true, message: 'Form submitted successfully' };
  }
  
  let tableName;
  let formattedData = { ...data };
  
  // Determine which table to insert into based on form type
  switch (formType) {
    case 'contact_form':
      tableName = 'contact_forms';
      break;
    case 'commercial_quote':
      tableName = 'commercial_quotes';
      break;
    case 'personal_lines_quote':
      tableName = 'personal_lines_quotes';
      break;
    case 'life_insurance_quote':
      tableName = 'life_insurance_quotes';
      break;
    case 'certificate_request':
      tableName = 'certificate_requests';
      break;
    case 'service_request':
      tableName = 'service_requests';
      break;
    case 'claim_report':
      tableName = 'claim_reports';
      break;
    case 'quick_quote_form':
      tableName = 'quote_forms';
      break;
    case 'workers_comp_lead':
      tableName = 'workers_comp_leads';
      break;
    case 'commercial_auto_lead':
      tableName = 'commercial_auto_leads';
      break;
    case 'general_liability_lead':
      tableName = 'general_liability_leads';
      break;
    case 'bop_lead':
      tableName = 'bop_leads';
      break;
    default:
      tableName = 'contact_forms';
  }
  
  // Add tag based on form type
  let tag = '';
  switch (formType) {
    case 'workers_comp_lead':
      tag = 'work-comp';
      break;
    case 'commercial_auto_lead':
      tag = 'commercial-auto';
      break;
    case 'general_liability_lead':
      tag = 'general-liability';
      break;
    case 'bop_lead':
      tag = 'business-owners-policy';
      break;
    case 'contact_form':
      tag = 'contact';
      break;
    case 'quick_quote_form':
      tag = 'quick-quote';
      break;
    case 'commercial_quote':
      tag = 'commercial-quote';
      break;
    default:
      tag = formType.replace(/_/g, '-');
  }
  
  // Add tag to data
  formattedData.tag = tag;
  
  // Format data for specific tables if needed
  if (formType === 'commercial_quote' && formattedData['insurance-types']) {
    // Convert insurance-types to JSON array if it's a string
    if (typeof formattedData['insurance-types'] === 'string') {
      formattedData.insurance_types = [formattedData['insurance-types']];
    } else {
      formattedData.insurance_types = formattedData['insurance-types'];
    }
    delete formattedData['insurance-types'];
  }
  
  // Convert kebab-case to snake_case for all properties
  const snakeCaseData = {};
  Object.keys(formattedData).forEach(key => {
    const snakeKey = key.replace(/-/g, '_');
    snakeCaseData[snakeKey] = formattedData[key];
  });
  
  try {
    console.log(`Submitting to Supabase table ${tableName}:`, snakeCaseData);
    
    const { data, error } = await supabase
      .from(tableName)
      .insert([snakeCaseData]);
    
    if (error) {
      console.error('Supabase submission error:', error);
      throw error;
    }
    
    console.log('Supabase submission successful:', data);
    return data;
  } catch (error) {
    console.error('Error submitting to Supabase:', error);
    throw error;
  }
}

/**
 * Check if a lead already exists in the database
 * @param {string} email - The email to check
 * @param {string} businessName - The business name to check (for commercial leads)
 * @param {string} leadType - The type of lead to check
 * @returns {Promise<Object|null>} - The existing lead or null if not found
 */
export async function checkExistingLead(email, businessName, leadType) {
  if (!supabase) {
    console.log('Supabase not configured, skipping lead check');
    return null;
  }
  
  let tableName;
  
  switch (leadType) {
    case 'workers_comp_lead':
      tableName = 'workers_comp_leads';
      break;
    case 'commercial_auto_lead':
      tableName = 'commercial_auto_leads';
      break;
    case 'general_liability_lead':
      tableName = 'general_liability_leads';
      break;
    case 'bop_lead':
      tableName = 'bop_leads';
      break;
    case 'contact_form':
      tableName = 'contact_forms';
      break;
    case 'quick_quote_form':
      tableName = 'quote_forms';
      break;
    default:
      return null;
  }
  
  try {
    let query = supabase
      .from(tableName)
      .select('*')
      .eq('email', email);
    
    // Add business name filter for commercial leads
    if (businessName && ['workers_comp_lead', 'commercial_auto_lead', 'general_liability_lead', 'bop_lead'].includes(leadType)) {
      query = query.eq('business_name', businessName);
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) {
      console.error('Error checking existing lead:', error);
      return null;
    }
    
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error checking existing lead:', error);
    return null;
  }
}

/**
 * Link a quote to an existing lead
 * @param {string} quoteId - The ID of the quote
 * @param {string} leadId - The ID of the lead
 * @param {string} leadSource - The source table of the lead
 * @param {string} quoteType - The type of quote
 * @returns {Promise} - The Supabase update promise
 */
export async function linkQuoteToLead(quoteId, leadId, leadSource, quoteType) {
  if (!supabase) {
    console.log('Supabase not configured, skipping lead linking');
    return null;
  }
  
  let tableName;
  
  switch (quoteType) {
    case 'commercial_quote':
      tableName = 'commercial_quotes';
      break;
    case 'personal_lines_quote':
      tableName = 'personal_lines_quotes';
      break;
    case 'life_insurance_quote':
      tableName = 'life_insurance_quotes';
      break;
    default:
      return null;
  }
  
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update({
        lead_id: leadId,
        lead_source: leadSource
      })
      .eq('id', quoteId);
    
    if (error) {
      console.error('Error linking quote to lead:', error);
      throw error;
    }
    
    console.log('Quote linked to lead successfully:', data);
    return data;
  } catch (error) {
    console.error('Error linking quote to lead:', error);
    throw error;
  }
}

// Make functions available globally for form scripts
if (typeof window !== 'undefined') {
  window.submitToSupabase = submitToSupabase;
  window.checkExistingLead = checkExistingLead;
  window.linkQuoteToLead = linkQuoteToLead;
}