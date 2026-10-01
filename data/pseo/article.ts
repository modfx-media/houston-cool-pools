import type { PseoService } from "./services";
import type { PseoLocation } from "./locations";
import { PLACE_NOTES } from "./place-notes";

export type PseoSection = {
  heading: string;
  paragraphs: string[];
};

export type PseoFaq = { q: string; a: string };

type KeywordLike = { query: string };

const PRICE_LINES = [
  "Houston Cool Pools publishes new-pool project ranges at $65k–$90k, $90k–$115k, $115k–$150k, and $150k and up. Those are ranges of finished projects, not a bid for your yard.",
  "What moves a new gunite pool from one range to the next is concrete: water-surface size, whether there is an attached spa, the deck material, the interior finish, and how hard it is to get equipment into the backyard.",
  "A remodel, a resurface, a deck replacement, or an equipment change is priced from the existing pool, not from those new-build ranges. If the shell has to be cut and new gunite tied in, the job starts to look like construction again and the schedule changes with it.",
];

const NEW_BUILD = [
  "Hiring a pool builder in Houston is a construction decision, not a catalog order. The companies that show up for “pool contractor,” “swimming pool construction,” and “custom pool builder” are not all selling the same thing. Some install a fiberglass shell that arrives on a truck. Some sell a package shape. Houston Cool Pools designs and builds gunite: a steel cage, then a concrete shell sprayed on your lot, then tile, coping, deck, and an interior finish. The shape is whatever the drawing says, because there is no mold.",
  "Fiberglass is a legitimate product. It is also a different product. The shell is manufactured off-site, so the widths, depths, and steps are the ones the mold allows. Gunite is the method behind the custom pools people are usually picturing when they search for a pool builder in Houston: a beach entry on one side, a spa on the other, a sun shelf where the shade actually falls, a raised bond beam if the house sits above the yard. If a salesperson cannot explain which method they build, you do not have a proposal yet.",
  "The design visit is where most of the expensive mistakes are avoided. We look at where water already sits after a storm, where the afternoon sun lands, what you see from the kitchen and the primary bedroom, and whether a fence, a tree, or an easement cuts the usable yard. Equipment has to reach the hole. On a wide suburban lot that is simple. On a fenced inner-loop lot it can decide the shape before the finish does. Bring the survey if you have one, and the HOA architectural rules if the neighborhood has them. We would rather read the rule before we draw than redraw after a committee.",
  "A gunite build follows a sequence, and skipping a step is how pools fail later. Layout and excavation come first. The hole is cut larger than the finished water so the steel and the shell have room. Rebar is tied to the engineered spacing. Plumbing is stubbed and pressure-tested while it can still be seen. Gunite is then sprayed so the steel sits inside the shell, not against one face of it. The shell cures before tile, coping, and deck go on. The interior finish — plaster, quartz aggregate, or pebble — is a wear surface over that structure, not the structure itself. Startup is a separate appointment: the equipment is run, the chemistry is set, and someone walks you through the pump, filter, heater, and light. Video is fine. There is a lot of it.",
  "Greater Houston is not a gentle site. A lot of the metro sits on clay that shrinks when it dries and swells when it rains. The shell is built for that. The deck is not glued rigidly to the coping; a joint there is what keeps the first dry summer from telegraphing a crack across the walking surface. Drainage has to leave the bond beam and the equipment pad. A pool that holds storm water against the shell is a maintenance problem you will notice every June.",
  "Permits follow the address, not the marketing map. A house inside the City of Houston is not reviewed by the same desk as a house in unincorporated Harris County, and Montgomery, Fort Bend, Waller, Brazoria, Galveston, and Chambers counties each have their own path. We confirm the jurisdiction before drawings are submitted and we schedule the inspections that jurisdiction requires. You should not be the person standing in the yard wondering which inspector is coming.",
  "Schedule for a custom gunite pool is generally 8 to 16 weeks from the day we break ground to the first swim. Weather, inspection timing, and the number of features move that window. An attached spa, a vanishing edge, or a difficult access path adds time. A straight rectangle on an open lot does not. We give you the sequence before we dig, and the backyard should not go quiet without you knowing which trade is next.",
  ...PRICE_LINES,
  "Financing is available for qualified homeowners. A monthly payment is not a reason to skip the design conversation. The number only means something after the drawing shows the size, the depth, and the deck. Our office is at 21902 Highway 249, Houston, TX 77070. The phone on this website is (281) 938-4830.",
];

