'use client'

import Link from 'next/link'
import { useState } from 'react'

const youtubers = [
  {
    rank: 1,
    name: 'Ibai Llanos',
    channel: 'IbaiLlanos',
    url: 'https://www.youtube.com/@IbaiLlanos',
    subscribers: '12.8M',
    origin: 'Spain (Bilbao)',
    genre: 'Entertainment, Streaming, Esports',
    since: '2012',
    description:
      'Ibai Llanos is one of the most influential Spanish-language content creators in the world. Originally known as a League of Legends caster, he later became a full-time streamer and YouTuber, gaining massive fame for his commentary, interviews with football stars (including Lionel Messi and Neymar), and organizing the viral "Veladas del Año" boxing events. His charismatic personality and cross-platform dominance (Twitch & YouTube) make him the undisputed #1.',
    notable: ['Velada del Año boxing events', 'New Year\'s Eve streams with millions of viewers', 'Exclusive interview with Lionel Messi', 'Co-founder of KOI esports organisation'],
  },
  {
    rank: 2,
    name: 'Alinta',
    channel: 'Alinta',
    url: 'https://www.youtube.com/@Alinta',
    subscribers: 'Rising',
    origin: 'Spain',
    genre: 'Lifestyle, Entertainment',
    since: '2018',
    description:
      'Alinta is a rising Spanish-language content creator known for engaging lifestyle, entertainment, and personal content. With a growing and loyal community, Alinta represents the next generation of Spanish YouTube talent, connecting authentically with a younger audience.',
    notable: ['Growing community presence', 'Cross-platform content', 'Authentic personal storytelling'],
  },
  {
    rank: 3,
    name: 'ElRubius',
    channel: 'elrubiusOMG',
    url: 'https://www.youtube.com/@elrubiusOMG',
    subscribers: '40.3M',
    origin: 'Spain / Norway',
    genre: 'Gaming, Comedy, Vlogs',
    since: '2011',
    description:
      'Rubén Doblas Gundersen, known as ElRubius, is one of the most-subscribed Spanish-language YouTubers of all time. A pioneer of Spanish gaming content on YouTube, he is famed for his comedic Minecraft series, anime skits, and viral challenges that shaped an entire generation of Spanish internet culture.',
    notable: ['One of the first major Spanish gaming YouTubers', '"Virtual Hero" comic book & animated series', 'Over 40 million YouTube subscribers', 'Pioneered Minecraft let\'s plays in Spanish'],
  },
  {
    rank: 4,
    name: 'AuronPlay',
    channel: 'AuronPlay',
    url: 'https://www.youtube.com/@AuronPlay',
    subscribers: '32M',
    origin: 'Spain (Catalonia)',
    genre: 'Comedy, Reactions, Streaming',
    since: '2006',
    description:
      'Raúl Álvarez Genes, better known as AuronPlay, is one of the longest-standing Spanish YouTubers, originally famous for reaction and commentary videos. He has evolved into a multi-platform creator with huge Twitch numbers and regular YouTube uploads, known for his sharp wit and unapologetic humor.',
    notable: ['One of YouTube Spain\'s earliest creators (2006)', 'Regular participant in Ibai\'s Velada events', '35M+ Twitch followers', 'Pioneer of Spanish reaction/commentary format'],
  },
  {
    rank: 5,
    name: 'TheGrefg',
    channel: 'TheGrefg',
    url: 'https://www.youtube.com/@TheGrefg',
    subscribers: '17M',
    origin: 'Spain (Murcia)',
    genre: 'Gaming, Fortnite, Streaming',
    since: '2013',
    description:
      'David Cánovas Martínez, known as TheGrefg, is a hugely popular gaming content creator best known for Fortnite. He made global headlines in January 2021 when his Fortnite skin reveal broke the Twitch record for most concurrent viewers at the time, surpassing 2.4 million.',
    notable: ['Broke Twitch viewership record in 2021', 'Has his own Fortnite Icon Series skin', 'Former professional FIFA player', 'One of the biggest Fortnite creators in Spain'],
  },
  {
    rank: 6,
    name: 'Luisito Comunica',
    channel: 'LuisitoComunica',
    url: 'https://www.youtube.com/@LuisitoComunica',
    subscribers: '42M',
    origin: 'Mexico (Puebla)',
    genre: 'Travel, Vlogs, Gastronomy',
    since: '2011',
    description:
      'Luis Arturo Villar Sudek, known as Luisito Comunica, is a Mexican travel and lifestyle YouTuber with one of the largest Spanish-language channels on the platform. Famous for visiting nearly every country in the world and exploring unusual destinations, his infectious curiosity has made him a cultural icon in Latin America.',
    notable: ['Visited 100+ countries on camera', 'Multiple YouTube Creator Awards', 'Opened his own taco restaurant chain', 'Author and TV presenter'],
  },
  {
    rank: 7,
    name: 'Vegetta777',
    channel: 'Vegetta777',
    url: 'https://www.youtube.com/@Vegetta777',
    subscribers: '38M',
    origin: 'Spain',
    genre: 'Gaming, Minecraft, Animation',
    since: '2011',
    description:
      'Samuel de Luque Batuecas, known as Vegetta777, is a veteran Spanish gaming YouTuber whose Minecraft series helped define the genre for Spanish-speaking audiences. He is one of the earliest and most beloved Spanish gaming content creators, with a career spanning over a decade.',
    notable: ['Pioneered Minecraft content in Spanish', 'Frequent collaborator with Willyrex', 'Over 38 million subscribers', 'Children\'s book author'],
  },
  {
    rank: 8,
    name: 'Mikecrack',
    channel: 'Mikecrack',
    url: 'https://www.youtube.com/@Mikecrack',
    subscribers: '33M',
    origin: 'Spain',
    genre: 'Gaming, Minecraft, Family',
    since: '2014',
    description:
      'Miguel Bernal Montes, known as Mikecrack, is a family-friendly Spanish gaming YouTuber particularly popular among younger audiences. His Minecraft content and animated videos have earned him tens of millions of subscribers across multiple channels.',
    notable: ['Multiple channels with combined 50M+ subscribers', 'Popular with children and family audiences', 'Animated Minecraft series', 'Merch and music releases'],
  },
  {
    rank: 9,
    name: 'Willyrex',
    channel: 'Willyrex',
    url: 'https://www.youtube.com/@Willyrex',
    subscribers: '17M',
    origin: 'Spain',
    genre: 'Gaming, Vlogs, Challenge',
    since: '2009',
    description:
      'Guillermo Díaz, known as Willyrex, is one of the founding figures of Spanish gaming YouTube. A close friend and frequent collaborator of Vegetta777, he rose to fame with Call of Duty and Minecraft videos and has consistently been one of Spain\'s top gaming creators for over 15 years.',
    notable: ['One of the first Spanish gaming YouTubers (2009)', 'Long-running series with Vegetta777', 'Participated in international gaming tournaments', 'Cross-platform streamer'],
  },
  {
    rank: 10,
    name: 'Alexby11',
    channel: 'Alexby11',
    url: 'https://www.youtube.com/@Alexby11',
    subscribers: '9M',
    origin: 'Spain',
    genre: 'Gaming, Comedy, Streaming',
    since: '2013',
    description:
      'Alejandro García González, known as Alexby11, is a popular Spanish gaming and comedy content creator. A member of the Zueldik gaming collective and frequent collaborator with other top Spanish YouTubers, he is known for his humor-infused gaming videos and variety content.',
    notable: ['Member of theZueldik gaming community', 'Regular collaborator with Ibai and AuronPlay', 'Known for comedy-first approach to gaming', 'Active Twitch streamer'],
  },
]

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'rankings', label: 'Rankings' },
  { id: 'profiles', label: 'Creator Profiles' },
  { id: 'history', label: 'History of Spanish YouTube' },
  { id: 'genres', label: 'Popular Genres' },
  { id: 'see-also', label: 'See Also' },
  { id: 'references', label: 'References' },
]

