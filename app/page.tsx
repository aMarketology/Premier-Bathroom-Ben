'use client'

import { getSiteConfig } from '@/lib/site-config'
import PremierHome from './components/PremierHome'
import ChampsHome from './components/ChampsHome'
import TileprosHome from './components/TileprosHome'

export default function Home() {
  const site = getSiteConfig()

  if (site.id === 'champs') return <ChampsHome />
  if (site.id === 'tilepros') return <TileprosHome />
  return <PremierHome />
}