const REMODEL = [
  "A pool remodel is a stack of smaller jobs, and the useful question is which ones your pool actually needs. Dull plaster, stained waterline tile, cracked coping, a deck that burns your feet, and a single-speed pump that runs loud all afternoon are different problems. Doing all of them in one drain is often the right call. Doing them because a brochure listed them is not.",
  "Interior resurfacing is the job people feel first. The pool is drained, the old finish is chipped back, the shell is repaired where it needs it, and a new plaster, quartz-aggregate, or pebble finish goes on. Quartz and pebble hide chemistry stains better than plain white plaster and are what we spec when the owner wants the water to look good in year eight, not only in week two. Plumbing, skimmers, and the main drain are inspected while the pool is empty. You only want to drain it once.",
  "Waterline tile is the band everyone sees. Glass mosaic holds color and hides deposits better than a lot of older ceramic. Grout matters: a stain-resistant grout costs more and stays cleaner. If the plaster is also due, tile and resurfacing belong in the same visit. Coping — the stone or concrete edge you sit on — is replaced when it is cracked, loose, or so hot it is unusable in July. Travertine stays cooler under Houston sun than dark concrete. The deck beyond the coping is a drainage problem as much as a finish: water has to leave the pool, and the joint between deck and coping has to be able to move.",
  "Structural additions are construction, not a cosmetic remodel. A sun shelf, a beach entry, a spa spillover, or a raised bond beam means cutting the shell and tying new gunite and steel into the original. That work is permitted and inspected the way a new pool is. If someone offers to “add a spa” without talking about steel, plumbing isolation, and a permit, ask them to put the method in writing.",
  "Equipment is usually upgraded in the same window. A variable-speed pump replaces a single-speed motor that is responsible for most of a pool’s electric bill. A salt cell makes chlorine from dissolved salt; it does not make the pool chlorine-free. Heaters are sized to surface area. Undersized heaters short-cycle and never catch up on a cold night. Automation — the phone control for pump, heater, lights, and cleaner — is worth it when more than one piece of equipment is being replaced anyway.",
  "Remodel schedules are shorter than a new gunite build when the shell stays. A resurface is measured in days and curing, not in a 8-to-16-week construction sequence. The moment new gunite is involved, weather and inspections start to matter the way they do on a new pool. We will tell you which schedule you are on before the pool is drained.",
  ...PRICE_LINES,
  "The phone on this website is (281) 938-4830, and the office is at 21902 Highway 249 in northwest Houston. Bring photos of the plaster, the tile line, the equipment pad, and any crack you can see. Those four pictures tell us more than a guess at a price over the phone.",
  "Remodel searches — pool resurfacing, waterline tile, pool deck — often land on pages that promise a new look and never mention the shell. The shell is the structure. If it is sound, a finish upgrade is the right money. If it is hollow, cracked through, or moving with the soil, tile will not hold it together. We would rather walk away from a cosmetic bid than sell one over a shell that needs construction.",
];

