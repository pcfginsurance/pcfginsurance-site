import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('Quote form script loaded');
console.log('Supabase config:', { url: supabaseUrl, hasKey: !!supabaseKey });

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('hero-lead-form') as HTMLFormElement;
const messageDiv = document.getElementById('hero-form-message') as HTMLDivElement;

if (form) {
  console.log('Form found, attaching event listener');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || null,
      insurance_type: formData.get('insurance_type'),
      message: formData.get('message') || null,
      city: null,
      state: null,
      ip_address: null,
      user_agent: navigator.userAgent
    };

    try {
      console.log('Submitting to Supabase:', data);
      const { data: result, error } = await supabase
        .from('lead_submissions')
        .insert([data])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Successfully submitted to Supabase:', result);
      messageDiv.textContent = "Thank you! We'll contact you soon.";
      messageDiv.className = 'text-sm text-green-600 bg-green-50 p-3 rounded-md';
      messageDiv.classList.remove('hidden');

      form.reset();

      setTimeout(() => messageDiv.classList.add('hidden'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      messageDiv.textContent =
        'Sorry, there was an error. Please try again or call us at (877) 717-7234.';
      messageDiv.className = 'text-sm text-red-600 bg-red-50 p-3 rounded-md';
      messageDiv.classList.remove('hidden');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
} else {
  console.error('Form not found!');
}
