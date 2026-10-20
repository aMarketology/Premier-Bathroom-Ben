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
  },
}

function isValidSiteId(value: string | undefined): value is SiteId {
  return value === 'premier' || value === 'champs' || value === 'tilepros'
}

export function getSiteId(): SiteId {
  const id = process.env.SITE_ID
  return isValidSiteId(id) ? id : 'premier'
}

export function getSiteConfig(): SiteConfig {
  return SITES[getSiteId()]
}

export { SITES }