# Supabase Form Submission Queries

This document shows the JavaScript queries used to send data from each form to their respective Supabase database tables.

## 1. Quick Quote Form → `quote_forms` table

```javascript
const { data, error } = await supabase
  .from('quote_forms')
  .insert([{
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    business_name: formData['business-name'],
    insurance_type: formData['insurance-type'],
    message: formData.message,
    tag: 'quick-quote'
  }]);
```

## 2. Contact Form → `contact_forms` table

```javascript
const { data, error } = await supabase
  .from('contact_forms')
  .insert([{
    first_name: formData['first-name'],
    last_name: formData['last-name'],
    email: formData.email,
    phone: formData.phone,
    state: formData.state,
    company: formData.company,
    insurance_type: formData['insurance-type'],
    industry: formData.industry,
    message: formData.message,
    preferred_contact: formData['preferred-contact'] || 'either',
    tag: 'contact'
  }]);
```

## 3. Commercial Quote Form → `commercial_quotes` table

```javascript
const { data, error } = await supabase
  .from('commercial_quotes')
  .insert([{
    first_name: formData['first-name'],
    last_name: formData['last-name'],
    business_name: formData['business-name'],
    email: formData.email,
    phone: formData.phone,
    business_address: formData['business-address'],
    city: formData.city,
    state: formData.state,
    zip_code: formData['zip-code'],
    industry: formData.industry,
    employees: formData.employees,
    insurance_types: formData['insurance-types'], // JSONB array
    years_in_business: formData['years-in-business'],
    annual_revenue: formData['annual-revenue'],
    business_description: formData['business-description'],
    current_coverage: formData['current-coverage'],
    preferred_contact_method: formData['preferred-contact-method'] || 'either',
    additional_needs: formData['additional-needs'],
    best_time_to_call: formData['best-time-to-call'],
    tag: 'commercial-quote'
  }]);
```

## 4. Workers' Compensation Lead → `workers_comp_leads` table

```javascript
const { data, error } = await supabase
  .from('workers_comp_leads')
  .insert([{
    first_name: formData['first-name'],
    last_name: formData['last-name'],
    business_name: formData['business-name'],
    email: formData.email,
    phone: formData.phone,
    tag: 'work-comp'
  }]);
```

## 5. Commercial Auto Lead → `commercial_auto_leads` table

```javascript
const { data, error } = await supabase
  .from('commercial_auto_leads')
  .insert([{
    first_name: formData['first-name'],
    last_name: formData['last-name'],
    business_name: formData['business-name'],
    email: formData.email,
    phone: formData.phone,
    tag: 'commercial-auto'
  }]);
```

## 6. General Liability Lead → `general_liability_leads` table

```javascript
const { data, error } = await supabase
  .from('general_liability_leads')
  .insert([{
    first_name: formData['first-name'],
    last_name: formData['last-name'],
    business_name: formData['business-name'],
    email: formData.email,
    phone: formData.phone,
    tag: 'general-liability'
  }]);
```

## 7. BOP Lead → `bop_leads` table

```javascript
const { data, error } = await supabase
  .from('bop_leads')
  .insert([{
    first_name: formData['first-name'],
    last_name: formData['last-name'],
    business_name: formData['business-name'],
    email: formData.email,
    phone: formData.phone,
    tag: 'business-owners-policy'
  }]);
```

## 8. Personal Lines Quote → `personal_lines_quotes` table

```javascript
const { data, error } = await supabase
  .from('personal_lines_quotes')
  .insert([{
    first_name: formData['first-name'],
    last_name: formData['last-name'],
    email: formData.email,
    phone: formData.phone,
    date_of_birth: formData['date-of-birth'],
    marital_status: formData['marital-status'],
    street_address: formData['street-address'],
    city: formData.city,
    state: formData.state,
    zip_code: formData['zip-code'],
    residence_type: formData['residence-type'],
    years_at_address: parseInt(formData['years-at-address']) || null,
    insurance_types: formData['insurance-types'], // JSONB array
    current_carrier: formData['current-carrier'],
    coverage_start_date: formData['coverage-start-date'],
    vehicle_year: parseInt(formData['vehicle-year']) || null,
    vehicle_make: formData['vehicle-make'],
    vehicle_model: formData['vehicle-model'],
    vehicle_usage: formData['vehicle-usage'],
    annual_mileage: parseInt(formData['annual-mileage']) || null,
    home_year_built: parseInt(formData['home-year-built']) || null,
    home_square_feet: parseInt(formData['home-square-feet']) || null,
    home_construction_type: formData['home-construction-type'],
    home_purchase_price: formData['home-purchase-price'],
    current_premium: formData['current-premium'],
    reason_for_quote: formData['reason-for-quote'],
    additional_coverage: formData['additional-coverage'],
    preferred_contact_method: formData['preferred-contact-method'] || 'either',
    tag: 'personal-lines-quote'
  }]);
```

## 9. Claim Report → `claim_reports` table

```javascript
const { data, error } = await supabase
  .from('claim_reports')
  .insert([{
    policy_number: formData['policy-number'],
    insured_name: formData['insured-name'],
    claim_type: formData['claim-type'],
    loss_date: formData['loss-date'],
    loss_time: formData['loss-time'],
    loss_location: formData['loss-location'],
    loss_description: formData['loss-description'],
    injuries: formData.injuries === 'true',
    police_report: formData['police-report'] === 'true',
    contact_phone: formData['contact-phone'],
    tag: 'claim-report'
  }]);
```

## 10. Career Application → `career_applications` table

```javascript
const { data, error } = await supabase
  .from('career_applications')
  .insert([{
    first_name: formData['first-name'],
    last_name: formData['last-name'],
    email: formData.email,
    phone: formData.phone,
    position: formData.position,
    location: formData.location,
    experience: formData.experience,
    licenses: formData.licenses,
    cover_letter: formData['cover-letter'],
    referral: formData.referral,
    consent: formData.consent === 'on',
    tag: 'career-application'
  }]);
```

## Generic Function Usage

The existing `submitToSupabase()` function in `src/utils/supabase.js` handles all these forms automatically:

```javascript
// Example usage for any form
try {
  const result = await submitToSupabase(formData, 'form_type');
  console.log('Success:', result);
} catch (error) {
  console.error('Error:', error);
}
```

**Form Types:**
- `quick_quote_form` → `quote_forms`
- `contact_form` → `contact_forms`
- `commercial_quote` → `commercial_quotes`
- `workers_comp_lead` → `workers_comp_leads`
- `commercial_auto_lead` → `commercial_auto_leads`
- `general_liability_lead` → `general_liability_leads`
- `bop_lead` → `bop_leads`
- `personal_lines_quote` → `personal_lines_quotes`
- `claim_report` → `claim_reports`
- `career_application` → `career_applications`

## Error Handling

All queries should include proper error handling:

```javascript
try {
  const { data, error } = await supabase
    .from('table_name')
    .insert([formData]);
    
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  console.log('Data inserted successfully:', data);
  return data;
} catch (error) {
  console.error('Form submission failed:', error);
  throw error;
}
```

## Notes

- All tables have Row Level Security (RLS) enabled
- Anonymous users can INSERT into all tables (required for public forms)
- Authenticated users can SELECT from all tables (for admin access)
- The `submitToSupabase()` function handles field name conversion from kebab-case to snake_case automatically
- JSONB fields like `insurance_types` should be arrays
- Boolean fields are properly converted from form string values
- All tables include automatic `created_at` and `updated_at` timestamps