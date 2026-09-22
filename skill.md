# Skill: Personal Digital Contact Card Website

## 0. Project Goal

Build a polished, minimal, responsive personal digital contact website for **Kongkham Luangkhot**.

The website is intended to function as a **professional digital business card / lightweight Linktree-style contact page**, not as a traditional portfolio or resume website.

The site will be demonstrated at a **career event**, so prioritize:

1. Professional appearance
2. Excellent mobile experience
3. Fast loading
4. Clear contact information
5. Easy maintenance
6. Reliable links and interactions
7. Dark/light theme support
8. A clean QR-code sharing workflow

The final site should allow someone to understand within a few seconds:

- Who is this person?
- What is their professional background?
- How can I contact them?

Keep the design focused on those goals.

---

# 1. Central Configuration / Content Management

## 1.1 Single Source of Truth

Create **one central configuration file** containing all user-editable information.

Recommended location:

```text
src/config/siteConfig.js
```

If the selected framework has a better convention, use the appropriate equivalent, but there must be **one obvious source of truth**.

The owner should be able to update the website by editing the configuration file only.

They should NOT need to search through components, pages, CSS, or application logic to change:

- Name
- Previous employers
- Education
- Profile image
- Email
- Phone
- LinkedIn
- GitHub
- Resume
- Website URL
- Link labels
- Link visibility
- Feature visibility
- Default theme
- Site metadata

## 1.2 Example Configuration

Use a structure similar to:

```js
export const siteConfig = {
  profile: {
    name: "Kongkham Luangkhot",
    previous: ["Previously @ RBC", "Raptor Integration", "Kii Health"],
    education: "Computing Science @ Simon Fraser University",
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=320&q=85"
  },

  contact: {
    email: "kongkham.luangkhot@gmail.com",
    phone: "+1 (778) 952-3849"
  },

  links: [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/kongkhamlk/",
      icon: "linkedin",
      enabled: true,
      external: true
    },
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/kongkham-lk",
      icon: "github",
      enabled: true,
      external: true
    },
    {
      id: "resume",
      label: "Resume",
      url: "/resume.pdf",
      icon: "file",
      enabled: true,
      external: false
    },
    {
      id: "email",
      label: "Email",
      url: "mailto:kongkham.luangkhot@gmail.com",
      icon: "mail",
      enabled: true,
      external: false
    },
    {
      id: "phone",
      label: "Phone",
      url: "tel:+17789523849",
      icon: "phone",
      enabled: true,
      external: false
    }
  ],

  site: {
    url: "",
    title: "Kongkham Luangkhot | Contact",
    description: "A professional digital contact card for Kongkham Luangkhot.",
  },

  features: {
    showQrCode: true,
    showResume: true,
    showPhone: true,
    showEmail: true,
    showFooter: false,
    showLetsConnect: true
  },

  appearance: {
    defaultTheme: "dark"
  }
};
```

## 1.3 Configuration Rules

All displayed personal information must come from the configuration.

Do NOT do this:

```js
<h1>Kongkham Luangkhot</h1>
```

inside a component.

Instead:

```js
<h1>{profile.name}</h1>
```

The configuration should be passed into reusable components.

Do not hardcode personal URLs inside components.

Do not duplicate the same URL in multiple places if it can be derived from configuration.

For example, the email address should be defined once and used to construct the `mailto:` URL.

The phone number should be defined once and used to construct the `tel:` URL.

---

# 2. Reusable / DRY Architecture

Follow **DRY — Don't Repeat Yourself** principles throughout the project.

Do not create separate implementations for things that have the same structure or behavior.

## 2.1 Recommended Components

Create reusable components/functions such as:

```text
Profile
LinkList
LinkCard
ThemeToggle
PrimaryAction
QrCodeButton
QrCodeModal
Icon
```

The exact component structure may differ based on the framework, but repeated UI and logic must be reusable.

## 2.2 LinkCard

There should be **one** reusable `LinkCard`.

Do NOT create:

```text
LinkedInButton
GitHubButton
ResumeButton
EmailButton
PhoneButton
```

Instead:

```text
LinkList
    ↓
LinkCard
    ├── LinkedIn
    ├── GitHub
    ├── Resume
    ├── Email
    └── Phone
```

The differences should come from configuration data.

Example:

```js
links
  .filter(link => link.enabled)
  .map(link => (
    <LinkCard key={link.id} link={link} />
  ));
```

## 2.3 Reusable QR Logic

QR generation must be isolated in reusable components/utilities.

Do not put QR generation logic directly inside the main page.

Use something similar to:

```text
QrCodeButton
QrCodeModal
qrCode utility
```

## 2.4 Reusable Theme Logic

Theme detection, switching, persistence, and DOM/theme-class handling should be implemented once.

Do not duplicate theme-switching logic across multiple components.