const CARE = [
  "A pool is a body of water attached to a machine. Houston summer heat, humidity, pollen, and sudden thunderstorms push both harder than a mild climate does. The pools that stay swimmable are the ones with a run-time schedule, a filter that is actually cleaned, and chemistry that gets checked after rain — not only on a pretty Saturday.",
  "Chemistry means free chlorine, pH, total alkalinity, calcium hardness, and cyanuric acid. A storm dilutes the water and dumps organic load in it. That is when algae starts, usually in July and August along the Gulf Coast, not because the pool “went bad” in the abstract. Brushing the waterline and keeping the pump running long enough for the filter to turn the volume over matters as much as the chemical bottle.",
  "Filtration is the quiet half of maintenance. Cartridge, DE, and sand filters are sized to the pool. Pressure on the gauge creeping up means the filter is loading and needs cleaning or backwashing. A pump that sounds different than it did last month is telling you something before it fails on a holiday weekend. Heaters that short-cycle are often undersized for the surface area, or they are trying to heat a pool with the cover off and the wind up.",
  "Saltwater is still a chlorine pool. A cell on the return line turns dissolved salt into chlorine. Target salt is typically around 3,200 ppm. The cell does not add stabilizer, so cyanuric acid is dosed separately, and pH tends to drift up, which means muriatic acid replaces the old mixed routine. Cells wear out, often somewhere between three and seven years depending on run time and water balance. Some older heater cores and trim metals should be checked before a conversion so the new chemistry does not eat them.",
  "Variable-speed pumps are the upgrade that changes the electric bill. A single-speed pump runs at full speed whenever it is on. A variable-speed pump spends most of its hours slower, moving enough water to filter without the noise and the draw of full RPM. If the automation panel is being replaced at the same time, pump, heater, lights, and salt cell can live on one schedule instead of a row of timers.",
  "We are a builder that also helps owners with equipment, chemistry, and a maintenance plan that fits this climate. If the pool needs a weekly cleaner, say so and we will tell you what that pool actually needs. Urgent water — a green pool, a dead pump — should be marked that way on the form so it is not treated like a design consult.",
  "None of this replaces a new shell. If the plaster is rough, the tile is popping, or the deck has separated from the coping, the fix is a remodel, and it is priced from the pool you have. New-pool ranges published on this site ($65k–$90k through $150k and up) are for new gunite construction.",
  "Call (281) 938-4830 or use the service form. The office is at 21902 Highway 249, Houston, TX 77070.",
  "A useful service visit names the equipment you already have. Write down the pump model, the filter type, the heater brand, and whether a salt cell is installed before we arrive. Those four facts stop a conversation that otherwise starts from scratch. If the cell light is flashing or the pressure gauge sits in the red, photograph it. We can tell a dirty filter from a dying motor faster with that picture than with a paragraph of symptoms.",
  "Owners searching for pool cleaning or weekly pool service in Houston are often trying to stop a cycle: the water goes cloudy, someone shocks it, it clears, and two weeks later it is cloudy again. That cycle is usually runtime, stabilizer, or a filter that never gets cleaned. Shock is not a plan. The plan is a number for free chlorine you can test, a pH you correct on purpose, and a pump schedule that still runs after a storm even if nobody is swimming.",
];

const OUTDOOR = [
  "An outdoor kitchen or a fire feature is worth building with the pool when the trenches are already open. Gas, water, and electrical are cheapest before the deck is poured. Adding them two years later means cutting finished stone to bury a line you could have stubbed during construction.",
  "A kitchen on a Houston deck is a weather project. Standard indoor cabinets fall apart in this humidity and this sun. The boxes need to be masonry, stainless, or another material actually rated to live outside. Counters need to handle UV and heat; granite, quartzite, and dense concrete do. The layout has to work as a kitchen — grill, a place to set a tray, storage, and usually a sink or a cooler — and it has to face the pool so people are not walking a plate across the yard.",
  "Fire features earn their place from October through March, which in Houston is a long stretch of evenings when the pool is still in view and the air is finally cool enough to want a flame. Gas starts cleaner and smokes less than wood. The pit or bowl has to sit at seating distance from the water without catching overspray, and the prevailing breeze decides where the smoke goes. A fire-and-water bowl that is part of the pool shell shares the gas run and the inspection with the rest of the build.",
  "Pergolas and pavilions change the electrical plan. Fans, lights, and heaters ride overhead, and that load should be in the same permit conversation as the pool equipment. We coordinate those trades so the kitchen is not waiting on a gas line that nobody scheduled.",
  ...PRICE_LINES.slice(0, 2),
  "If the kitchen or the fire feature is the only project — the pool is already there — we still need to see the deck, the equipment pad, and where gas can enter. Photos help. The office number is (281) 938-4830, at 21902 Highway 249, Houston, TX 77070.",
  "Gas work is permitted with the rest of the utilities. A line that was “just added by a handyman” is not a starting point we will extend. We want a shutoff you can reach without moving a grill, and we want the line sized for the appliances you actually bought, not for a future outdoor fridge nobody selected. If the kitchen includes a sink, the drain has to go somewhere legal. Tying it into a pool backwash line is not that place.",
  "Houston heat is the other design problem. A kitchen with no shade is a kitchen you will not stand at from June through September. The pergola or pavilion is not decoration on top of a finished grill. It changes footing locations, electrical load, and where rain falls onto the deck. Draw it with the grill. A fire feature under a low cover also needs clearance. We will not put a flame where the manufacturer’s clearance does not fit, even if the rendering looked tighter.",
  "People comparing outdoor kitchen builders and fire pit contractors in Houston are usually comparing who owns the coordination. The mason, the gas fitter, the electrician, and the pool deck crew can each be competent and still leave you with a counter that does not meet the coping. One schedule is the product. Ask who calls the inspection and who is on site when the deck is poured over the conduit. If the answer is “the other guy,” keep asking.",
  "Budget the outdoor work as its own line, not as a rounding error on the pool. A grill island with a real counter, a sink, and shade is a construction project. A fire bowl tied into the bond beam is a construction project. Both can share the pool’s crew and still deserve their own scope, their own gas load, and their own place on the calendar.",
];

