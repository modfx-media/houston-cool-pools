/**
 * Programmatic SEO location catalog for the greater Houston metro.
 *
 * Tiers:
 *  - 1: Core service area - highest priority. `live: true` for launch.
 *  - 2: Adjacent cities with GSC evidence (real impressions/queries in the last 16 mo).
 *  - 3: Adjacent cities within realistic drive-time service radius, no direct GSC
 *       evidence yet, staged behind `live: true` for a later batch.
 *
 * `nearbyLocations` powers internal linking on each generated page.
 */

export type PseoLocation = {
  /** URL-safe slug - combines with service slug */
  slug: string;
  /** Full city / neighborhood name for headings */
  cityName: string;
  /** Two-letter state - always TX for this project */
  state: "TX";
  /** County - used in local-relevance content when defensible */
  county: string;
  tier: 1 | 2 | 3;
  /** Enable/disable output for this location. Staged rollout is boolean-flip only. */
  live: boolean;
  /** 3-4 nearby location slugs for internal linking */
  nearbyLocations: string[];
  /** Short defensible descriptor - used in intro paragraphs. Never invents facts. */
  descriptor: string;
  /** Optional neighborhood or landmark shorthand for local-relevance block */
  landmarkNote?: string;
};

export const LOCATIONS: PseoLocation[] = [
  // ─── TIER 1 - CORE SERVICE AREA (live at launch) ───────────────────────────
  {
    slug: "houston",
    cityName: "Houston",
    state: "TX",
    county: "Harris County",
    tier: 1,
    live: true,
    nearbyLocations: ["the-heights", "cypress", "spring", "katy", "tomball"],
    descriptor:
      "Houston homeowners span dozens of neighborhoods and dozens of soil profiles, and every project is scoped to the specific site rather than a generic city-wide template.",
    landmarkNote: "Greater Houston metro",
  },
  {
    slug: "cypress",
    cityName: "Cypress",
    state: "TX",
    county: "Harris County",
    tier: 1,
    live: true,
    nearbyLocations: ["tomball", "spring", "houston", "hockley", "jersey-village"],
    descriptor:
      "Cypress backyards typically sit on larger lots than the inner-loop neighborhoods, which opens up more shape and depth options for gunite pools.",
    landmarkNote: "Along the 290 corridor northwest of Houston",
  },
  {
    slug: "spring",
    cityName: "Spring",
    state: "TX",
    county: "Harris County",
    tier: 1,
    live: true,
    nearbyLocations: ["tomball", "the-woodlands", "kingwood", "houston", "cypress"],
    descriptor:
      "Spring runs from established neighborhoods near I-45 out to newer master-planned communities - pool projects here vary widely in scale.",
    landmarkNote: "North Houston, along the I-45 corridor",
  },
  {
    slug: "tomball",
    cityName: "Tomball",
    state: "TX",
    county: "Harris County",
    tier: 1,
    live: true,
    nearbyLocations: ["cypress", "spring", "magnolia", "the-woodlands", "hockley"],
    descriptor:
      "Tomball's mix of country lots and newer subdivisions means we build everything from resort-style pools to compact courtyard designs.",
    landmarkNote: "Northwest of Houston, near 249",
  },
  {
    slug: "the-heights",
    cityName: "The Heights",
    state: "TX",
    county: "Harris County",
    tier: 1,
    live: true,
    nearbyLocations: ["houston", "bellaire", "west-university", "memorial", "river-oaks"],
    descriptor:
      "Heights lots are narrower than the suburbs, so pool design here focuses on plunge pools, cocktail pools, sun shelves, and integrated hardscape.",
    landmarkNote: "Inner-loop historic neighborhood northwest of downtown Houston",
  },
  {
    slug: "katy",
    cityName: "Katy",
    state: "TX",
    county: "Fort Bend / Harris / Waller County",
    tier: 1,
    live: true,
    nearbyLocations: ["fulshear", "richmond", "cypress", "houston", "sugar-land"],
    descriptor:
      "Katy's master-planned communities and larger backyards make it one of our most active build regions for full custom gunite projects.",
    landmarkNote: "West of Houston, along I-10",
  },

  // ─── TIER 2 - GSC-EVIDENCED, staged live=false pending QA ─────────────────
  {
    slug: "conroe",
    cityName: "Conroe",
    state: "TX",
    county: "Montgomery County",
    tier: 2,
    live: true,
    nearbyLocations: ["the-woodlands", "spring", "magnolia", "willis"],
    descriptor:
      "Conroe sits at the northern edge of our regular service area, and lakeside and acreage lots there often call for bigger gunite footprints.",
    landmarkNote: "North of The Woodlands, along I-45",
  },
  {
    slug: "the-woodlands",
    cityName: "The Woodlands",
    state: "TX",
    county: "Montgomery County",
    tier: 2,
    live: true,
    nearbyLocations: ["spring", "conroe", "tomball", "magnolia"],
    descriptor:
      "The Woodlands' mature tree canopy and HOA overlays make design review and equipment placement a real part of the build conversation.",
    landmarkNote: "Master-planned community north of Houston",
  },
  {
    slug: "kingwood",
    cityName: "Kingwood",
    state: "TX",
    county: "Harris County",
    tier: 2,
    live: true,
    nearbyLocations: ["humble", "atascocita", "spring", "houston"],
    descriptor:
      "Kingwood's wooded lots and drainage patterns make site planning especially important on any new pool project.",
    landmarkNote: "Northeast Houston, near Lake Houston",
  },
  {
    slug: "friendswood",
    cityName: "Friendswood",
    state: "TX",
    county: "Galveston / Harris County",
    tier: 2,
    live: true,
    nearbyLocations: ["league-city", "pearland", "clear-lake", "houston"],
    descriptor:
      "Friendswood backyards benefit from a Gulf-adjacent climate that stretches the swim season and puts extra emphasis on chemistry management.",
    landmarkNote: "Southeast Houston, near the Clear Lake area",
  },
  {
    slug: "league-city",
    cityName: "League City",
    state: "TX",
    county: "Galveston County",
    tier: 2,
    live: true,
    nearbyLocations: ["friendswood", "clear-lake", "pearland", "houston"],
    descriptor:
      "League City's coastal proximity means we pay closer attention to material choices - coping, decking, and equipment enclosures that hold up in salt-air humidity.",
    landmarkNote: "Southeast of Houston, along I-45",
  },
  {
    slug: "clear-lake",
    cityName: "Clear Lake",
    state: "TX",
    county: "Harris / Galveston County",
    tier: 2,
    live: true,
    nearbyLocations: ["friendswood", "league-city", "pearland", "houston"],
    descriptor:
      "Clear Lake backyards range from waterfront lots to inland subdivisions - both benefit from thoughtful drainage planning around a new pool.",
    landmarkNote: "Southeast Houston, near NASA",
  },
  {
    slug: "baytown",
    cityName: "Baytown",
    state: "TX",
    county: "Harris / Chambers County",
    tier: 2,
    live: true,
    nearbyLocations: ["houston", "deer-park", "pasadena"],
    descriptor:
      "Baytown projects sit at the eastern edge of our service area - most are new gunite builds on established residential lots.",
    landmarkNote: "East Houston, near the Ship Channel",
  },
  {
    slug: "deer-park",
    cityName: "Deer Park",
    state: "TX",
    county: "Harris County",
    tier: 2,
    live: true,
    nearbyLocations: ["pasadena", "baytown", "houston"],
    descriptor:
      "Deer Park's older residential grid means many pool projects involve tight-access excavation and creative equipment placement.",
    landmarkNote: "Southeast Houston, near Pasadena",
  },
  {
    slug: "west-university",
    cityName: "West University",
    state: "TX",
    county: "Harris County",
    tier: 2,
    live: true,
    nearbyLocations: ["bellaire", "the-heights", "river-oaks", "memorial", "houston"],
    descriptor:
      "West U lots are among the tightest in the metro, so we favor plunge and cocktail pools, sun shelves, and vertical hardscape features here.",
    landmarkNote: "Inner-loop residential enclave southwest of downtown",
  },
  {
    slug: "bunker-hill-village",
    cityName: "Bunker Hill Village",
    state: "TX",
    county: "Harris County",
    tier: 2,
    live: true,
    nearbyLocations: ["memorial", "hedwig-village", "piney-point-village", "houston"],
    descriptor:
      "Bunker Hill Village lots are wooded and generous, and pool projects here often integrate with existing hardscape and mature trees.",
    landmarkNote: "Memorial-area village community",
  },

  // ─── TIER 3 - Drive-time reachable, no direct GSC signal yet ──────────────
  {
    slug: "sugar-land",
    cityName: "Sugar Land",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["missouri-city", "richmond", "stafford", "houston"],
    descriptor:
      "Sugar Land's master-planned neighborhoods have varied HOA design requirements - worth reviewing before finalizing pool plans.",
    landmarkNote: "Southwest Houston, along US-59",
  },
  {
    slug: "pearland",
    cityName: "Pearland",
    state: "TX",
    county: "Brazoria / Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["friendswood", "manvel", "missouri-city", "houston"],
    descriptor:
      "Pearland's rapid growth means we build on both mature lots and brand-new construction - the two need very different site preparation.",
    landmarkNote: "South Houston, along TX-288",
  },
  {
    slug: "richmond",
    cityName: "Richmond",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["fulshear", "katy", "sugar-land", "rosenberg"],
    descriptor:
      "Richmond and surrounding Fort Bend neighborhoods have generous lot sizes that support larger custom pool designs.",
    landmarkNote: "Fort Bend, southwest of Houston",
  },
  {
    slug: "fulshear",
    cityName: "Fulshear",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["katy", "richmond", "houston"],
    descriptor:
      "Fulshear is one of the fastest-growing suburbs west of Houston - plenty of new-build lots with room for a full custom gunite design.",
    landmarkNote: "West Fort Bend, past Katy",
  },
  {
    slug: "magnolia",
    cityName: "Magnolia",
    state: "TX",
    county: "Montgomery County",
    tier: 3,
    live: true,
    nearbyLocations: ["tomball", "the-woodlands", "conroe", "hockley"],
    descriptor:
      "Magnolia's larger acreage lots often support resort-style pool layouts with generous decking and outdoor living space.",
    landmarkNote: "Northwest of Tomball, along FM-1488",
  },
  {
    slug: "pinehurst",
    cityName: "Pinehurst",
    state: "TX",
    county: "Montgomery County",
    tier: 3,
    live: true,
    nearbyLocations: ["tomball", "magnolia", "the-woodlands", "hockley"],
    descriptor:
      "Pinehurst is an unincorporated Montgomery County community between Tomball and Magnolia, with wooded lots and newer subdivision yards along Highway 249.",
    landmarkNote: "Between Tomball and Magnolia on Highway 249",
  },
  {
    slug: "missouri-city",
    cityName: "Missouri City",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["sugar-land", "pearland", "houston", "stafford"],
    descriptor:
      "Missouri City sits between Sugar Land and the inner loop, and its established subdivisions have consistent pool build patterns.",
    landmarkNote: "Southwest of Houston, near Sugar Land",
  },
  {
    slug: "humble",
    cityName: "Humble",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["kingwood", "atascocita", "spring", "houston"],
    descriptor:
      "Humble's older subdivisions and newer master-planned areas both support standard gunite pool builds with typical site prep.",
    landmarkNote: "Northeast Houston, near Lake Houston",
  },
  {
    slug: "atascocita",
    cityName: "Atascocita",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["humble", "kingwood", "spring", "houston"],
    descriptor:
      "Atascocita's wooded neighborhoods around Lake Houston are a good fit for gunite pools that lean into the natural setting.",
    landmarkNote: "Near Lake Houston",
  },
  {
    slug: "jersey-village",
    cityName: "Jersey Village",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["cypress", "houston", "spring"],
    descriptor:
      "Jersey Village's compact residential grid means most pool projects here focus on right-sizing the pool to the lot.",
    landmarkNote: "Northwest Houston, off US-290",
  },
  {
    slug: "bellaire",
    cityName: "Bellaire",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["west-university", "the-heights", "houston", "river-oaks"],
    descriptor:
      "Bellaire's inner-loop lots are on the smaller side, so plunge pools, cocktail pools, and integrated spa designs work particularly well.",
    landmarkNote: "Inner-loop residential city",
  },
  {
    slug: "memorial",
    cityName: "Memorial",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["bunker-hill-village", "hedwig-village", "piney-point-village", "houston"],
    descriptor:
      "Memorial's wooded lots and mature landscaping shape a lot of the design decisions - sun exposure and equipment access are always part of the conversation.",
    landmarkNote: "West Houston, along Memorial Drive",
  },
  {
    slug: "river-oaks",
    cityName: "River Oaks",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["the-heights", "west-university", "memorial", "houston"],
    descriptor:
      "River Oaks projects tend to be higher-spec custom builds with premium finishes and integrated outdoor living design.",
    landmarkNote: "Inner-loop, west of downtown Houston",
  },
  {
    slug: "pasadena",
    cityName: "Pasadena",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["deer-park", "baytown", "houston"],
    descriptor:
      "Pasadena's mix of older neighborhoods and newer subdivisions supports both new gunite builds and equipment-focused remodels.",
    landmarkNote: "Southeast Houston",
  },
  {
    slug: "rosenberg",
    cityName: "Rosenberg",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["richmond", "katy", "sugar-land"],
    descriptor:
      "Rosenberg's growth along US-59 has opened up plenty of new-construction backyards ready for custom pool design.",
    landmarkNote: "Southwest Fort Bend",
  },
  {
    slug: "stafford",
    cityName: "Stafford",
    state: "TX",
    county: "Fort Bend / Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["sugar-land", "missouri-city", "houston"],
    descriptor:
      "Stafford sits between Sugar Land and the inner loop, and pool projects there tend to be right-sized suburban builds.",
    landmarkNote: "Southwest of Houston",
  },
  {
    slug: "hockley",
    cityName: "Hockley",
    state: "TX",
    county: "Harris / Waller County",
    tier: 3,
    live: true,
    nearbyLocations: ["cypress", "tomball", "magnolia"],
    descriptor:
      "Hockley acreage lots often support larger pool + outdoor living builds with generous decking and shade structures.",
    landmarkNote: "Northwest of Cypress, along US-290",
  },
  {
    slug: "waller",
    cityName: "Waller",
    state: "TX",
    county: "Waller County",
    tier: 3,
    live: true,
    nearbyLocations: ["hockley", "cypress", "tomball"],
    descriptor:
      "Waller and the surrounding acreage neighborhoods support full-scale custom pool projects with room to spread out.",
    landmarkNote: "Waller County, northwest of Houston",
  },
  {
    slug: "hedwig-village",
    cityName: "Hedwig Village",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["memorial", "bunker-hill-village", "piney-point-village", "houston"],
    descriptor:
      "Hedwig Village lots are private, wooded, and generous - the kind of setting where custom gunite pools really get to breathe.",
    landmarkNote: "Memorial-area village community",
  },
  {
    slug: "piney-point-village",
    cityName: "Piney Point Village",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["memorial", "hedwig-village", "bunker-hill-village", "houston"],
    descriptor:
      "Piney Point Village properties are a natural fit for architect-coordinated pool projects and premium finishes.",
    landmarkNote: "Memorial-area village community",
  },
  {
    slug: "willis",
    cityName: "Willis",
    state: "TX",
    county: "Montgomery County",
    tier: 3,
    live: true,
    nearbyLocations: ["conroe", "the-woodlands", "magnolia"],
    descriptor:
      "Willis and the Lake Conroe area are at the far northern edge of our regular service radius - mostly acreage-scale projects.",
    landmarkNote: "North of Conroe, near Lake Conroe",
  },
  {
    slug: "manvel",
    cityName: "Manvel",
    state: "TX",
    county: "Brazoria County",
    tier: 3,
    live: true,
    nearbyLocations: ["pearland", "friendswood", "houston"],
    descriptor:
      "Manvel is growing quickly south of Pearland, and its new-build neighborhoods have generous lots for custom pool design.",
    landmarkNote: "South of Pearland",
  },
  {
    slug: "sienna",
    cityName: "Sienna",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["missouri-city", "sugar-land", "houston"],
    descriptor:
      "Sienna's master-planned neighborhoods have consistent lot sizes that suit standard-footprint gunite pools with nice deck expansion room.",
    landmarkNote: "Master-planned community south of Missouri City",
  },
  {
    slug: "champions",
    cityName: "Champions",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["spring", "tomball", "cypress", "houston"],
    descriptor:
      "Champions and the surrounding Klein-area neighborhoods have plenty of established backyards ripe for a remodel or a new build.",
    landmarkNote: "Northwest Houston, near FM-1960",
  },
  {
    slug: "klein",
    cityName: "Klein",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["spring", "tomball", "champions", "houston"],
    descriptor:
      "Klein's older subdivisions have a lot of remodel-ready pools alongside new construction that supports full custom builds.",
    landmarkNote: "North Houston, near Champions",
  },

  // ─── TIER 3 - additional Houston-metro cities and neighborhoods ────────────
  {
    slug: "cinco-ranch",
    cityName: "Cinco Ranch",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["katy", "fulshear", "richmond", "sugar-land"],
    descriptor:
      "Cinco Ranch is one of the larger master-planned communities in Katy, and its established lots and HOA-heavy overlays make design coordination a real part of the build.",
    landmarkNote: "West Houston master-planned community",
  },
  {
    slug: "bridgeland",
    cityName: "Bridgeland",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["cypress", "tomball", "houston", "fairfield"],
    descriptor:
      "Bridgeland's newer sections are still filling in, and pool projects here range from starter builds on smaller lots to full custom pools on the larger sites.",
    landmarkNote: "Northwest Houston master-planned community",
  },
  {
    slug: "cross-creek-ranch",
    cityName: "Cross Creek Ranch",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["fulshear", "katy", "richmond", "cinco-ranch"],
    descriptor:
      "Cross Creek Ranch sits on the western edge of the metro and the acreage-scale lots there open up plenty of room for resort-style pool layouts.",
    landmarkNote: "Fulshear master-planned community",
  },
  {
    slug: "meyerland",
    cityName: "Meyerland",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["bellaire", "west-university", "houston", "the-heights"],
    descriptor:
      "Meyerland's mature neighborhoods have existing pools ready for renovation and lots that support thoughtful new construction - drainage planning matters here more than in most of the metro.",
    landmarkNote: "Southwest Houston, inside the 610 Loop area",
  },
  {
    slug: "tanglewood",
    cityName: "Tanglewood",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["memorial", "river-oaks", "houston", "the-heights"],
    descriptor:
      "Tanglewood lots trend larger than the inner-loop neighborhoods, which supports full custom pool designs with attached spas and premium finishes.",
    landmarkNote: "West Houston, near the Galleria",
  },
  {
    slug: "montrose",
    cityName: "Montrose",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["the-heights", "river-oaks", "houston", "bellaire"],
    descriptor:
      "Montrose is dense and lot sizes are narrow - plunge pools, cocktail pools, and compact courtyard designs are where most projects land.",
    landmarkNote: "Inner-loop Houston, south of the Heights",
  },
  {
    slug: "garden-oaks",
    cityName: "Garden Oaks",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["the-heights", "oak-forest", "houston", "spring-branch"],
    descriptor:
      "Garden Oaks has some of the larger inner-loop lots, which lets us build fuller pool layouts than would fit in the Heights proper.",
    landmarkNote: "Inner-loop Houston, north of the Heights",
  },
  {
    slug: "oak-forest",
    cityName: "Oak Forest",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["the-heights", "garden-oaks", "houston", "spring-branch"],
    descriptor:
      "Oak Forest's post-war ranch lots are wide enough for real pool builds, and the neighborhood has a healthy pipeline of both remodels and new construction.",
    landmarkNote: "Northwest Houston, near Garden Oaks",
  },
  {
    slug: "spring-branch",
    cityName: "Spring Branch",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["memorial", "the-heights", "houston", "hedwig-village"],
    descriptor:
      "Spring Branch covers a broad swath of west Houston with a mix of established lots and infill construction - both are common pool-project sites.",
    landmarkNote: "West Houston, along the I-10 corridor",
  },
  {
    slug: "fairfield",
    cityName: "Fairfield",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["cypress", "bridgeland", "tomball", "houston"],
    descriptor:
      "Fairfield is one of the older established communities on the 290 corridor and pool projects there run the range from new builds to full remodels.",
    landmarkNote: "Northwest Houston, along Highway 290",
  },
  {
    slug: "copperfield",
    cityName: "Copperfield",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["cypress", "jersey-village", "houston", "fairfield"],
    descriptor:
      "Copperfield's established subdivisions have older pools ripe for renovation alongside new-build opportunities on the remaining vacant lots.",
    landmarkNote: "Northwest Houston, near Highway 6",
  },
  {
    slug: "seven-meadows",
    cityName: "Seven Meadows",
    state: "TX",
    county: "Fort Bend County",
    tier: 3,
    live: true,
    nearbyLocations: ["katy", "cinco-ranch", "fulshear", "richmond"],
    descriptor:
      "Seven Meadows sits in the Katy corridor with lots that support full custom pool designs and the room for attached spas and outdoor kitchens.",
    landmarkNote: "West Houston, in the Katy area",
  },
  {
    slug: "seabrook",
    cityName: "Seabrook",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["kemah", "clear-lake", "friendswood", "houston"],
    descriptor:
      "Seabrook backyards sit near the water, and pool projects here weigh finish and coping choices for the humidity and salt-air exposure the coast brings.",
    landmarkNote: "Southeast Houston, near Clear Lake",
  },
  {
    slug: "la-porte",
    cityName: "La Porte",
    state: "TX",
    county: "Harris County",
    tier: 3,
    live: true,
    nearbyLocations: ["pasadena", "baytown", "seabrook", "houston"],
    descriptor:
      "La Porte sits east of Houston along the bay, and pool projects there benefit from the same material choices we use for coastal Clear Lake area builds.",
    landmarkNote: "East Houston, along the bay",
  },
  {
    slug: "kemah",
    cityName: "Kemah",
    state: "TX",
    county: "Galveston County",
    tier: 3,
    live: true,
    nearbyLocations: ["seabrook", "clear-lake", "league-city", "friendswood"],
    descriptor:
      "Kemah's coastal setting extends the swim season on either side of summer, and pool builds here plan for humidity and Gulf air in equipment selection.",
    landmarkNote: "Southeast Houston, on Galveston Bay",
  },
];

export function getLocationBySlug(slug: string): PseoLocation | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getLiveLocations(): PseoLocation[] {
  return LOCATIONS.filter((l) => l.live);
}