## 2.5 General Rule

If two pieces of code perform essentially the same job, create one reusable function/component and pass the differences through props or configuration.

The main page should primarily compose components:

```text
Page
├── ThemeToggle
├── Profile
├── LinkList
├── PrimaryAction
└── QrCodeButton
```

---

# 3. Configuration-Driven Features

Optional functionality should be controlled through configuration.

Example:

```js
features: {
  showQrCode: true,
  showResume: true,
  showPhone: true,
  showEmail: true,
  showFooter: false,
  showLetsConnect: true
}
```

The UI should respect these settings.

For example:

```js
if (siteConfig.features.showQrCode) {
  // render QR button
}
```

The owner should be able to turn optional features on/off without modifying application logic.

Do not make every CSS property configurable.

Colors, spacing, typography, borders, and layout should remain part of the design system.

---

# 4. Visual Direction

Use the provided reference image as **visual inspiration only**.

Do not copy it exactly.

The desired style is:

- Minimal
- Modern
- Premium
- Professional
- Clean
- Mobile-first
- Card-based
- Spacious
- Subtle
- Polished

The site should feel like a modern professional digital business card.

Avoid:

- Excessive gradients
- Bright/colorful backgrounds
- Heavy glassmorphism
- Large decorative illustrations
- Excessive shadows
- Excessive animations
- Clutter
- Generic "AI-generated portfolio" aesthetics
- Unnecessary sections

---

# 5. Theme System

## 5.1 Default

The default theme must be **DARK**.

Dark theme:

- Near-black / charcoal background
- Off-white primary text
- Muted gray secondary text
- Slightly lighter dark cards
- Subtle borders
- Minimal shadows
- Comfortable contrast

## 5.2 Light Theme

Light theme:

- Off-white / very light gray background
- Near-black primary text
- Muted gray secondary text
- White cards
- Subtle gray borders
- Minimal shadows

The light theme should feel like the same design system with different colors.

---

# 6. Theme Toggle

Place the theme toggle in the **top-right corner**.

It must NOT appear in the middle of the page.

Use a compact icon button:

- Moon icon when appropriate
- Sun icon when appropriate

Requirements:

- Accessible `aria-label`
- Keyboard accessible
- Visible focus state
- Subtle transition
- Persist selection using `localStorage`
- Default to dark on first visit if no preference exists
- Respect `prefers-reduced-motion`

Example:

```text
┌─────────────────────────────────────┐
│                                ☾    │
│                                     │
│             [ PHOTO ]               │
│                                     │
│        Kongkham Luangkhot           │
│                                     │
└─────────────────────────────────────┘
```

The toggle should remain visually secondary.

---

# 7. Profile Section

Center the profile section.

## 7.1 Profile Photo

Use a circular profile image.

The image path must come from configuration.

Example:

```js
profile.photo
```

Use accessible `alt` text.

## 7.2 Name

Display:

**Kongkham Luangkhot**

This is the most prominent text on the page.

## 7.3 Previous Experience

Immediately below the name:

**Previously @ RBC • Raptor Integration • Kii Health**

This should be prominent enough to communicate professional experience quickly.

Do NOT add:

> Software Developer | AI & Cybersecurity

unless explicitly requested later.

## 7.4 Education

Below that:

**Computing Science @ Simon Fraser University**

Keep it visually secondary to the name.

The profile should be compact and should not look like a traditional resume header.

---

# 8. Main Contact Links

Create one reusable vertical list of contact/link cards.

Initial links:

1. LinkedIn
2. GitHub
3. Resume
4. Email
5. Phone

Each card should include:

- Icon
- Link title
- Optional short supporting text
- Optional arrow/external-link icon
- Rounded corners
- Subtle border
- Hover state
- Tap/press feedback
- Smooth, subtle transition

Example:

```text
┌─────────────────────────────────┐
│  LinkedIn                       →│
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  GitHub                         →│
└─────────────────────────────────┘
```

Cards should not be excessively tall.

---

# 9. Link Behavior

Use real semantic links.

The link destination must come from configuration.

External links may open in a new tab when appropriate.

For external links, use safe attributes such as:

```html
target="_blank"
rel="noopener noreferrer"
```

where appropriate.

Internal links and files should not unnecessarily open a new tab.

---

# 10. Phone

Include a dedicated **Phone** link.

On mobile, clicking it should initiate a phone call using:

```text
tel:+17789523849
```

The phone number should be defined once in configuration.

Do not duplicate the phone number throughout the code.

---

# 11. Email

Include a dedicated **Email** link.

Use:

```text
mailto:kongkham.luangkhot@gmail.com
```

The email address should come from configuration.

---

# 12. Resume

Include a **Resume** link.

Default placeholder:

```text
/resume.pdf
```

Make it easy to replace the PDF later.

The resume path should come from configuration.

