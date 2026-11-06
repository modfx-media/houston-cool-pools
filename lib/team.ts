export type TeamMember = {
  id: string;
  name: string;
  title: string;
  yearsExperience: string;
  portrait: string;
  /** True when no real headshot exists yet - UI shows a styled placeholder. */
  portraitPending?: boolean;
  /** Optional lifestyle / hobby photos (owner gallery). */
  photos?: { src: string; caption?: string; orientation?: "landscape" | "portrait" }[];
  /** Pull-quote used as a visual breaker. */
  quote: string;
  /** Long-form bio rendered as paragraph blocks. */
  bio: {
    heading: string;
    body: string;
    /** Optional per-chapter image override; falls back to `photos[i]` when omitted. */
    image?: { src: string; caption?: string; orientation?: "landscape" | "portrait" };
  }[];
  /** Quick-fact chips (owner hero). */
  facts?: { label: string; value: string }[];
  /** Outside-of-work hobbies / interests (owner only). */
  hobbies?: string[];
  /** "Dream pool" feature callout. */
  dreamPool: string;
  /** Favorite saying / motto. */
  favoriteSaying?: string;
  /** Optional fun fact. */
  funFact?: string;
  /** Optional link to a dedicated page about this member. */
  link?: { label: string; href: string };
};

export const MIKE_LOPEZ: TeamMember = {
  id: "mike-lopez",
  name: "Mike Lopez",
  title: "Owner",
  yearsExperience: "30+ years",
  portrait: "/images/team/mike-lopez.jpg",
  photos: [
    { src: "/images/team/mlp2.jpg", orientation: "landscape" },
    { src: "/images/team/mlp3.jpg", orientation: "landscape" },
    { src: "/images/team/mlp4.jpg", orientation: "portrait" },
    { src: "/images/team/mlp5.jpg", orientation: "landscape" },
    { src: "/images/team/mlp6.jpg", orientation: "landscape" },
  ],
  quote: "It is what it is. We just pivot and move forward.",
  bio: [
    {
      heading: "Why I love this work",
      body: "I love all things outdoor living. That I get to be a part of building amazing backyards for people to create memories and spend time with their family and friends is a true blessing. I love what I do and I love who I do it with. We have put together an amazing group of people who help design, build, maintain, and repair these beautiful pools. Our job is all about fun - designing fun, building fun, and having fun while doing it. And then, our customers get to have fun with their new pools.",
    },
    {
      heading: "A goal of mine",
      body: "I have a goal of visiting all 30 MLB ballparks before I turn 60. 13 down and 17 to go in 6 years!",
    },
  ],
  facts: [
    { label: "Years in pools", value: "30+" },
    { label: "MLB ballparks visited", value: "13 / 30" },
    { label: "Years building HCP", value: "30+" },
    { label: "Favorite saying", value: "It is what it is" },
  ],
  hobbies: [
    "Poolside grilling",
    "Time with the dogs",
    "Dove & duck hunting",
    "Bay & off-shore fishing",
    "Scuba diving",
    "Flying",
    "Hiking",
    "Baseball & football",
    "Traveling",
  ],
  dreamPool:
    "A lazy river. I love floating around with a cold drink in my hand.",
  favoriteSaying: "It is what it is",
};

export const MICHAEL_CHATELAIN: TeamMember = {
  id: "michael-chatelain",
  name: "Mike Chatelain",
  title: "Backyard Transformation Specialist",
  yearsExperience: "30+ years",
  portrait: "/images/team/michael-chatelain.jpg",
  quote:
    "I get to meet great people and help bring their vision to life. Watching an empty backyard become a place where memories will be made - that never gets old.",
  bio: [
    {
      heading: "Backyard transformation specialist",
      body: "With over 30 years in the pool industry, Mike brings a depth of knowledge that few can match. Having worked for only three companies during that time - and calling Houston Cool Pools home for the past 7 years - Mike is a trusted expert in turning blank canvases into stunning backyard escapes. His reputation as a problem solver, planner, and true \"knower of things\" makes him a go-to resource on the team for creative solutions and cool-headed insight.",
    },
    {
      heading: "Off the clock",
      body: "Mike's world outside of work is filled with family, travel, and service. He loves quality time with his wife, kids, and their famous Corgi. Together, he and his wife explore the globe, favoring beach destinations and bareboat chartering in places most tourists haven't seen. On solo days you'll catch him canoeing, lending a helping hand through service work, or embracing his signature silver-haired style - yes, his hair is naturally almost black, but he bleaches it to keep the \"timeless, distinguished\" look. It's not just a choice - it's a vibe.",
    },
  ],
  link: { label: "Meet The Pool Nerd", href: "/the-pool-nerd" },
  favoriteSaying: "Plan for the worst and hope for the best.",
  funFact:
    "His silver hair is dyed - naturally almost black - for that \"timeless, distinguished\" vibe.",
  dreamPool:
    "Already living the dream - in-floor cleaning, sun shelves, a natural rock waterfall, and a fire pit with built-in seating. \"It's the kind of backyard that feels like a vacation every day - and I wouldn't change a thing.\"",
};

