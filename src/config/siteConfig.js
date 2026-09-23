export const siteConfig = {
  profile: {
    name: 'Kongkham Luangkhot',
    previous: ['Previously @ RBC', 'Raptor Integration', 'Kii Health'],
    education: 'Computing Science @ Simon Fraser University',
    photo: 'assets/profile-pic.jpeg',
    photoAlt: 'Portrait of Kongkham Luangkhot',
  },
  contact: {
    email: 'kongkham.luangkhot@gmail.com',
    phone: '+1 (778) 952-3849',
  },
  links: [
    { id: 'linkedin', label: 'LinkedIn', description: 'Connect professionally', url: 'https://www.linkedin.com/in/kongkhamlk/', icon: 'linkedin', enabled: true, external: true },
    { id: 'github', label: 'GitHub', description: 'See what I am building', url: 'https://github.com/kongkham-lk', icon: 'github', enabled: true, external: true },
    { id: 'resume', label: 'Resume', description: 'A quick look at my experience', url: 'resume.pdf', icon: 'file', enabled: true, external: false },
    { id: 'email', label: 'Email', description: 'Send me a message', url: 'mailto:kongkham.luangkhot@gmail.com', icon: 'mail', enabled: true, external: false },
    { id: 'phone', label: 'Phone', description: 'Let\'s have a conversation', url: 'tel:+17789523849', icon: 'phone', enabled: true, external: false },
  ],
  site: {
    url: 'https://kongkham-lk.github.io/K-onnek/',
    title: 'Kongkham Luangkhot | Contact',
    description: 'A professional digital contact card for Kongkham Luangkhot.',
  },
  features: {
    showQrCode: true,
    showResume: true,
    showPhone: true,
    showEmail: true,
    showFooter: false,
    showLetsConnect: true,
  },
  appearance: {
    defaultTheme: 'dark',
  },
}