Prefer opening the resume in a new browser tab where appropriate.

---

# 13. Let's Connect

Include a primary action:

**Let's Connect**

Place it below the main contact links.

It should be visually distinct but still match the minimalist design.

Recommended behavior:

- Open email
- Or use the configured preferred contact destination

Do not duplicate email/contact logic.

Use the existing configuration.

---

# 14. No About Me Section

Do NOT create an About Me section.

The profile header already provides enough context.

This website is a contact card, not a traditional portfolio.

---

# 15. Footer

Do NOT create a large footer.

The page may simply end after the main content.

If enabled in configuration, the footer can contain only:

```text
© 2026 Kongkham Luangkhot
```

Keep it subtle.

Default:

```js
showFooter: false
```

---

# 17. Responsive Design

The website must be fully responsive.

Prioritize mobile because the site will eventually be shared through a QR code.

Support:

- Small phones
- Large phones
- Tablets
- Laptops
- Desktop monitors

## Mobile

Use:

- Comfortable horizontal padding
- Nearly full-width cards
- Large touch targets
- Readable typography
- Compact profile section
- No horizontal scrolling

## Desktop

Keep the content intentionally narrow.

Recommended content width:

```text
400px - 600px
```

Do not stretch the contact card across the entire screen.

Desktop should have generous empty space around the central content.

---

# 18. Page Layout

The primary page should have this structure:

```text
Page
│
├── Theme Toggle
│   └── Top-right
│
├── Profile
│   ├── Profile photo
│   ├── Name
│   ├── Previous experience
│   └── SFU
│
├── Contact Links
│   ├── LinkedIn
│   ├── GitHub
│   ├── Resume
│   ├── Email
│   └── Phone
│
├── Let's Connect
│
├── Generate QR Code
│
└── Optional minimal footer
```

Do not add unnecessary sections.

---

# 19. Typography

Use a modern sans-serif font.

Current implementation:

- Avenir Next
- Helvetica Neue fallback

Hierarchy:

### Name

Large and bold.

### Previous experience

Medium/smaller size with strong readability.

### Education

Smaller and muted.

### Links

Medium weight.

Avoid decorative fonts.

---

# 20. Icons

Use one consistent icon library.

Recommended icons:

- Briefcase/work icon for LinkedIn
- Git branch icon for GitHub
- File/document
- Mail
- Phone
- Arrow-up-right / chevron
- Sun
- Moon
- QR/code icon

Do not use random emoji as the main UI icons.

---

# 21. Animation

Use subtle animation only.

Allowed:

- Small hover translation
- Opacity transition
- Border transition
- Theme transition
- Very subtle page appearance

Avoid:

- Bouncing
- Spinning
- Large slide animations
- Parallax
- Excessive motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 22. Accessibility

Implement:

- Semantic HTML
- Correct heading hierarchy
- Keyboard navigation
- Visible focus states
- Accessible theme button
- Accessible QR modal
- Accessible close button
- `aria-label` where necessary
- Sufficient color contrast
- `alt` text for profile image
- Real links rather than clickable generic containers
- Touch targets around 44px or larger where practical

The QR modal must:

- Trap focus appropriately if using a dialog pattern
- Close with Escape
- Have an accessible name
- Return focus to the triggering button after closing where practical

Do not rely on color alone to communicate information.

---

# 23. Performance

The website should be extremely lightweight.

Prioritize:

- Minimal JavaScript
- Optimized profile image
- No unnecessary libraries
- Fast initial load
- No unnecessary API calls
- No backend/database
- Static-hosting compatibility

The website should feel fast when opened from a QR code.

---

# 24. Security and External Links

For external links:

```html
target="_blank"
rel="noopener noreferrer"
```

when appropriate.

Do not expose secrets or API keys.

The configuration file must contain only information intended to be public.

Do not add analytics, tracking, or third-party data collection unless explicitly requested.

---

# 25. QR Code Generator

Add a secondary **Generate QR Code** button.

This feature should not dominate the page.

Example:

```text
┌─────────────────────────────────┐
│        Generate QR Code         │
└─────────────────────────────────┘
```

## 25.1 Behavior

When clicked:

1. Open a modal/dialog.
2. Generate a QR code for the website URL.
3. Display the QR code at a comfortable size.
4. Display the destination URL.
5. Provide a **Download QR Code** button.
6. Provide a close button.
7. Allow closing with Escape.
8. Allow clicking outside the dialog to close where appropriate.
9. Return focus to the QR button after closing where practical.

Example:

```text
┌──────────────────────────────────┐
│                              ×   │
│                                  │
│          [ QR CODE ]             │
│                                  │
│       https://yourdomain.com     │
│                                  │
│      [ Download QR Code ]        │
│                                  │
└──────────────────────────────────┘
```

## 25.2 QR Destination