export const SARAH_MOORE: TeamMember = {
  id: "sarah-moore",
  name: "Sarah Moore",
  title: "Pool Specialist & Equipment Repair Manager",
  yearsExperience: "8+ years",
  portrait: "/images/team/sarah-moore.png",
  quote:
    "I love that every day is different. Each problem and each customer brings a new challenge. There's always something to learn in this industry, and I love that.",
  bio: [
    {
      heading: "Equipment repair manager",
      body: "With over 8 years of hands-on experience in the pool industry, Sarah Moore is a powerhouse of knowledge, precision, and passion. Her journey started in retail management at Pinch-A-Penny, but she quickly dove into the deep end - transitioning from cleaning pools to mastering diagnostics, equipment installs, startups, and repairs. Today, Sarah leads the charge as our Equipment Repair Manager, overseeing the entire Service & Maintenance Department, guiding new customers through pool school, and keeping our service routes running smoothly. She's a go-to expert who can tackle just about any pool puzzle you throw her way.",
    },
    {
      heading: "When she's not poolside",
      body: "You'll find Sarah out on the trails or crossing finish lines - she's completed the Austin Marathon and six half-marathons. She's also a passionate DIYer and crafter, bringing creativity into everything she does. Hidden talent? She's a comic book lover and collector who's right at home at Comic-Con.",
    },
  ],
  favoriteSaying:
    "Keep your face always toward the sunshine, and shadows will fall behind you.",
  funFact:
    "Marathon finisher (Austin) plus six halves - and a Comic-Con-going comic book collector.",
  dreamPool:
    "Lighted bubblers and deck jets for that beautiful, glowing, resort-style vibe.",
};

export const BYRON_TIPPING: TeamMember = {
  id: "byron-tipping",
  name: "Byron Tipping",
  title: "Pool Consultant & Design Specialist",
  yearsExperience: "16 years",
  portrait: "",
  portraitPending: true,
  quote:
    "Each project is a chance to transform a space into a private oasis. It's deeply rewarding to be part of something that brings people so much joy.",
  bio: [
    {
      heading: "Creative mind, rhythm & design",
      body: "With 16 years of industry experience, Byron Tipping brings a unique blend of artistry, precision, and vision to every project he touches. As a Pool Consultant at Houston Cool Pools, Byron doesn't just design pools - he creates custom retreats that reflect each client's lifestyle and imagination. He thrives on the mix of creativity, technical skill, and customer collaboration. From the earliest sketch to the final water test, he loves watching a client's dream take shape - and seeing their joy when it becomes real. He keeps up with the latest design trends and cutting-edge tech, ensuring his pools are as forward-thinking as they are functional.",
    },
    {
      heading: "Beyond the backyard",
      body: "Byron's life outside of work is just as creative as his career. He enjoys time with his grandchildren, builds websites, studies animation, and occasionally still rocks out on the drums. Fun fact: he's a professional musician with 14 solo albums, appearances on over 100 other records, and even composed a movie score and 10 TV show themes. Now that's range.",
    },
  ],
  favoriteSaying:
    "You put wishes in one hand and the other thing in the other - and see which gets fullest the quickest. (A gem from his grandfather.)",
  funFact:
    "14 solo albums, 100+ guest appearances, a movie score, and 10 TV theme songs.",
  dreamPool:
    "Anything but cookie-cutter - non-standard shapes, inlay decking, bold geometry, and a water design that turns the backyard into a work of art.",
};

