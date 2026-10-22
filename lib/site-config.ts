/**
 * Central site configuration.
 * All three sites now run from ONE codebase (the main branch).
 * Set the SITE_ID env var to control branding, domain, colors, and email.
 *
 * SITE_ID values:
 *   - "premier"   → Premier Bathroom Remodel Texas
 *   - "champs"    → Champs Tile Austin
 *   - "tilepros"  → Tile Pros Austin
 *
 * Defaults to "premier" if SITE_ID is unset.
 */

export type SiteId = 'premier' | 'champs' | 'tilepros'

export interface SiteConfig {
  id: SiteId
  name: string          // Full display name (used in emails, SMS, headings)
  shortName: string     // Short brand name
  domain: string        // Canonical domain (no protocol)
  url: string           // Full https URL
  phone: string         // Display phone number
  phoneHref: string     // tel: link
  fromEmail: string     // Resend "From" address display
  fromAddress: string   // Resend "From" email address
  emailSubjectPrefix: string
  // Branding colors (Tailwind classes + hex for emails)
  primaryHex: string
  primaryDarkHex: string
  accentHex: string
  // Lead notification recipients
  notificationEmails: string[]
  // BCC recipients (get blind copies of every lead email)
  bccEmails: string[]
  // Tailwind class fragments for client components
  // Use full static class strings so Tailwind's JIT can detect them
  tw: {
    primaryBg: string          // e.g. 'bg-blue-600'
    primaryText: string        // e.g. 'text-blue-600'
    primaryTextLight: string   // e.g. 'text-blue-400'
    primaryBorder: string      // e.g. 'border-blue-600'
    primaryHoverBg: string     // e.g. 'hover:bg-blue-600'
    primaryHoverText: string   // e.g. 'hover:text-blue-600'
    gradientFrom: string       // e.g. 'from-blue-600'
    gradientTo: string         // e.g. 'to-cyan-600'
    softBg: string             // e.g. 'bg-blue-50'
    softText: string           // e.g. 'text-blue-700'
  }
}

const SITES: Record<SiteId, SiteConfig> = {
  premier: {
    id: 'premier',
    name: 'Premier Bathroom Remodel Austin',
    shortName: 'Premier Bathroom',
    domain: 'premierbathroomremodelaustin.com',
    url: 'https://premierbathroomremodelaustin.com',
    phone: '512-706-9577',
    phoneHref: 'tel:512-706-9577',
    fromEmail: 'Premier Bathroom Remodel <info@amarketology.com>',
    fromAddress: 'info@amarketology.com',
    emailSubjectPrefix: 'New Lead',
    primaryHex: '#2563eb',
    primaryDarkHex: '#1e40af',
    accentHex: '#3b82f6',
    notificationEmails: [
      'premierremodelingoftexas@gmail.com',
      'info@amarketology.com',
    ],
    bccEmails: ['producer1564@gmail.com'],
    tw: {
      primaryBg: 'bg-blue-600',
      primaryText: 'text-blue-600',
      primaryTextLight: 'text-blue-400',
      primaryBorder: 'border-blue-600',
      primaryHoverBg: 'hover:bg-blue-600',
      primaryHoverText: 'hover:text-blue-600',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-cyan-600',
      softBg: 'bg-blue-50',
      softText: 'text-blue-700',
    },
  },
  champs: {
    id: 'champs',
    name: 'Champs Tile Branch',
    shortName: 'Champs Tile',
    domain: 'champstile.com',
    url: 'https://champstile.com',
    phone: '512-706-9577',
    phoneHref: 'tel:512-706-9577',
    fromEmail: 'Champs Tile <info@amarketology.com>',
    fromAddress: 'info@amarketology.com',
    emailSubjectPrefix: 'New Lead',
    primaryHex: '#f97316',
    primaryDarkHex: '#c2410c',
    accentHex: '#f59e0b',
    notificationEmails: [
      'premierremodelingoftexas@gmail.com',
      'info@amarketology.com',
    ],
    bccEmails: [
      'producer1564@gmail.com',
    ],
    tw: {
      primaryBg: 'bg-orange-600',
      primaryText: 'text-orange-600',
      primaryTextLight: 'text-orange-400',
      primaryBorder: 'border-orange-600',
      primaryHoverBg: 'hover:bg-orange-600',
      primaryHoverText: 'hover:text-orange-600',
      gradientFrom: 'from-orange-600',
      gradientTo: 'to-amber-600',
      softBg: 'bg-orange-50',
      softText: 'text-orange-700',
    },
  },
  tilepros: {
    id: 'tilepros',
    name: 'Tile Pros Austin',
    shortName: 'Tile Pros',
    domain: 'tileprosaustin.com',
    url: 'https://tileprosaustin.com',
    phone: '512-706-9577',
    phoneHref: 'tel:512-706-9577',
    fromEmail: 'Tile Pros Austin <info@amarketology.com>',
    fromAddress: 'info@amarketology.com',
    emailSubjectPrefix: 'New Lead',
    primaryHex: '#0ea5e9',
    primaryDarkHex: '#0369a1',
    accentHex: '#38bdf8',
    notificationEmails: [
      'premierremodelingoftexas@gmail.com',
      'info@amarketology.com',
    ],
    bccEmails: [
      'producer1564@gmail.com',
    ],
    tw: {
      primaryBg: 'bg-cyan-600',
      primaryText: 'text-cyan-600',
      primaryTextLight: 'text-cyan-400',
      primaryBorder: 'border-cyan-600',
      primaryHoverBg: 'hover:bg-cyan-600',
      primaryHoverText: 'hover:text-cyan-600',
      gradientFrom: 'from-cyan-600',
      gradientTo: 'to-sky-600',
      softBg: 'bg-cyan-50',
      softText: 'text-cyan-700',
    },
  },
}

function isValidSiteId(value: string | undefined): value is SiteId {
  return value === 'premier' || value === 'champs' || value === 'tilepros'
}

export function getSiteId(): SiteId {
  // NEXT_PUBLIC_SITE_ID is inlined at build time (works in client + server)
  // SITE_ID is server-only
  const id = process.env.NEXT_PUBLIC_SITE_ID || process.env.SITE_ID
  return isValidSiteId(id) ? id : 'premier'
}

export function getSiteConfig(): SiteConfig {
  return SITES[getSiteId()]
}

export { SITES }