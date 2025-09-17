Goals                                                                                                                                                                                                                              
                                                                                                                                                                                                                                   
- Server-render all static content for SEO and smaller JS bundles.                                                                                                                                                                 
- Isolate interactivity (Calendly popup, lead forms, mobile menu, accordion) into small Client Components.                                                                                                                         
- Preserve current functionality and styling.                                                                                                                                                                                      
                                                                                                                                                                                                                                   
Component Split                                                                                                                                                                                                                    
                                                                                                                                                                                                                                   
- Server Components (no “use client”):                                                                                                                                                                                             
    - HeroSection: headline, subhead, hero copy, hero images.                                                                                                                                                                      
    - LogoMarquee: client logos strip.                                                                                                                                                                                             
    - SixStepsGrid: the 6 steps cards.                                                                                                                                                                                             
    - BroadCapabilities and DomainExpertise: static grids.                                                                                                                                                                         
    - Testimonials (SSR via dynamic import to reduce initial cost).                                                                                                                                                                
    - Footer.                                                                                                                                                                                                                      
- Client Components:                                                                                                                                                                                                               
    - NavBarClient: mobile menu toggle + “Let’s Chat” popup button.                                                                                                                                                                
    - CalendlyButtons: PopupButton(s) with useCalendlyEventListener (tracking).                                                                                                                                                    
    - LeadMagnetModal: “Get 6 Steps” modal (Name + Email) with fetch + confirmation.                                                                                                                                               
    - BottomLeadForm: bottom Name + Email form with fetch + confirmation.                                                                                                                                                          
    - FaqAccordion:                                                                                                                                                                                                                
    - Option A: keep Radix-based accordion as a Client Component.                                                                                                                                                                  
    - Option B (lighter): convert to CSS-only accordion and make it a Server Component.                                                                                                                                            
                                                                                                                                                                                                                                   
Page Refactor Steps                                                                                                                                                                                                                
                                                                                                                                                                                                                                   
- Step 1: Convert app/page.tsx to a Server Component                                                                                                                                                                               
    - Remove "use client" from app/page.tsx.                                                                                                                                                                                       
    - Compose the page entirely from Server Components plus the Client Components listed below.                                                                                                                                    
- Step 2: Extract Client Components                                                                                                                                                                                                
    - components/NavBarClient.tsx:                                                                                                                                                                                                 
    - Contains the hamburger toggle state and the header “Let’s Chat” Calendly `PopupButton`.                                                                                                                                      
- components/CalendlyButtons.tsx:                                                                                                                                                                                                  
    - Renders one or both Calendly `PopupButton`s (header and/or bottom).                                                                                                                                                          
    - Uses `useCalendlyEventListener` to log/track `calendly.*` events.                                                                                                                                                            
- components/LeadMagnetModal.tsx:                                                                                                                                                                                                  
    - Radix Dialog for “Get 6 Steps”, collects Name + Email, POSTs to `/api/lead`, shows “Your 6 Steps Guide is on the way!” on success.                                                                                           
- components/BottomLeadForm.tsx:                                                                                                                                                                                                   
    - Name + Email inputs, POSTs to `/api/lead`, shows the same confirmation.                                                                                                                                                      
- components/FaqAccordion.tsx:                                                                                                                                                                                                     
    - Option A: keep as-is using Radix (Client Component).                                                                                                                                                                         
    - Option B: CSS-only `details/summary` variant (Server Component) to eliminate JS.                                                                                                                                             
- Step 3: Wire the Server Page                                                                                                                                                                                                     
    - app/page.tsx (Server):                                                                                                                                                                                                       
    - Import and place `NavBarClient` at the top (replaces current header).                                                                                                                                                        
    - Use `HeroSection` (Server) and include `LeadMagnetModal` trigger within that section via a Client boundary.                                                                                                                  
    - Use `LogoMarquee`, `SixStepsGrid`, `BroadCapabilities`, `DomainExpertise`, `Testimonials`.                                                                                                                                   
    - In the dual-CTA section, use `BottomLeadForm` (Client) and `CalendlyButtons` (Client) for the “Schedule Now” button.                                                                                                         
- Step 4: Calendly best practice                                                                                                                                                                                                   
    - Use react-calendly PopupButton in the Client Components (no global script tags).                                                                                                                                             
    - Keep rootElement={document.body} inside the Client Component (safe in browser).                                                                                                                                              
    - Keep useCalendlyEventListener in CalendlyButtons to track:                                                                                                                                                                   
    - `onProfilePageViewed`, `onEventTypeViewed`, `onDateAndTimeSelected`, `onEventScheduled`.                                                                                                                                     
- Step 5: Image & Font Optimization                                                                                                                                                                                                
- Hero image:                                                                                                                                                                                                                      
    - Mark the main hero image(s) with priority.                                                                                                                                                                                   
    - Add sizes props to better inform responsive loading.                                                                                                                                                                         
- Fonts:                                                                                                                                                                                                                           
    - In app/layout.tsx, keep Next/font but set display: 'swap' and preload: true on Montserrat/Open Sans.                                                                                                                         
- Step 6: Lazy-load heavy or below-the-fold sections                                                                                                                                                                               
    - Testimonials: next/dynamic with { ssr: true } and a lightweight skeleton to reduce initial JS work while preserving SEO.                                                                                                     
- Step 7: Static generation with revalidation (optional)                                                                                                                                                                           
    - If there’s no per-request data, set export const revalidate = 3600 in app/page.tsx (Server Component).                                                                                                                       
    - This produces a static HTML page that revalidates hourly (great for SEO + performance).                                                                                                                                      
- Step 8: Remove page-level client state                                                                                                                                                                                           
    - Ensure app/page.tsx has no useState, useEffect, or direct DOM access. All such logic lives in the Client Components.                                                                                                         
- Step 9: Verify and measure                                                                                                                                                                                                       
    - Run pnpm lint and pnpm dev.                                                                                                                                                                                                  
    - Submit both lead forms; confirm success messages and email arrives.
    - Measure bundle size and performance:
    - Check initial JS size drops vs. current.
    - Aim for LCP < 2.5s, TTI < 3s on mid-tier devices.

Quick Wins (if you want fast benefits before the full split)

- Add export const revalidate = 3600 to app/page.tsx to enable static HTML output quickly.
- Mark hero images with priority and proper sizes.
- Dynamically import Testimonials with SSR.

Acceptance Criteria

- app/page.tsx is a Server Component with no client-only hooks.
- All interactivity (Calendly, lead forms, mobile menu, accordion if Radix) is isolated to Client Components.
- Calendly works with react-calendly PopupButton and tracking hook.
- Both Name + Email lead flows function and show client-side confirmations.
- Notable drop in initial JS payload; page renders server HTML for SEO.

If you want, I can draft the component skeletons (Server and Client) as a next step and then fill them in incrementally to keep diffs focused and reviewable.