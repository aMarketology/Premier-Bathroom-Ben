import { notFound } from 'next/navigation'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'

type CityData = {
  name: string
  description: string
  longDescription: string
  neighborhood: string
  population: string
  faqs: { question: string; answer: string }[]
}

const serviceAreas: Record<string, CityData> = {
  // Austin Metro
  austin: {
    name: 'Austin',
    description: 'Premier bathroom remodeling services in Austin, TX.',
    longDescription: 'As the capital of Texas and one of the fastest-growing cities in the nation, Austin homeowners demand beautiful, functional bathrooms that match the city\'s modern lifestyle. Our team has completed hundreds of bathroom remodels across Austin — from South Congress bungalows to Mueller new-builds and Lake Travis estates.',
    neighborhood: 'South Congress, East Austin, Mueller, Tarrytown, Hyde Park, Circle C',
    population: '978,000+',
    faqs: [
      { question: 'How much does a bathroom remodel cost in Austin?', answer: 'In Austin, bathroom remodels typically range from $10,000 to $40,000 depending on scope, materials, and finishes. Mid-range full remodels average $18,000–$28,000.' },
      { question: 'Do you need permits for bathroom remodeling in Austin?', answer: 'Yes — most Austin bathroom remodels require a permit from the City of Austin Development Services Department. We handle all permitting on your behalf.' },
      { question: 'How long does a bathroom remodel take in Austin?', answer: 'Most Austin bathroom remodels take 2–4 weeks. Simple refresh projects may be done in 1 week; full gut renovations typically run 4–6 weeks.' },
    ],
  },
  'round-rock': {
    name: 'Round Rock',
    description: 'Expert bathroom renovations in Round Rock, TX.',
    longDescription: 'Round Rock is one of the most desirable suburbs in the Austin Metro, with growing new-construction neighborhoods and established communities that demand quality bathroom renovations. We serve homeowners throughout Round Rock delivering expert craftsmanship and modern designs.',
    neighborhood: 'Stone Canyon, Brushy Creek, Forest Creek, Teravista, Old Settlers Park area',
    population: '133,000+',
    faqs: [
      { question: 'What bathroom remodeling services do you offer in Round Rock?', answer: 'We offer full bathroom renovations, shower remodels, tub to shower conversions, walk-in bath installations, vanity upgrades, tile work, and accessibility modifications in Round Rock.' },
      { question: 'How long does a bathroom remodel take in Round Rock?', answer: 'Most Round Rock bathroom projects take 2–4 weeks. We schedule efficiently to minimize disruption to your household.' },
      { question: 'Is Round Rock in your service area?', answer: 'Absolutely — Round Rock is one of our primary service areas, just 20 miles north of Austin.' },
    ],
  },
  'cedar-park': {
    name: 'Cedar Park',
    description: 'Quality bathroom remodeling in Cedar Park, TX.',
    longDescription: 'Cedar Park has grown from a small suburb into a thriving community with thousands of homes needing modern bathroom updates. From the established neighborhoods near 1890 Ranch to newer Leander ISD communities, we deliver superior bathroom transformations throughout Cedar Park.',
    neighborhood: '1890 Ranch, Buttercup Creek, Twin Creeks, Anderson Mill West',
    population: '85,000+',
    faqs: [
      { question: 'Do you serve Cedar Park for bathroom remodeling?', answer: 'Yes, Cedar Park is a primary service area. We re regularly working on projects throughout Cedar Park and neighboring Leander.' },
      { question: 'What is the cost of a bathroom remodel in Cedar Park?', answer: 'Bathroom remodels in Cedar Park range from $8,000 for partial updates to $35,000+ for full master bath renovations. We provide free detailed quotes.' },
    ],
  },
  pflugerville: {
    name: 'Pflugerville',
    description: 'Top-rated bathroom remodels in Pflugerville, TX.',
    longDescription: 'Pflugerville homeowners trust us for beautiful, long-lasting bathroom remodels. Whether you\'re in a new Pflugerville subdivision or an older home near Lake Pflugerville, our team delivers high-quality renovations at competitive prices.',
    neighborhood: 'Fairways of Blackhawk, Bohls Place, Windermere, Pflugerville Heights',
    population: '66,000+',
    faqs: [
      { question: 'Do you serve Pflugerville for bathroom remodeling?', answer: 'Yes — Pflugerville is one of our core service areas in the Austin Metro. We offer the full range of bathroom renovation services.' },
      { question: 'How much does bathroom remodeling cost in Pflugerville?', answer: 'Pflugerville bathroom remodeling projects range from $9,000 to $32,000 depending on scope and materials. Call us for a free estimate.' },
    ],
  },
  'west-lake-hills': {
    name: 'West Lake Hills',
    description: 'Luxury bathroom renovations in West Lake Hills, TX.',
    longDescription: 'West Lake Hills is known for its stunning hilltop homes and luxury lakefront properties. Our team specializes in high-end bathroom renovations that match the premium finishes and upscale aesthetics West Lake Hills homeowners expect — marble, custom tile work, frameless glass, and spa-quality fixtures.',
    neighborhood: 'Westlake Hills downtown, Barton Creek, Westlake Drive corridor',
    population: '3,500+',
    faqs: [
      { question: 'Do you offer luxury bathroom remodeling in West Lake Hills?', answer: 'Absolutely. We specialize in luxury bathroom renovations with premium materials — Carrara marble, custom frameless glass enclosures, heated floors, and designer fixtures.' },
      { question: 'What is the typical cost for a luxury bathroom remodel in West Lake Hills?', answer: 'Luxury bathroom remodels in West Lake Hills typically range from $25,000 to $75,000 or more depending on size, finishes, and scope.' },
    ],
  },
  'bee-cave': {
    name: 'Bee Cave',
    description: 'Beautiful bathroom transformations in Bee Cave, TX.',
    longDescription: 'Bee Cave is a growing Hill Country community just west of Austin. With many newer high-value homes, Bee Cave homeowners expect premium bathroom quality. Our team brings design expertise and meticulous craftsmanship to every Bee Cave project.',
    neighborhood: 'Ladera, Spanish Oaks, Bella Colinas, The Grove at Falconhead',
    population: '12,000+',
    faqs: [
      { question: 'Do you serve Bee Cave for bathroom remodeling?', answer: 'Yes — Bee Cave is in our regular service area, just 15 miles west of Austin on TX-71.' },
    ],
  },
  rollingwood: {
    name: 'Rollingwood',
    description: 'Premium bathroom remodeling in Rollingwood, TX.',
    longDescription: 'Rollingwood is an exclusive enclave surrounded by Austin, home to established professionals who appreciate quality craftsmanship. Our bathroom renovations in Rollingwood are built to match the premium standards these homes deserve.',
    neighborhood: 'Barton Creek Greenbelt adjacent, South Mopac corridor',
    population: '1,500+',
    faqs: [
      { question: 'What services do you offer in Rollingwood?', answer: 'Full bathroom remodels, shower upgrades, custom tile installation, vanity replacement, walk-in bath conversions, and complete master bath transformations.' },
    ],
  },
  manchaca: {
    name: 'Manchaca',
    description: 'Expert bathroom renovations in Manchaca, TX.',
    longDescription: 'Manchaca is a rapidly growing southern Austin community with many homeowners looking to modernize their bathrooms. Our team serves Manchaca with the same expert craftsmanship we bring to all Austin Metro projects.',
    neighborhood: 'Manchaca Village, Malone, Slaughter Creek corridor',
    population: '15,000+',
    faqs: [
      { question: 'Do you serve Manchaca for bathroom remodeling?', answer: 'Yes — Manchaca is one of our original service areas in South Austin. We offer full bathroom renovation services throughout the community.' },
    ],
  },
  georgetown: {
    name: 'Georgetown',
    description: 'Quality bathroom remodeling in Georgetown, TX.',
    longDescription: 'Georgetown — the "Most Beautiful Town Square in Texas" — is one of the fastest-growing cities in the nation. From Sun City to new Williamson County subdivisions, we help Georgetown homeowners transform their bathrooms with the quality and style the community deserves.',
    neighborhood: 'Sun City, Georgetown Village, Wolf Ranch, Rivery Park',
    population: '75,000+',
    faqs: [
      { question: 'Do you serve Georgetown TX for bathroom remodeling?', answer: 'Yes — Georgetown is a primary service area for us, located about 25 miles north of Austin.' },
      { question: 'Do you specialize in Sun City Georgetown bathroom remodels?', answer: 'Absolutely. We have extensive experience with Sun City Georgetown homes — including ADA accessibility upgrades, walk-in bath installations, and roll-in showers.' },
    ],
  },
  lakeway: {
    name: 'Lakeway',
    description: 'Luxury bathroom specialists in Lakeway, TX.',
    longDescription: 'Lakeway sits on the beautiful shores of Lake Travis, home to upscale residences that demand premium bathroom remodeling. Our team is experienced in the elevated design and material standards that Lakeway homeowners expect.',
    neighborhood: 'Rough Hollow, The Hills of Lakeway, City of Lakeway, Lohmans Crossing',
    population: '18,000+',
    faqs: [
      { question: 'Do you serve Lakeway and Lake Travis for bathroom remodeling?', answer: 'Yes — Lakeway and the Lake Travis corridor is a primary service area. We often work on lakefront properties and luxury homes throughout the area.' },
    ],
  },
  'dripping-springs': {
    name: 'Dripping Springs',
    description: 'Premier bathroom renovations in Dripping Springs, TX.',
    longDescription: 'Dripping Springs is the "Gateway to the Hill Country," known for scenic hill country homes and growing residential communities. We bring expert bathroom remodeling services to Dripping Springs homeowners seeking quality transformations.',
    neighborhood: 'Belterra, Caliterra, Headwaters, Highpointe, Arroyo Ranch',
    population: '5,500+',
    faqs: [
      { question: 'Do you serve Dripping Springs for bathroom remodeling?', answer: 'Yes — Dripping Springs and the Hill Country area is in our service zone. Call us to discuss your project.' },
    ],
  },
  leander: {
    name: 'Leander',
    description: 'Expert bathroom remodeling in Leander, TX.',
    longDescription: 'Leander is one of the fastest-growing cities in Texas, with thousands of new and established homes needing quality bathroom upgrades. Our team serves Leander homeowners with expert craftsmanship and competitive pricing.',
    neighborhood: 'Crystal Falls, Travisso, Bryson, Bar W Ranch, Mason Hills',
    population: '70,000+',
    faqs: [
      { question: 'Do you serve Leander TX for bathroom remodeling?', answer: 'Yes — Leander is one of our core service areas, adjacent to Cedar Park and northwest Austin.' },
    ],
  },
  kyle: {
    name: 'Kyle',
    description: 'Quality bathroom transformations in Kyle, TX.',
    longDescription: 'Kyle has exploded in population over the past decade, with thousands of new-construction homes and mature neighborhoods alike. Our team brings professional bathroom renovation services to Kyle homeowners at fair prices.',
    neighborhood: 'Plum Creek, Polo Club, Cypress, Winfield, Hartson',
    population: '65,000+',
    faqs: [
      { question: 'Do you serve Kyle TX for bathroom remodeling?', answer: 'Yes — Kyle is south of Austin on I-35 and is fully in our service area.' },
    ],
  },
  buda: {
    name: 'Buda',
    description: 'Expert bathroom remodeling in Buda, TX.',
    longDescription: 'Buda is a fast-growing community just south of Austin with a mix of new subdivisions and older charming homes. We deliver professional bathroom renovations to Buda homeowners looking to update and modernize their spaces.',
    neighborhood: 'Garlic Creek, Whispering Hollow, Shadow Creek, Green Meadows',
    population: '30,000+',
    faqs: [
      { question: 'Do you serve Buda TX for bathroom remodeling?', answer: 'Yes — Buda is just 15 miles south of Austin and fully within our service coverage area.' },
    ],
  },
  'san-marcos': {
    name: 'San Marcos',
    description: 'Quality bathroom remodeling in San Marcos, TX.',
    longDescription: 'San Marcos is home to Texas State University and a growing residential community between Austin and San Antonio. Our team provides expert bathroom renovation services for San Marcos homeowners and investment property owners alike.',
    neighborhood: 'Spring Lake, Blanco Gardens, Wonder World, Blanco Vista',
    population: '70,000+',
    faqs: [
      { question: 'Do you serve San Marcos TX for bathroom remodeling?', answer: 'Yes — San Marcos is on the I-35 corridor between Austin and San Antonio, within our service area.' },
    ],
  },
  // Houston Metro
  houston: {
    name: 'Houston',
    description: 'Expert bathroom remodeling services in Houston, TX.',
    longDescription: 'Houston is the largest city in Texas and one of the most diverse cities in the nation. From Memorial Park mansions to Katy prairie new-builds, Houston homeowners deserve beautiful bathrooms. Our team brings expert craftsmanship and premium materials to every Houston bathroom remodel — walk-in showers, walk-in baths, full renovations, and more.',
    neighborhood: 'Memorial, The Heights, River Oaks, Montrose, Midtown, Sugar Land, Katy, Cypress',
    population: '2,300,000+',
    faqs: [
      { question: 'Do you serve Houston for bathroom remodeling?', answer: 'Yes — we proudly serve the Greater Houston area including Houston proper, The Woodlands, Sugar Land, Katy, Pearland, and surrounding suburbs.' },
      { question: 'How much does a bathroom remodel cost in Houston?', answer: 'Houston bathroom remodels typically range from $10,000 to $45,000 depending on size, scope, and materials. We offer free in-home consultations.' },
      { question: 'How long does a bathroom remodel take in Houston?', answer: 'Most Houston bathroom projects take 2–4 weeks. We schedule projects to minimize disruption and work efficiently through each phase.' },
    ],
  },
  'the-woodlands': {
    name: 'The Woodlands',
    description: 'Premium bathroom remodeling in The Woodlands, TX.',
    longDescription: 'The Woodlands is one of the premier master-planned communities in the United States, with upscale residential neighborhoods and homeowners who expect top-tier craftsmanship. Our team delivers luxury bathroom renovations tailored to the elevated standards of Woodlands homes.',
    neighborhood: 'Creekside Park, Sterling Ridge, Panther Creek, Cochran\'s Crossing, Alden Bridge',
    population: '120,000+',
    faqs: [
      { question: 'Do you serve The Woodlands for bathroom remodeling?', answer: 'Yes — The Woodlands and all surrounding communities including Spring and Tomball are in our Houston Metro service area.' },
    ],
  },
  'sugar-land': {
    name: 'Sugar Land',
    description: 'Expert bathroom renovations in Sugar Land, TX.',
    longDescription: 'Sugar Land is a thriving Fort Bend County community known for its well-planned neighborhoods, excellent schools, and high quality of life. We bring the same premium bathroom remodeling standards to Sugar Land homeowners as we do throughout Texas.',
    neighborhood: 'New Territory, Greatwood, Telfair, First Colony, Riverpark',
    population: '111,000+',
    faqs: [
      { question: 'Do you serve Sugar Land TX for bathroom remodeling?', answer: 'Yes — Sugar Land is in our Houston Metro service territory. We serve all of Fort Bend County.' },
    ],
  },
  pearland: {
    name: 'Pearland',
    description: 'Quality bathroom remodeling in Pearland, TX.',
    longDescription: 'Pearland is one of the fastest-growing cities in Texas, with housing developments spanning Brazoria County. Our team provides comprehensive bathroom renovation services throughout Pearland for both new and established homeowners.',
    neighborhood: 'Shadow Creek Ranch, Silverlake, Southwyck, Green Tee, Friendswood',
    population: '125,000+',
    faqs: [
      { question: 'Do you serve Pearland TX for bathroom remodeling?', answer: 'Yes — Pearland and Friendswood are within our Houston South Metro service area.' },
    ],
  },
  katy: {
    name: 'Katy',
    description: 'Professional bathroom remodeling in Katy, TX.',
    longDescription: 'Katy is a beloved Houston suburb known for its excellent schools and family-friendly neighborhoods. Whether you\'re doing a quick powder room refresh or a complete master bath transformation, our team delivers quality bathroom renovations across Katy.',
    neighborhood: 'LaCenterra, Grand Lakes, Seven Meadows, Firethorne, Kelliwood',
    population: '21,000+ (city); 350,000+ metro',
    faqs: [
      { question: 'Do you serve Katy TX for bathroom remodeling?', answer: 'Yes — Katy and the I-10 West corridor is in our Houston Metro service area.' },
    ],
  },
  // Dallas-Fort Worth Metro
  dallas: {
    name: 'Dallas',
    description: 'Expert bathroom remodeling services in Dallas, TX.',
    longDescription: 'Dallas is the economic hub of North Texas and one of the fastest-growing metros in the country. From Preston Hollow estates to Uptown condos and DFW suburbs, Dallas homeowners trust us for premium bathroom renovations. Our team brings innovative design, quality materials, and expert installation to every Dallas project.',
    neighborhood: 'Preston Hollow, Uptown, Oak Cliff, M Streets, East Dallas, Lake Highlands',
    population: '1,300,000+',
    faqs: [
      { question: 'Do you serve Dallas for bathroom remodeling?', answer: 'Yes — we serve Dallas and the entire DFW Metroplex including Plano, Frisco, McKinney, Garland, Irving, Arlington, and more.' },
      { question: 'How much does a bathroom remodel cost in Dallas?', answer: 'Dallas bathroom remodels typically range from $10,000 to $50,000 depending on the scope, finishes, and home value tier. We offer free in-home estimates.' },
      { question: 'What bathroom remodeling services do you offer in Dallas?', answer: 'Full bathroom renovations, master bath remodels, guest bath updates, shower tile overhauls, walk-in bath installations, tub to shower conversions, vanity replacements, and ADA accessibility upgrades.' },
    ],
  },
  'fort-worth': {
    name: 'Fort Worth',
    description: 'Premier bathroom remodeling in Fort Worth, TX.',
    longDescription: 'Fort Worth — "Where the West Begins" — combines Texas heritage with modern urban growth. From TCU neighborhoods to Alliance corridor suburbs, Fort Worth homeowners deserve bathroom renovations as bold as the city itself. Our team brings craftsmanship and design expertise to every Fort Worth project.',
    neighborhood: 'Westover Hills, Tanglewood, TCU, Sundance Square area, Southlake, Keller',
    population: '935,000+',
    faqs: [
      { question: 'Do you serve Fort Worth for bathroom remodeling?', answer: 'Yes — we serve Fort Worth and Tarrant County, including Southlake, Keller, Colleyville, Hurst, Euless, and Bedford.' },
      { question: 'How long does a bathroom remodel take in Fort Worth?', answer: 'Most Fort Worth bathroom remodels take 2–4 weeks. Complex full renovations may run 4–6 weeks.' },
    ],
  },
  arlington: {
    name: 'Arlington',
    description: 'Expert bathroom renovations in Arlington, TX.',
    longDescription: 'Arlington sits between Dallas and Fort Worth as the entertainment capital of the Metroplex. With a large and diverse housing market, Arlington homeowners have trusted us for quality bathroom renovations that modernize older homes and upgrade new ones.',
    neighborhood: 'Park Row, South Arlington, Viridian, North Arlington, Pantego',
    population: '395,000+',
    faqs: [
      { question: 'Do you serve Arlington TX for bathroom remodeling?', answer: 'Yes — Arlington is centrally located between Dallas and Fort Worth and is in our DFW Metro service area.' },
    ],
  },
  plano: {
    name: 'Plano',
    description: 'Quality bathroom remodeling in Plano, TX.',
    longDescription: 'Plano is one of the wealthiest and most sought-after cities in Texas, with corporate headquarters, top-rated schools, and established residential neighborhoods that demand premium home renovation services. Our bathroom remodeling team delivers the high-quality results Plano homeowners expect.',
    neighborhood: 'West Plano, Legacy Town Center, East Plano, Parker, Carrollton border',
    population: '287,000+',
    faqs: [
      { question: 'Do you serve Plano TX for bathroom remodeling?', answer: 'Yes — Plano and northern Collin County are full service areas for us in the DFW Metroplex.' },
      { question: 'What is the average cost of a bathroom remodel in Plano?', answer: 'Plano bathroom remodels range from $12,000 to $55,000+ due to the higher home values. We offer detailed free estimates tailored to your specific project.' },
    ],
  },
  garland: {
    name: 'Garland',
    description: 'Professional bathroom remodeling in Garland, TX.',
    longDescription: 'Garland is a large Dallas suburb with a diverse mix of established neighborhoods and new development. We deliver expert bathroom renovation services throughout Garland, helping homeowners modernize outdated bathrooms with quality craftsmanship.',
    neighborhood: 'Duck Creek, Firewheel, Sachse, Rowlett',
    population: '246,000+',
    faqs: [
      { question: 'Do you serve Garland TX for bathroom remodeling?', answer: 'Yes — Garland and eastern Dallas County are in our DFW service area.' },
    ],
  },
  irving: {
    name: 'Irving',
    description: 'Expert bathroom renovations in Irving, TX.',
    longDescription: 'Irving is home to the Las Colinas Urban Center and dozens of corporate campuses, attracting homeowners who demand quality. From the lakefront homes of Las Colinas to established Irving neighborhoods, we bring premium bathroom renovation services to every project.',
    neighborhood: 'Las Colinas, Valley Ranch, Coppell border, North Irving',
    population: '244,000+',
    faqs: [
      { question: 'Do you serve Irving TX for bathroom remodeling?', answer: 'Yes — Irving and Las Colinas are in our DFW Metro service area.' },
    ],
  },
  frisco: {
    name: 'Frisco',
    description: 'Luxury bathroom remodeling in Frisco, TX.',
    longDescription: 'Frisco has been one of the fastest-growing cities in the United States for over a decade. With massive new developments and high-income households, Frisco homeowners invest in premium bathroom renovations. Our team brings the design creativity and craftsmanship Frisco homes deserve.',
    neighborhood: 'Starwood, Phillips Creek Ranch, Stonebriar, Richwoods, The Colony',
    population: '225,000+',
    faqs: [
      { question: 'Do you serve Frisco TX for bathroom remodeling?', answer: 'Yes — Frisco and northern Collin County are primary service areas in our DFW coverage zone.' },
      { question: 'What is the cost of a bathroom remodel in Frisco?', answer: 'Frisco bathroom remodels typically range from $15,000 to $60,000+ given the premium home values and high design expectations in the market.' },
    ],
  },
  mckinney: {
    name: 'McKinney',
    description: 'Premier bathroom remodeling in McKinney, TX.',
    longDescription: 'McKinney has been named one of the best places to live in America multiple times. With a thriving historic downtown and sprawling new-construction neighborhoods, McKinney homeowners trust us for expert bathroom renovations that keep pace with the city\'s exceptional quality of life.',
    neighborhood: 'Craig Ranch, Stonebridge Ranch, downtown McKinney, Adriatica',
    population: '186,000+',
    faqs: [
      { question: 'Do you serve McKinney TX for bathroom remodeling?', answer: 'Yes — McKinney and Collin County are fully serviced by our DFW team.' },
    ],
  },
  denton: {
    name: 'Denton',
    description: 'Expert bathroom renovations in Denton, TX.',
    longDescription: 'Denton is home to the University of North Texas and Texas Woman\'s University, with a diverse population of homeowners, faculty, and young families renovating older homes and new builds alike. Our team delivers quality bathroom remodeling throughout Denton County.',
    neighborhood: 'UNT area, Little Elm, Lantana, Corinth, Lake Dallas',
    population: '148,000+',
    faqs: [
      { question: 'Do you serve Denton TX for bathroom remodeling?', answer: 'Yes — Denton and the I-35E/I-35W corridor in Denton County are in our DFW service area.' },
    ],
  },
  // San Antonio Metro
  'san-antonio': {
    name: 'San Antonio',
    description: 'Expert bathroom remodeling in San Antonio, TX.',
    longDescription: 'San Antonio is one of the most vibrant cities in the country, blending rich history with rapid modern growth. From the King William Historic District to Stone Oak and The Dominion, San Antonio homeowners trust us for bathroom renovations that combine beauty, quality, and value. Our team serves all 26+ zip codes of San Antonio.',
    neighborhood: 'Stone Oak, The Dominion, Alamo Heights, King William, Helotes, Boerne corridor',
    population: '1,500,000+',
    faqs: [
      { question: 'Do you serve San Antonio for bathroom remodeling?', answer: 'Yes — San Antonio is a primary service city. We serve all neighborhoods from Northside to Southside, Stone Oak to the Medical Center area.' },
      { question: 'How much does a bathroom remodel cost in San Antonio?', answer: 'San Antonio bathroom remodels typically range from $9,000 to $40,000. We provide free detailed estimates for every project.' },
      { question: 'What bathroom services do you offer in San Antonio?', answer: 'Full bathroom renovations, master bath remodels, shower upgrades, walk-in bath installations, tub to shower conversions, tile work, and accessibility modifications.' },
    ],
  },
  'new-braunfels': {
    name: 'New Braunfels',
    description: 'Quality bathroom remodeling in New Braunfels, TX.',
    longDescription: 'New Braunfels is a charming Texas Hill Country city on the Guadalupe and Comal Rivers, experiencing rapid growth between San Antonio and Austin. From historic downtown homes to new Veramendi subdivisions, our team delivers expert bathroom renovations throughout New Braunfels.',
    neighborhood: 'Veramendi, Gruene, Sundance, Vintage Oaks, Canyon Lake',
    population: '90,000+',
    faqs: [
      { question: 'Do you serve New Braunfels TX for bathroom remodeling?', answer: 'Yes — New Braunfels is between Austin and San Antonio on I-35 and is in our service area.' },
    ],
  },
  // Other Major Texas Cities
  'el-paso': {
    name: 'El Paso',
    description: 'Professional bathroom remodeling in El Paso, TX.',
    longDescription: 'El Paso sits on the Rio Grande at the far western tip of Texas, where West Texas sunshine meets Border culture. El Paso homeowners across all neighborhoods — from the historic Kern Place to newer Eastside and Northeast developments — trust us for quality bathroom renovation services.',
    neighborhood: 'Kern Place, Sunset Heights, Westside, East El Paso, Northeast El Paso, Horizon City',
    population: '682,000+',
    faqs: [
      { question: 'Do you serve El Paso for bathroom remodeling?', answer: 'Yes — we serve homeowners across El Paso and provide the full range of bathroom remodeling services.' },
      { question: 'How much does a bathroom remodel cost in El Paso?', answer: 'El Paso bathroom remodels are generally more affordable than other major Texas markets, ranging from $8,000 to $30,000. Contact us for a free local estimate.' },
    ],
  },
  'corpus-christi': {
    name: 'Corpus Christi',
    description: 'Expert bathroom remodeling in Corpus Christi, TX.',
    longDescription: 'Corpus Christi is the "Sparkling City by the Sea," with a coastal lifestyle that influences home design. From the upscale Corpus Christi Bay homes to the South Side developments and Portland suburbs, our team brings expert bathroom renovation services to the Coastal Bend.',
    neighborhood: 'South Side, Flour Bluff, Portland, Calallen, Padre Island',
    population: '320,000+',
    faqs: [
      { question: 'Do you serve Corpus Christi for bathroom remodeling?', answer: 'Yes — we serve Corpus Christi and the Coastal Bend area for full bathroom remodeling services.' },
    ],
  },
  lubbock: {
    name: 'Lubbock',
    description: 'Quality bathroom remodeling in Lubbock, TX.',
    longDescription: 'Lubbock is home to Texas Tech University and a thriving West Texas economy. With a mix of historic South Lubbock bungalows and sprawling North Lubbock new construction, our team delivers quality bathroom renovation services to Lubbock homeowners.',
    neighborhood: 'Maxey Park, Tech Terrace, South Lubbock, North Lubbock, Wolfcamp',
    population: '260,000+',
    faqs: [
      { question: 'Do you serve Lubbock TX for bathroom remodeling?', answer: 'Yes — Lubbock and the South Plains area are in our extended Texas service zone.' },
    ],
  },
  amarillo: {
    name: 'Amarillo',
    description: 'Premier bathroom remodeling in Amarillo, TX.',
    longDescription: 'Amarillo is the heart of the Texas Panhandle, a city of ranchers, medical professionals, and established families. Our team serves Amarillo homeowners looking to modernize their bathrooms with contemporary designs and quality craftsmanship.',
    neighborhood: 'Wolflin, Sleepy Hollow, South Georgia, West Amarillo, Canyon',
    population: '200,000+',
    faqs: [
      { question: 'Do you serve Amarillo TX for bathroom remodeling?', answer: 'Yes — Amarillo and the Texas Panhandle are in our statewide service coverage.' },
    ],
  },
  waco: {
    name: 'Waco',
    description: 'Expert bathroom renovations in Waco, TX.',
    longDescription: 'Waco has experienced a massive resurgence thanks to the Fixer Upper phenomenon and Magnolia Market, inspiring homeowners statewide with beautiful renovations. Our team brings that same passion for quality to Waco bathroom remodeling projects — from craftsman bungalows near the Baylor campus to new McLennan County homes.',
    neighborhood: 'Baylor area, Hewitt, Woodway, Lorena, China Spring',
    population: '135,000+',
    faqs: [
      { question: 'Do you serve Waco TX for bathroom remodeling?', answer: 'Yes — Waco and McLennan County are in our Central Texas service area, approximately 1 hour south of Dallas.' },
    ],
  },
  midland: {
    name: 'Midland',
    description: 'Quality bathroom remodeling in Midland, TX.',
    longDescription: 'Midland is the financial center of the Permian Basin — one of the most productive oil fields in the world. With high-income homeowners in the oil and gas industry, Midland demands quality bathroom renovations with premium finishes. Our team delivers.',
    neighborhood: 'Green Tree, Grassland, Stonegate, Colony Park',
    population: '135,000+',
    faqs: [
      { question: 'Do you serve Midland TX for bathroom remodeling?', answer: 'Yes — Midland and the Permian Basin are in our extended Texas service territory.' },
    ],
  },
  odessa: {
    name: 'Odessa',
    description: 'Professional bathroom remodeling in Odessa, TX.',
    longDescription: 'Odessa is the industrial partner to neighboring Midland in the Permian Basin. With a strong economy and growing residential market, Odessa homeowners trust us for professional bathroom renovations that deliver lasting quality.',
    neighborhood: 'University, Country Club, East Odessa, Stonegate',
    population: '120,000+',
    faqs: [
      { question: 'Do you serve Odessa TX for bathroom remodeling?', answer: 'Yes — Odessa and Ector County are in our Permian Basin service zone.' },
    ],
  },
  abilene: {
    name: 'Abilene',
    description: 'Expert bathroom remodeling in Abilene, TX.',
    longDescription: 'Abilene is a regional hub for West Texas and home to three universities. With a diverse mix of historic homes and modern subdivisions, Abilene homeowners trust us for professional bathroom renovations that balance character with contemporary function.',
    neighborhood: 'Wylie, Mid-Abilene, Hendrick, Southwest Abilene',
    population: '125,000+',
    faqs: [
      { question: 'Do you serve Abilene TX for bathroom remodeling?', answer: 'Yes — Abilene and Taylor County are in our extended West Texas service area.' },
    ],
  },
  tyler: {
    name: 'Tyler',
    description: 'Premier bathroom remodeling in Tyler, TX.',
    longDescription: 'Tyler is the "Rose Capital of America" and the largest city in East Texas. With a mix of historic homes, newer developments at Cascades, and surrounding lake communities, Tyler homeowners trust us for beautiful bathroom renovations.',
    neighborhood: 'The Cascades, Hollytree, Troup, Whitehouse, Chapel Hill',
    population: '105,000+',
    faqs: [
      { question: 'Do you serve Tyler TX for bathroom remodeling?', answer: 'Yes — Tyler and East Texas are in our extended Texas service coverage area.' },
    ],
  },
  'wichita-falls': {
    name: 'Wichita Falls',
    description: 'Expert bathroom renovations in Wichita Falls, TX.',
    longDescription: 'Wichita Falls is home to Sheppard Air Force Base and a strong regional economy. Military families and established homeowners alike trust us for quality bathroom renovations that stand up to the Texas climate and busy household demands.',
    neighborhood: 'Country Club, Holliday Road, Iowa Park, Electra',
    population: '103,000+',
    faqs: [
      { question: 'Do you serve Wichita Falls TX for bathroom remodeling?', answer: 'Yes — Wichita Falls and North Texas are in our statewide service territory.' },
    ],
  },
  beaumont: {
    name: 'Beaumont',
    description: 'Quality bathroom remodeling in Beaumont, TX.',
    longDescription: 'Beaumont is the largest city in Southeast Texas, home to a major petrochemical industry and diverse neighborhoods. From the historic Calder and McFaddin-Ward areas to newer subdivisions on the outskirts, our team delivers expert bathroom renovations throughout the Beaumont-Port Arthur metro.',
    neighborhood: 'Calder, Tyrrell Park, Spindletop, Vidor, Port Arthur',
    population: '115,000+',
    faqs: [
      { question: 'Do you serve Beaumont TX for bathroom remodeling?', answer: 'Yes — Beaumont and Southeast Texas are in our extended Texas service zone.' },
    ],
  },
  mcallen: {
    name: 'McAllen',
    description: 'Professional bathroom remodeling in McAllen, TX.',
    longDescription: 'McAllen is the commercial heart of the Rio Grande Valley, one of the fastest-growing regions in the country. With a dynamic mix of established neighborhoods and new construction, McAllen homeowners trust us for quality bathroom renovations that combine style with durability.',
    neighborhood: 'North McAllen, Mission, Edinburg, Pharr, Hidalgo',
    population: '145,000+',
    faqs: [
      { question: 'Do you serve McAllen TX for bathroom remodeling?', answer: 'Yes — McAllen and the Rio Grande Valley are in our extended South Texas service coverage.' },
    ],
  },
  laredo: {
    name: 'Laredo',
    description: 'Expert bathroom remodeling in Laredo, TX.',
    longDescription: 'Laredo is a major international trade hub and one of the fastest-growing cities in Texas. With a booming residential market driven by international commerce and a growing professional class, Laredo homeowners trust us for quality bathroom renovation services.',
    neighborhood: 'North Laredo, Del Mar, Heights, South Laredo',
    population: '254,000+',
    faqs: [
      { question: 'Do you serve Laredo TX for bathroom remodeling?', answer: 'Yes — Laredo and Webb County are in our South Texas service territory.' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(serviceAreas).map((id) => ({ id }))
}

export default function ServiceAreaPage({ params }: { params: { id: string } }) {
  const area = serviceAreas[params.id]
  if (!area) notFound()

  const services = [
    'Full Bathroom Renovations',
    'Master Bath Remodels',
    'Walk-In Shower Installations',
    'Tub to Shower Conversions',
    'Walk-In Bath Installations',
    'Vanity & Fixture Upgrades',
    'Custom Tile Work',
    'ADA Accessibility Modifications',
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/service-area" className="hover:text-blue-600 transition-colors">Service Areas</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{area.name}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white shadow-sm mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Serving {area.name}, TX</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight mb-6">
            Bathroom Remodeling in{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
              {area.name}, TX
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-4 max-w-3xl">
            {area.longDescription}
          </p>

          {area.population && (
            <p className="text-sm text-gray-500 mb-8">
              Population: <strong>{area.population}</strong> &nbsp;·&nbsp; Neighborhoods served: {area.neighborhood}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:512-492-2321"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call 512-492-2321
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-600 rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-all text-lg"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-3">
            Bathroom Remodeling Services in <span className="text-cyan-600">{area.name}</span>
          </h2>
          <p className="text-gray-600 mb-10">
            Premier Bathroom Remodel Texas offers the complete range of bathroom renovation services to {area.name} homeowners.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div key={service} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                <svg className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-800">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-10">
            Why {area.name} Homeowners Choose Premier Bathroom Remodel Texas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Licensed & Insured', body: 'Fully licensed Texas contractor with comprehensive liability insurance protecting you and your home on every project.' },
              { title: '15+ Years Experience', body: 'Over a decade of bathroom remodeling across Texas means we\'ve seen — and solved — every challenge a bathroom renovation can present.' },
              { title: 'Local Texas Expertise', body: 'We understand Texas homes, Texas climate, Texas building codes, and Texas homeowners\' expectations. 100% local team, every time.' },
              { title: 'Free Detailed Quotes', body: 'No guesswork. We visit your home, measure every inch, and provide a comprehensive written quote before any work begins.' },
              { title: 'Quality Materials', body: 'We source premium tile, fixtures, and materials from trusted suppliers. Every product we install is built to last in a Texas home.' },
              { title: 'Transparent Timeline', body: 'We commit to a schedule and stick to it. You\'ll always know the project status — no surprises, no delays without communication.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {area.faqs && area.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-light text-gray-900 mb-10">
              Frequently Asked Questions — Bathroom Remodeling in {area.name}
            </h2>
            <div className="space-y-6">
              {area.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Ready to Transform Your {area.name} Bathroom?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Call us today or fill out our free estimate form. We serve all of {area.name} and greater Texas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:512-492-2321"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-lg font-semibold text-blue-600 hover:bg-blue-50 transition-all text-lg"
            >
              Call (512) 492-2321
            </a>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold text-white hover:bg-white/10 transition-all text-lg"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Related Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Other Texas Cities We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Austin', 'Houston', 'Dallas', 'San Antonio', 'Fort Worth', 'Plano', 'Frisco', 'Round Rock', 'Cedar Park', 'Georgetown', 'The Woodlands', 'Sugar Land', 'El Paso', 'Corpus Christi', 'Lubbock'].map((city) => (
              <Link
                key={city}
                href={`/service-area/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 text-sm font-medium text-blue-600 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                {city}
              </Link>
            ))}
            <Link href="/service-area" className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              View All Cities →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