const SERVICE_EXTRA: Record<string, string[]> = {
  "custom-pool-builder": [
    "A custom pool builder starts from the lot. There is no shape book. The first drawing is a response to your yard, the way you entertain, and the budget range you actually want to be in. Cocktail depth, a lap lane, a spa, and a full family pool are different drawings, and pretending they are trim levels of one product is how people end up with a pool they do not use.",
    "Homeowners searching “pool builders houston,” “pool contractors,” and “custom pools houston” are usually comparing process. Ask who employs the crew that ties steel and who sprays gunite. Ask when you will see a site plan. Ask which city or county pulls the permit for your address. A polished gallery does not answer those questions. The proposal should.",
    "We have been building gunite pools across this metro since 1996. The office is on Highway 249 in northwest Houston, and the same sequence is used in the suburbs and inside the loop. The yard changes. The standard does not.",
  ],
  "pool-design-construction": [
    "Design is the part of swimming pool construction that decides the next twenty years. Elevations, equipment location relative to the wind, deck drainage, and how the water sits against the house are settled on paper. Changing them after gunite is demolition.",
    "A coordinated schedule is the other half. Excavation, steel, plumbing, gunite, tile, deck, finish, and startup are different crews. If nobody owns the handoff, the yard sits. We publish the construction sequence so you can see what “week four” is supposed to look like, and we keep the inspection dates on that same calendar.",
    "If you are comparing “houston pool construction” companies, compare the drawing you will approve and the inspection list, not the adjective in the ad. The drawing is the contract with your future backyard.",
  ],
  "pool-remodeling": [
    "Most remodeling calls start with a pool that still holds water and no longer looks like the one in the closing photos. That is a finish-and-equipment problem until someone finds a structural crack, a hollow shell, or a deck that has walked away from the coping. We will tell you which of those you have before we talk about tile color.",
    "You can stage a remodel. Resurface and tile this season, deck the next, if the joint at the coping is still sound. You should not stage it in a way that drains the pool twice. One empty pool, one set of repairs, one refill.",
    "Search phrases like “pool renovation” and “pool resurfacing” get mixed together. Resurfacing is the interior. Renovation can include the deck, the spa, and the equipment. The proposal should name the layers.",
  ],
  "pool-service-maintenance": [
    "Service in this climate is a cadence, not a one-time green-pool rescue. After you know the run time, the filter type, and who checks chlorine after a storm, the pool gets boring. Boring is the goal.",
    "If you are comparing weekly pool service, ask what is included when the phosphate load spikes in August and what happens when the pump trips. A route that only skims is not a maintenance plan.",
    "We would rather set the equipment and the chemistry up so the pool is understandable than leave you with a closet of chemicals and no order of operations. The Pool Owner School videos on this site cover testing, filters, and shutdown. They are for owners, not for swim lessons.",
  ],
  "gunite-pool-builder": [
    "Gunite is a dry mix of cement and sand, hydrated at the nozzle and shot at high velocity into the steel. Thickness at the floor, the cove, and over the rebar is the part you cannot see once the pool is full, and it is the part that decides whether the shell is still quiet in year fifteen.",
    "Because the shell is sprayed on site, the outline can change with the excavation in a way a fiberglass mold cannot. That freedom is not an invitation to improvise. The steel drawing still governs. Field changes get marked, not guessed.",
    "If a bid says “concrete pool” and cannot tell you gunite versus cast or shotcrete, ask for the spec. The word concrete covers several methods. You want the one that is written down.",
  ],
  "luxury-pool-builder": [
    "A luxury pool is a coordination problem. The coping profile, the grout color, the overflow slot, and the sightline from the living room all have to be chosen while they can still change. Premium materials do not fix a pool that faces the wrong direction.",
    "Details that show up on higher-budget projects: a vanishing edge aimed at a real view, a raised spa with a spill, glass tile, perimeter overflow, and automation that runs the pump and the lights from a phone. Deck stone has to meet the landscape plan. If the landscape architect is separate, they need the same drainage drawing we do.",
    "The published $150k-and-up range is where a lot of this work lands. It is still a range. A compact pool with glass tile and a difficult lot can land there, and a large simple rectangle might not. The drawing decides.",
  ],
  "small-yard-pool-builder": [
    "A small yard can hold a pool. It usually should not hold a resort footprint. Cocktail and plunge pools, four to five feet of depth, a sun shelf instead of a diving bowl, and a deck that still leaves a path around the water are the designs that get used on narrow lots.",
    "Access is the design constraint people underestimate. If the gunite hose and the excavation equipment cannot reach the hole without removing a fence panel, that work is part of the schedule and the price. Inner-loop lots in the Heights, Montrose, and West University live or die on this.",
    "Spend the money you saved on length on the finish. A small pool is seen up close. Better tile and a cooler deck will matter more than an extra two feet of water nobody swims.",
  ],
  "infinity-pool-builder": [
    "An infinity edge is a level, a catch basin, and a pump — not a filter on a photo. The weir has to hold elevation within a fraction of an inch or the sheet breaks into a dribble on one side. The basin below has to hold the water that spills when the recirculation pumps stop, plus the displacement of people in the pool.",
    "The edge only earns its cost if it faces something: a drop, a tree line, a fairway, a long view. A vanishing edge aimed at a neighbor’s fence is an expensive plumbing loop. We will say that on the site visit.",
    "Automation should run the spillover with the rest of the pool. A separate switch that guests do not understand will be left off, and then the edge is just a wall.",
  ],
  "lap-pool-builder": [
    "A lap pool is a length. Forty to seventy-five feet is the usual conversation, wide enough for one or two lanes, often a consistent four to five feet deep so the stroke does not change mid-lap. The tile at the ends matters because swimmers see it and push off it.",
    "Where the lot is long and narrow, the pool sits on that long axis, sometimes closer to a side setback than a play pool would. Where the lot is short, a current system can give you the workout in a shorter vessel. It is a different piece of equipment, and it should be sized, not added as an accessory.",
    "Heating follows surface area. A long skinny pool can lose heat faster than its volume suggests. The heater conversation happens with the drawing, not after the first cold front.",
  ],
  "plunge-pool-builder": [
    "A plunge pool is small and deep enough to get under the water. Footprints often start around 8 by 14 up to about 10 by 20, with depth commonly in the 4.5 to 6 foot range. It is for cooling off and sitting, not for laps.",
    "Smaller volume turns over faster, so the equipment set is simpler than a full family pool, but it is not optional. A heater or a chiller is what makes a plunge useful outside the hottest months. Houston’s winters are mild enough that a heated plunge gets used; an unheated one often does not.",
    "Courtyards, side yards, and tight urban lots are the normal sites. The gunite sequence is the same as a larger pool. The schedule is shorter because there is less of it.",
  ],
  "geometric-pool-builder": [
    "Geometric pools are rectangles, L-shapes, and other squared outlines. They read as part of the house. The layout has to be square, the coping has to stay straight at eye level, and the tile has to meet cleanly at the corners. Sloppy geometry looks worse than a freeform curve, because the eye knows where the line was supposed to be.",
    "Spas on these pools are usually squared to match. Water features tend to be sheer descents and slots, not boulder piles. Deck joints are drawn, not improvised, so the grid of the paving lines up with the coping.",
    "Modern and traditional houses both take this shape. The difference is the material, not the outline. A rectangle in limestone coping and a rectangle in dark tile are not the same pool.",
  ],
  "freeform-pool-builder": [
    "Freeform work starts from the trees, the drainage, and where the yard actually opens. The outline curves because the site curves. Coves, a beach entry, and a sun shelf are how you make an organic shape useful instead of merely soft.",
    "Rock, flagstone, and grottos belong here when the landscape calls for them. They look pasted on against a modern box house. Coping in natural stone and a deck that can meet an irregular edge are part of the same decision as the outline.",
    "Excavation on a freeform pool can absorb small field adjustments. A geometric pool cannot. That is a reason to pick the style on purpose, not a reason to skip the drawing.",
  ],
  "pool-and-spa-builder": [
    "An attached gunite spa is its own body of water tied into the pool structure. That is what lets it hold around 102°F while the pool stays in the 80s, and what lets a spillover run back into the pool as a water feature. A portable tub sitting on the deck is a different object with a different leak path.",
    "Jets, the blower, and the heater are sized to the spa’s volume. Undersize them and you have a lukewarm bath with weak jets. Raised spas give you the spill and the view. Flush spas read quieter from the house. Both are real gunite, permitted with the pool.",
    "If the spa is a remodel on an existing pool, the shell is cut and new steel is tied in. That is not a weekend finish upgrade.",
  ],
  "pool-resurfacing": [
    "Plaster is a wear surface. Ten to fifteen years is a common life before it is dull, stained, or rough underfoot. Resurfacing chips that finish off and replaces it. It does not, by itself, fix a deck that has failed or a beam that has moved.",
    "While the pool is empty we look at fittings, the main drain, and any hollow spots. Repairs happen then. The new finish — white plaster, quartz aggregate, or pebble — is applied, cured, and the pool is filled and balanced. Pebble and quartz cost more than basic plaster and hide imperfect chemistry better.",
    "Ask what warranty the finish carries and what maintenance keeps it. A warranty that assumes perfect water chemistry is a warranty you should read.",
  ],
  "pool-tile-replacement": [
    "Waterline tile takes the splash, the minerals, and the sun. Replacing it changes the pool more than people expect, because it is the line your eye uses to judge whether the water is clean.",
    "The water is lowered or the pool is drained, old tile comes off the bond beam, and new tile is set in a thinset and grout meant to live underwater. Glass, porcelain, and stone are all normal specs. If resurfacing is due within a couple of years, do the tile in the same drain.",
    "Step markers and depth markers are not decoration. If we are pulling tile, those get replaced to the current requirement, not copied from a faded 1998 install.",
  ],
  "pool-deck-installation": [
    "The deck is the largest surface in the backyard and the one you stand on. It has to slope water away from the pool, stay walkable in July, and move a little when the soil does. A rigid connection to the coping is the usual failure.",
    "Travertine is popular here because it stays cooler than standard concrete. Pavers and natural stone are the right call when the architecture wants them. Stamped concrete can be honest and durable when the joints and the slope are detailed. Dark colors in full sun are a mistake you will feel with bare feet.",
    "If the pool is being resurfaced, look at the deck joint before you pick a stone. A beautiful deck on a failed edge does not last the season.",
  ],
  "pool-equipment-installation": [
    "The equipment pad is the pool. Pump, filter, heater, sanitizer, and the control panel decide whether the water stays clear and what the electric bill does. Upgrades are matched to volume and surface area, not to whatever unit is on sale.",
    "Variable-speed pumps, correctly sized filters, and a heater rated for the square footage of water are the core. Salt cells and automation are the layer that removes daily chores. Brand names we install and service include the major platforms homeowners already have — the point is the sizing and the plumbing, not the logo.",
    "Replace the pad equipment when you are resurfacing if the motors are loud, the filter is undersized, or the timer is a dial nobody understands. Opening the pad twice costs more than doing it while the yard is already disrupted.",
  ],
  "saltwater-pool-conversion": [
    "Converting to salt means adding pool-grade salt to about 3,200 ppm, cutting in a cell on the return plumbing, and powering that cell from the pump’s schedule or the automation panel. The cell produces chlorine. You still test the water.",
    "Stabilizer is added because the cell does not provide it. pH runs upward, so acid becomes the routine adjustment. The cell is a replaceable part, not a forever appliance.",
    "Before we convert, we look at the heater and any metal that will live in the water. A conversion that eats a heat exchanger is not a savings. If the plaster is already failing, fix the surface first or in the same project. Salt will not hide a rough finish.",
  ],
  "outdoor-kitchen-builder": [
    "The kitchen should be drawn with the pool even if it is built second. Stub the gas, the water, and the conduit under the deck. Future-you does not want to saw a trench through new travertine.",
    "Workflow beats appliance count. A grill you can stand at, a non-combustible counter beside it, and a cooler or a sink within a step will get used. A six-burner monument with no landing space will not. Shade — a pergola or a pavilion — is what makes the kitchen usable at 2 p.m. in August.",
    "Cabinets are outside equipment. If the material is not rated for weather, do not install it, regardless of the showroom photo.",
  ],
  "fire-feature-installation": [
    "Gas is the default because it starts cleanly and does not put smoke through a dinner. Wood is the right choice when someone specifically wants a fire, and the code path is different. We will say which one the yard can support.",
    "Place the flame where people sit, out of the splash, and downwind of the table if the breeze has a habit. A bowl that combines fire and a water scupper is built with the pool shell so the gas line is inspected with the other utilities.",
    "A fire feature added years later still needs a gas line and a shutoff someone can find. We will not hide that work behind a bush.",
  ],
};

