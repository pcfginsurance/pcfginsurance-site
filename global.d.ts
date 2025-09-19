export {};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    adroll?: any;

    // Your custom globals
    submitToSupabase?: (data: any, table: string) => Promise<any>;
    checkExistingLead?: (lead: any) => Promise<any>;
    linkQuoteToLead?: (leadId: string, quoteId: string) => Promise<any>;
    locationUtils?: {
      getUserLocationContent?: () => Promise<any>;
      getCachedLocationData?: () => any;
      cacheLocationData?: (data: any) => void;
    };
  }
}