The QR destination must come from:

```js
siteConfig.site.url
```

If the configured URL is empty, use the current browser URL as a development-friendly fallback.

For example:

```js
const qrUrl =
  siteConfig.site.url ||
  window.location.origin + window.location.pathname;
```

This allows local development without changing code.

Once deployed, set:

```js
site: {
  url: "https://yourdomain.com"
}
```

The QR code should then point to the stable public URL.

## 25.3 QR Library

Use a lightweight, maintained QR-code library appropriate for the selected framework.

Do not implement QR generation manually.

Generate the QR code client-side.

No backend should be required.

## 25.4 Download

Provide a button to download the QR code as PNG or another common image format.

The downloaded QR code should contain only the website URL.

Do not encode unnecessary personal information directly into the QR code.

---

# 26. Configuration-Driven QR Code

The QR feature must not contain a hardcoded URL.

Bad:

```js
QRCode("https://kongkham.example.com");
```

Good:

```js
QRCode(siteConfig.site.url);
```

or use the current URL fallback described above.

This means the owner only needs to update:

```js
site: {
  url: "https://newdomain.com"
}
```

if the public domain changes.

---

# 27. Code Organization

Keep the code organized and maintainable.

Suggested structure:

```text
project/
├── public/
│   ├── assets/
│   │   └── profile.jpg
│   └── resume.pdf
│
├── src/
│   ├── config/
│   │   └── siteConfig.js
│   │
│   ├── components/
│   │   ├── Profile.*
│   │   ├── LinkList.*
│   │   ├── LinkCard.*
│   │   ├── ThemeToggle.*
│   │   ├── PrimaryAction.*
│   │   ├── QrCodeButton.*
│   │   ├── QrCodeModal.*
│   │   └── Icon.*
│   │
│   ├── utils/
│   │   ├── links.*
│   │   └── qrCode.*
│   │
│   ├── styles/
│   │   └── ...
│   │
│   └── ...
│
└── ...
```

The exact structure can change based on the framework.

The important requirements are:

- One configuration source
- Reusable components
- Reusable utilities
- No repeated logic
- No duplicated personal information

---

# 28. No Hardcoded Personal Information

The following should NOT be hardcoded in UI components:

```text
Kongkham Luangkhot
RBC
Raptor Integration
Kii Health
Simon Fraser University
Phone number
Email
LinkedIn URL
GitHub URL
Resume URL
Website URL
```

They must come from configuration.

Static UI labels such as:

```text
LinkedIn
GitHub
Resume
Email
Phone
Generate QR Code
Let's Connect
```

may be component defaults or configuration values, but prefer configuration where practical.

---

# 29. Future Hosting Compatibility

The website should work with static hosting such as:

- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify

Do not require a backend.

The final public URL should be configurable.

The QR generator should use the configured public URL when available.

---

# 30. Personal Information to Use

Use these exact values unless the owner changes them in the configuration:

### Name

**Kongkham Luangkhot**

### Previous Experience

**Previously @ RBC • Raptor Integration • Kii Health**

Render each experience phrase as a non-breaking unit so `Raptor Integration` and `Kii Health` move to the next line as complete phrases when needed.

### Education

**Computing Science @ Simon Fraser University**

Do not invent additional:

- Employers
- Job titles
- Awards
- Credentials
- Contact information
- Social accounts

Use placeholders for unknown URLs/contact information.

---

# 31. Development Requirements

Before considering the implementation complete:

1. Verify the website runs locally.
2. Verify there are no build errors.
3. Verify all configured links work.
4. Verify email uses `mailto:`.
5. Verify phone uses `tel:`.
6. Verify resume opens correctly.
7. Verify external links behave correctly.
8. Verify dark mode works.
9. Verify light mode works.
10. Verify theme preference persists after refresh.
11. Verify the page works on a narrow mobile viewport.
12. Verify the page works on desktop.
13. Verify there is no horizontal scrolling.
14. Verify keyboard navigation.
15. Verify the QR modal opens.
16. Verify the QR code contains the configured/current website URL.
17. Verify QR download works.
18. Verify Escape closes the QR modal.
19. Verify disabled configuration features are actually hidden.
20. Verify there is no duplicated component logic.

Do not consider the project complete merely because the page renders.

---

# 32. Final Design Goal

The final website should feel like:

> A polished, minimalist digital business card for a Computing Science student with previous internship experience.

It should NOT feel like:

- A full portfolio
- A resume website
- A generic Linktree clone
- A social-media landing page
- An overly decorative startup landing page

The first screen should immediately communicate:

**Who is this person?**

**What is their professional background?**

**How can I contact them?**

The QR generator is a useful secondary networking feature, but it should remain visually secondary to the contact links.

Keep the entire experience simple, professional, responsive, reusable, and easy to maintain through the central configuration file.