const CATEGORY: Record<string, string[]> = {
  "custom-pool-builder": NEW_BUILD,
  "pool-design-construction": NEW_BUILD,
  "gunite-pool-builder": NEW_BUILD,
  "luxury-pool-builder": NEW_BUILD,
  "small-yard-pool-builder": NEW_BUILD,
  "infinity-pool-builder": NEW_BUILD,
  "lap-pool-builder": NEW_BUILD,
  "plunge-pool-builder": NEW_BUILD,
  "geometric-pool-builder": NEW_BUILD,
  "freeform-pool-builder": NEW_BUILD,
  "pool-and-spa-builder": NEW_BUILD,
  "pool-remodeling": REMODEL,
  "pool-resurfacing": REMODEL,
  "pool-tile-replacement": REMODEL,
  "pool-deck-installation": REMODEL,
  "pool-service-maintenance": CARE,
  "pool-equipment-installation": CARE,
  "saltwater-pool-conversion": CARE,
  equipment: CARE,
  "outdoor-kitchen-builder": OUTDOOR,
  "fire-feature-installation": OUTDOOR,
};

const CATEGORY_HEADING: Record<string, string> = {
  "custom-pool-builder": "How a custom gunite pool is actually built",
  "pool-design-construction": "How a custom gunite pool is actually built",
  "gunite-pool-builder": "How a custom gunite pool is actually built",
  "luxury-pool-builder": "How a custom gunite pool is actually built",
  "small-yard-pool-builder": "How a custom gunite pool is actually built",
  "infinity-pool-builder": "How a custom gunite pool is actually built",
  "lap-pool-builder": "How a custom gunite pool is actually built",
  "plunge-pool-builder": "How a custom gunite pool is actually built",
  "geometric-pool-builder": "How a custom gunite pool is actually built",
  "freeform-pool-builder": "How a custom gunite pool is actually built",
  "pool-and-spa-builder": "How a custom gunite pool is actually built",
  "pool-remodeling": "How a remodel is scoped so the pool is only drained once",
  "pool-resurfacing": "How a remodel is scoped so the pool is only drained once",
  "pool-tile-replacement": "How a remodel is scoped so the pool is only drained once",
  "pool-deck-installation": "How a remodel is scoped so the pool is only drained once",
  "pool-service-maintenance": "How Houston water, equipment, and chemistry actually behave",
  "pool-equipment-installation": "How Houston water, equipment, and chemistry actually behave",
  "saltwater-pool-conversion": "How Houston water, equipment, and chemistry actually behave",
  "outdoor-kitchen-builder": "How outdoor kitchens and fire features get built with the pool",
  "fire-feature-installation": "How outdoor kitchens and fire features get built with the pool",
};