export const MIGUEL_SOSA: TeamMember = {
  id: "miguel-sosa",
  name: "Miguel Sosa",
  title: "Construction Manager & Supervisor",
  yearsExperience: "7 years",
  portrait: "/images/team/miguel-sosa.jpg",
  quote:
    "The dynamics of each day - and seeing the final product. There's nothing like stepping back and admiring what we've created.",
  bio: [
    {
      heading: "Builder of backyards",
      body: "Miguel Sosa is the kind of leader every construction site needs - experienced, focused, and driven by results. With 7 years in the pool industry, he's built a reputation at Houston Cool Pools for delivering high-quality work while managing complex projects with precision. From the first dig to the final walkthrough, Miguel keeps everything moving with confidence and care.",
    },
    {
      heading: "Life off the jobsite",
      body: "When he's not managing construction crews, Miguel finds purpose and joy in his Christian faith, his family, and the outdoors. Whether it's enjoying motorsports or spending time under the open sky, Miguel embraces life with passion and humility.",
    },
  ],
  favoriteSaying:
    "Sometimes the least common of all senses is common sense.",
  funFact:
    "Quietly humble - those who know him see a steady, servant's-heart kind of strength.",
  dreamPool:
    "A long lap lane, water jets, benches, and a tall, dramatic water feature - the perfect combo of functionality and flair.",
};

export const CASSIDI_HUBBARD: TeamMember = {
  id: "cassidi-hubbard",
  name: "Cassidi Hubbard",
  title: "Office Assistant",
  yearsExperience: "Joined HCP 2025",
  portrait: "/images/team/cassidi-hubbard.jpg",
  quote:
    "I enjoy routine, but not repetition. Every day is different, and getting to tackle unique pool-related problems makes the work rewarding.",
  bio: [
    {
      heading: "Problem solver, poolside bookworm",
      body: "Cassidi Hubbard may be one of the newest members of the Houston Cool Pools team, but she brings a refreshing mix of energy, curiosity, and customer-focused care to the office every day. After two years as an assistant manager at Leslie's Pools, she joined the Houston Cool Pools family in early 2025 - and hasn't looked back.",
    },
    {
      heading: "After hours",
      body: "When she's not keeping things running smoothly at the office, Cassidi is usually at home with her three dogs, enjoying music or reading by the pool. Her love of outdoor relaxation runs deep - and it's no wonder she dreams of a self-cleaning pool system (because who really wants to vacuum on their day off?).",
    },
  ],
  favoriteSaying: "It is never too late to learn.",
  funFact:
    "Spent the first 10 years of her life living in Venezuela - a global upbringing that shaped her curiosity and adaptability.",
  dreamPool:
    "A self-cleaning in-floor system, so she can spend more time reading by the pool than cleaning in it.",
};

export const JACOB_BRYANT: TeamMember = {
  id: "jacob-bryant",
  name: "Jacob Bryant",
  title: "Pool Designer & Salesman",
  yearsExperience: "5 years",
  portrait: "/images/team/jacob-bryant.jpg",
  quote:
    "I love being around pools and helping people turn their backyards into paradise. It's incredibly rewarding to be part of something that brings people happiness at home.",
  bio: [
    {
      heading: "Backyard vision crafter",
      body: "For the past five years, Jacob Bryant has been turning pool dreams into realities - and for four of those years, he's been doing it as part of the Houston Cool Pools team. Whether he's designing a resort-style retreat or helping a customer solve a tricky pool issue, Jacob brings creativity, empathy, and a practical mindset to every project.",
    },
    {
      heading: "Life outside the pool",
      body: "When Jacob clocks out, you'll likely find him at home hanging out with his three dogs - listening to classic rock or queuing up a favorite video game. He's also into biking, painting miniatures, and canoeing.",
    },
  ],
  favoriteSaying:
    "It is impossible for a man to learn what he thinks he already knows.",
  funFact:
    "Equally afraid of spiders and olives - no judgment, we all have our kryptonite.",
  dreamPool:
    "Automation. A smart system that controls everything - spa, lights, water features - because if it can be automated, it should be.",
};

/**
 * Full team roster, ordered roughly by tenure / leadership.
 */
export const TEAM: TeamMember[] = [
  MIKE_LOPEZ,
  MICHAEL_CHATELAIN,
  BYRON_TIPPING,
  SARAH_MOORE,
  MIGUEL_SOSA,
  JACOB_BRYANT,
  CASSIDI_HUBBARD,
];