export default function SpanishYouTubePage() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="min-h-screen bg-white font-serif text-gray-900">
      {/* Wikipedia-style top bar */}
      <div className="border-b border-gray-300 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Linux Libertine, Georgia, serif' }}>
              WikiTube
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">The Free Encyclopedia of YouTube</span>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <span>Article</span>
            <span>Talk</span>
            <span className="text-blue-600 hover:underline cursor-pointer">Edit</span>
            <span className="text-blue-600 hover:underline cursor-pointer">History</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-3" style={{ fontFamily: 'sans-serif' }}>
          <span className="text-blue-600 hover:underline cursor-pointer">YouTube</span>
          {' › '}
          <span className="text-blue-600 hover:underline cursor-pointer">Spanish Content</span>
          {' › '}
          <span>Top Spanish YouTubers</span>
        </div>

        {/* Page Title */}
        <h1
          className="text-3xl font-normal border-b border-gray-300 pb-2 mb-4"
          style={{ fontFamily: 'Linux Libertine, Georgia, Times New Roman, serif', fontSize: '2rem' }}
        >
          Top Spanish YouTubers
        </h1>

        <div className="flex gap-6">
          {/* Left Column — Main Content */}
          <div className="flex-1 min-w-0">
            {/* Lead paragraph */}
            <p className="text-base leading-relaxed mb-4" style={{ fontFamily: 'sans-serif', fontSize: '0.875rem' }}>
              <b>Top Spanish YouTubers</b> refers to the most prominent and influential content creators on{' '}
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                YouTube
              </a>{' '}
              who produce content primarily in the <b>Spanish language</b>. Spanish is the second most spoken language on YouTube globally, and the Spanish-language creator ecosystem spans Spain, Mexico, Argentina, Colombia, and across Latin America. As of 2026, Spanish-language channels collectively command hundreds of millions of subscribers, with several individual creators ranking among the most-subscribed channels on the entire platform.
            </p>

            <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: 'sans-serif' }}>
              The genre includes gaming, comedy, travel, lifestyle, and live streaming. Creators from Spain — particularly from cities such as Madrid, Barcelona, and Bilbao — have been especially dominant, though Mexican and Colombian creators also rank among the global elite. The rise of multi-platform streaming (particularly{' '}
              <span className="text-blue-600">Twitch</span>) has further amplified the reach of many Spanish YouTube creators, who often maintain large simultaneous audiences on both platforms.
            </p>

            {/* Table of Contents */}
            <div
              id="toc"
              className="border border-gray-300 bg-gray-50 p-4 mb-6 inline-block min-w-[260px]"
              style={{ fontFamily: 'sans-serif', fontSize: '0.8rem' }}
            >
              <div className="font-bold mb-2 text-center text-sm">Contents <span className="text-blue-600 font-normal cursor-pointer">[hide]</span></div>
              <ol className="list-none space-y-1">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-blue-600 hover:underline"
                      onClick={() => setActiveSection(s.id)}
                    >
                      {i + 1}. {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Overview Section */}
            <section id="overview" className="mb-8">
              <h2
                className="text-xl font-normal border-b border-gray-300 pb-1 mb-3"
                style={{ fontFamily: 'Linux Libertine, Georgia, serif' }}
              >
                Overview
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: 'sans-serif' }}>
                Spanish-language YouTube has experienced explosive growth since the early 2010s. Gaming content played a pivotal role in establishing the platform's first generation of mega-creators, with channels focused on <i>Minecraft</i>, <i>Call of Duty</i>, and later <i>Fortnite</i> and <i>League of Legends</i> dominating view counts. By the mid-2010s, the ecosystem had diversified into travel vlogs, comedy sketches, lifestyle content, and political commentary.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: 'sans-serif' }}>
                A defining characteristic of Spanish YouTube's top tier is the strong collaborative culture. Many of the leading creators are longtime friends who regularly appear in each other's content, form collectives, and co-organize major live events. <a href="https://www.youtube.com/@IbaiLlanos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ibai Llanos</a>' annual <i>Velada del Año</i> amateur boxing event, for example, regularly draws millions of concurrent viewers and features collaborations across the entire Spanish creator ecosystem.
              </p>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                Subscriber counts listed in this article are approximate figures as of early 2026 and are subject to change. Rankings reflect a combination of subscriber count, cultural influence, viewership records, and cross-platform presence.
              </p>
            </section>

            {/* Rankings Table */}
            <section id="rankings" className="mb-8">
              <h2
                className="text-xl font-normal border-b border-gray-300 pb-1 mb-3"
                style={{ fontFamily: 'Linux Libertine, Georgia, serif' }}
              >
                Rankings
              </h2>
              <p className="text-sm mb-3" style={{ fontFamily: 'sans-serif' }}>
                The following table lists the top Spanish-language YouTubers ranked by overall cultural influence, subscriber count, and platform impact.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse" style={{ fontFamily: 'sans-serif' }}>
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">#</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Creator</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">YouTube Channel</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Origin</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Genre</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Active Since</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Subscribers (approx.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {youtubers.map((y, i) => (
                      <tr key={y.rank} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-3 py-2 font-bold text-center">{y.rank}</td>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">
                          <a href={`#creator-${y.rank}`} className="text-blue-600 hover:underline">
                            {y.name}
                          </a>
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <a
                            href={y.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            @{y.channel}
                          </a>
                        </td>
                        <td className="border border-gray-300 px-3 py-2">{y.origin}</td>
                        <td className="border border-gray-300 px-3 py-2">{y.genre}</td>
                        <td className="border border-gray-300 px-3 py-2">{y.since}</td>
                        <td className="border border-gray-300 px-3 py-2">{y.subscribers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Creator Profiles */}
            <section id="profiles" className="mb-8">
              <h2
                className="text-xl font-normal border-b border-gray-300 pb-1 mb-4"
                style={{ fontFamily: 'Linux Libertine, Georgia, serif' }}
              >
                Creator Profiles
              </h2>
              <div className="space-y-8">
                {youtubers.map((y) => (
                  <div key={y.rank} id={`creator-${y.rank}`} className="scroll-mt-16">
                    <h3
                      className="text-base font-semibold border-b border-gray-200 pb-1 mb-3"
                      style={{ fontFamily: 'Linux Libertine, Georgia, serif', fontSize: '1.05rem' }}
                    >
                      {y.rank}. {y.name}
                    </h3>

                    {/* Infobox */}
                    <div className="float-right ml-4 mb-4 border border-gray-300 bg-gray-50 p-0 w-60 text-xs" style={{ fontFamily: 'sans-serif' }}>
                      <div className="bg-blue-700 text-white text-center py-1.5 font-semibold text-xs">
                        {y.name}
                      </div>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="px-2 py-1 font-semibold text-gray-600 align-top">Channel</td>
                            <td className="px-2 py-1">
                              <a href={y.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                @{y.channel}
                              </a>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-2 py-1 font-semibold text-gray-600 align-top">Origin</td>
                            <td className="px-2 py-1">{y.origin}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-2 py-1 font-semibold text-gray-600 align-top">Genre</td>
                            <td className="px-2 py-1">{y.genre}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-2 py-1 font-semibold text-gray-600 align-top">Active since</td>
                            <td className="px-2 py-1">{y.since}</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-1 font-semibold text-gray-600 align-top">Subscribers</td>
                            <td className="px-2 py-1">{y.subscribers}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: 'sans-serif' }}>
                      {y.description}
                    </p>

                    {y.notable.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'sans-serif' }}>
                          Notable achievements &amp; highlights:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm" style={{ fontFamily: 'sans-serif' }}>
                          {y.notable.map((n, i) => (
                            <li key={i} className="text-gray-700">{n}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="clear-both" />
                  </div>
                ))}
              </div>
            </section>

            {/* History Section */}
            <section id="history" className="mb-8">
              <h2
                className="text-xl font-normal border-b border-gray-300 pb-1 mb-3"
                style={{ fontFamily: 'Linux Libertine, Georgia, serif' }}
              >
                History of Spanish YouTube
              </h2>
              <h3 className="text-base font-semibold mt-3 mb-2" style={{ fontFamily: 'sans-serif' }}>Early period (2006–2012)</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: 'sans-serif' }}>
                The first wave of influential Spanish YouTubers emerged between 2006 and 2012, primarily within the gaming niche. Channels such as AuronPlay (2006) and Willyrex (2009) were among the platform's earliest adopters in the Spanish-speaking world. These pioneering creators established the foundations of the gaming commentary format that would dominate Spanish YouTube for the following decade.
              </p>
              <h3 className="text-base font-semibold mt-3 mb-2" style={{ fontFamily: 'sans-serif' }}>The Minecraft era (2012–2016)</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: 'sans-serif' }}>
                The global Minecraft phenomenon had an especially pronounced effect on Spanish YouTube. Creators like Vegetta777, ElRubius, and Willyrex built enormous audiences through serialized Minecraft gameplay. This period saw subscriber counts for Spanish creators rise from the hundreds of thousands into the tens of millions, establishing a competitive creator economy in Spain.
              </p>
              <h3 className="text-base font-semibold mt-3 mb-2" style={{ fontFamily: 'sans-serif' }}>Twitch crossover & live streaming era (2017–present)</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: 'sans-serif' }}>
                The late 2010s saw a significant shift as many Spanish creators migrated a portion of their activity to Twitch for live streaming, whilst maintaining YouTube as their primary video-on-demand platform. <a href="https://www.youtube.com/@IbaiLlanos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ibai Llanos</a> became the defining figure of this era, combining YouTube uploads with record-breaking Twitch streams and live events to build an unparalleled multi-platform presence by the early 2020s.
              </p>
            </section>

            {/* Popular Genres */}
            <section id="genres" className="mb-8">
              <h2
                className="text-xl font-normal border-b border-gray-300 pb-1 mb-3"
                style={{ fontFamily: 'Linux Libertine, Georgia, serif' }}
              >
                Popular Genres
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse" style={{ fontFamily: 'sans-serif' }}>
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Genre</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Description</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Representative Creators</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { genre: 'Gaming', desc: 'Gameplay videos, let\'s plays, speedruns, and esports commentary', creators: 'Vegetta777, Willyrex, TheGrefg, Mikecrack' },
                      { genre: 'Entertainment / Streaming', desc: 'Variety streams, IRL content, reactions, and big live events', creators: 'Ibai Llanos, AuronPlay, ElRubius, Alexby11' },
                      { genre: 'Travel & Vlogs', desc: 'Travel diaries, country explorations, gastronomy, and daily life', creators: 'Luisito Comunica' },
                      { genre: 'Lifestyle & Personal', desc: 'Day-in-the-life, challenges, personal storytelling, and fashion', creators: 'Alinta, various rising creators' },
                      { genre: 'Comedy & Sketches', desc: 'Short-form comedy, parodies, and satirical commentary', creators: 'AuronPlay, ElRubius' },
                      { genre: 'Esports & Sports', desc: 'Professional gaming coverage, football analysis, and live events', creators: 'Ibai Llanos, TheGrefg' },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-3 py-2 font-semibold">{row.genre}</td>
                        <td className="border border-gray-300 px-3 py-2">{row.desc}</td>
                        <td className="border border-gray-300 px-3 py-2">{row.creators}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* See Also */}
            <section id="see-also" className="mb-8">
              <h2
                className="text-xl font-normal border-b border-gray-300 pb-1 mb-3"
                style={{ fontFamily: 'Linux Libertine, Georgia, serif' }}
              >
                See Also
              </h2>
              <ul className="list-disc list-inside text-sm text-blue-600 space-y-1" style={{ fontFamily: 'sans-serif' }}>
                <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:underline">YouTube — Official Platform</a></li>
                <li><span className="text-gray-700">List of most-subscribed YouTube channels</span></li>
                <li><span className="text-gray-700">Spanish-language media</span></li>
                <li><span className="text-gray-700">Twitch — Live streaming platform</span></li>
                <li><span className="text-gray-700">Esports in Spain</span></li>
              </ul>
            </section>

            {/* References */}
            <section id="references" className="mb-8">
              <h2
                className="text-xl font-normal border-b border-gray-300 pb-1 mb-3"
                style={{ fontFamily: 'Linux Libertine, Georgia, serif' }}
              >
                References
              </h2>
              <ol className="list-decimal list-inside text-xs text-gray-600 space-y-2" style={{ fontFamily: 'sans-serif' }}>
                <li>
                  <a href="https://www.youtube.com/@IbaiLlanos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Ibai Llanos — Official YouTube Channel
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@elrubiusOMG" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    ElRubius — Official YouTube Channel
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@AuronPlay" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    AuronPlay — Official YouTube Channel
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@LuisitoComunica" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Luisito Comunica — Official YouTube Channel
                  </a>
                </li>
                <li>
                  Subscriber data approximate as of March 2026. YouTube platform statistics.
                </li>
              </ol>
            </section>

            {/* Footer note */}
            <div className="border-t border-gray-300 pt-4 text-xs text-gray-500" style={{ fontFamily: 'sans-serif' }}>
              This page was last edited on 11 March 2026. Content is available under the{' '}
              <span className="text-blue-600">Creative Commons Attribution-ShareAlike License 4.0</span> unless otherwise noted.
            </div>
          </div>

          {/* Right Column — Quick Nav Sidebar */}
          <aside className="w-48 flex-shrink-0 hidden lg:block">
            <div className="sticky top-16">
              <div className="border border-gray-300 p-3 text-xs" style={{ fontFamily: 'sans-serif' }}>
                <div className="font-semibold text-sm mb-2 text-gray-700">Quick navigation</div>
                <ul className="space-y-1">
                  {youtubers.map((y) => (
                    <li key={y.rank}>
                      <a
                        href={`#creator-${y.rank}`}
                        className="text-blue-600 hover:underline flex items-start gap-1"
                      >
                        <span className="text-gray-400 flex-shrink-0">{y.rank}.</span>
                        <span>{y.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-300 p-3 text-xs mt-4" style={{ fontFamily: 'sans-serif' }}>
                <div className="font-semibold text-sm mb-2 text-gray-700">External links</div>
                <ul className="space-y-1">
                  <li>
                    <a href="https://www.youtube.com/@IbaiLlanos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      → Ibai on YouTube
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      → YouTube.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