function words(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function countSectionWords(sections: PseoSection[]): number {
  return sections.reduce(
    (sum, section) =>
      sum + words(section.heading) + section.paragraphs.reduce((n, p) => n + words(p), 0),
    0,
  );
}

export function buildPseoArticle(
  service: PseoService,
  location: PseoLocation,
): PseoSection[] {
  const place = PLACE_NOTES[location.slug];
  if (!place) {
    throw new Error(`Missing place notes for ${location.slug}`);
  }
  const extra = SERVICE_EXTRA[service.slug];
  const category = CATEGORY[service.slug];
  if (!extra || !category) {
    throw new Error(`Missing article for ${service.slug}`);
  }

  const opening = `${service.intro} In ${location.cityName}, that work is ${service.intentPhrase} for a specific yard in ${location.county}, not a city name pasted onto a stock plan. ${location.descriptor}`;

  return [
    {
      heading: `${service.name} in ${location.cityName}, TX`,
      paragraphs: [opening, service.deepDive],
    },
    {
      heading: `What ${service.shortName.toLowerCase()} means on this project`,
      paragraphs: extra,
    },
    {
      heading: CATEGORY_HEADING[service.slug],
      paragraphs: category,
    },
    {
      heading: `What changes the work in ${location.cityName}`,
      paragraphs: [
        `${location.cityName} (${location.landmarkNote ?? location.county}) is one of the places we build. The notes below are the site conditions that change ${service.intentPhrase} here. They are not a slogan with the city swapped in.`,
        ...place,
      ],
    },
  ];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function buildPseoFaqs(
  service: PseoService,
  location: PseoLocation,
  keywords: KeywordLike[],
): PseoFaq[] {
  const costQuery = keywords.find((q) => /cost|price|financ|afford/i.test(q.query));
  const faqs: PseoFaq[] = [
    {
      q: costQuery
        ? `${capitalize(costQuery.query)}${costQuery.query.endsWith("?") ? "" : "?"}`
        : `How much does a custom pool cost in ${location.cityName}, TX?`,
      a: `New gunite pools we publish sit in ranges: $65k–$90k, $90k–$115k, $115k–$150k, and $150k and up. Size, an attached spa, deck material, interior finish, and how difficult the yard is to access are what move a project between those ranges. A ${service.shortName.toLowerCase()} project in ${location.cityName} is priced from the drawing, not from a citywide average. Remodels and equipment work are quoted from the pool you already have. Financing is available for qualified homeowners.`,
    },
    {
      q: `How long does a ${service.shortName.toLowerCase()} project take in ${location.cityName}?`,
      a: `A new custom gunite pool generally runs 8 to 16 weeks from groundbreaking to the first swim. Weather, inspections, and extra features move that. A straight resurface is much shorter. Anything that cuts the shell and adds gunite — a spa, a sun shelf, a beach entry — goes back on a construction schedule. We name the schedule before work starts in ${location.cityName}.`,
    },
  ];

  if (
    service.slug === "pool-remodeling" ||
    service.slug === "pool-resurfacing" ||
    service.slug === "pool-tile-replacement" ||
    service.slug === "pool-deck-installation"
  ) {
    faqs.push({
      q: `What is included when you remodel a pool in ${location.cityName}?`,
      a: `Whatever the pool needs, named in layers: interior finish, waterline tile, coping, deck, equipment, and structural additions only if the shell is being cut. The point of scoping it together is to drain the pool once. We will not add a structural change and call it a cleaning.`,
    });
  } else if (
    service.slug === "pool-service-maintenance" ||
    service.slug === "pool-equipment-installation" ||
    service.slug === "saltwater-pool-conversion"
  ) {
    faqs.push({
      q: `Do you take care of pools in ${location.cityName}, or only build them?`,
      a: `We build them, and we help owners with equipment, salt conversions, and a chemistry plan that fits Gulf Coast heat, pollen, and rain. If you need a weekly route, tell us on the form and we will say what that pool needs. Green water or a dead pump should be marked urgent.`,
    });
  } else if (service.slug === "outdoor-kitchen-builder" || service.slug === "fire-feature-installation") {
    faqs.push({
      q: `Should the outdoor kitchen or fire feature be built with the pool?`,
      a: `Yes, if you already know you want it. Gas, water, and conduit belong under the deck before the stone goes down. We can add them later, and it will cost more because finished deck has to be opened.`,
    });
  } else {
    faqs.push({
      q: `Do you build from a catalog in ${location.cityName}?`,
      a: `No. ${location.cityName} projects are drawn for the yard in front of us. Gunite is sprayed on site, so the shape is not limited to a fiberglass mold. You approve a plan before we excavate.`,
    });
  }

  faqs.push({
    q: `Do you work in ${location.cityName}, ${location.county}?`,
    a: `Yes. Houston Cool Pools serves ${location.cityName} from the office at 21902 Highway 249, Houston, TX 77070. Call (281) 938-4830 or send the quote form. We confirm whether your address is permitted by the city or the county before drawings are submitted. ${location.descriptor}`,
  });

  faqs.push({
    q: "What should I have ready for the first visit?",
    a: "A sense of how you want to use the water, any survey you already have, HOA architectural rules if they exist, and photos of the access path from the street to the backyard. If this is a remodel, add photos of the plaster, the tile line, the equipment pad, and any crack. We do not need a mood board to tell you whether the yard can hold the pool.",
  });

  return faqs;
}
