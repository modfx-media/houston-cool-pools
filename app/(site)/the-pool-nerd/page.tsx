import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Image from "next/image";
import { buildPageMetadata } from "../../../lib/business";
import { PoolNerdHeader } from "../components/pool-nerd/PoolNerdHeader";
import { Reveal } from "../components/pool-nerd/Reveal";

const PATH = "/the-pool-nerd";

const pageMetadata: Metadata = {
  ...buildPageMetadata(PATH),
  title: "The Pool Nerd — Mike Chatelain",
  description:
    "Meet Mike Chatelain, Houston Cool Pools designer. Thirty years of pool design, the backyards he is proudest of, customer reviews, and how to start a conversation about your yard.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, pageMetadata);
}

const PHONE = "832-818-1075";
const PHONE_HREF = "tel:8328181075";
const EMAIL = "mike@houstoncoolpools.com";

type Review = {
  name: string;
  meta: string;
  localGuide?: boolean;
  when: string;
  label?: string;
  title?: string;
  paragraphs: string[];
  initial: string;
  avatar: string;
};

const FAVORITE_REVIEWS: Review[] = [
  {
    name: "Justin Kirtley",
    meta: "6 reviews · 4 photos",
    when: "10 months ago",
    initial: "J",
    avatar: "#1a73e8",
    paragraphs: [
      "HCP did an incredible job on our pool! They are an incredible company to do business with. They had great reviews and had a fair price. The owner, Mike Lopez, was always accessible throughout the entire process. Our designer, Mike Chatelain, was able to make the vision we had and turn it into reality. Miguel Sosa did a great job as the project manager by always informing us as to which step was next and always kept us in the loop. Sarah Moore on the back end has been incredible with the pool start-up process and with answering all of our questions as a first time pool owner. I wouldn't hesitate to recommend them to anyone looking to go through the pool building journey. If you choose HCP as your pool builder, you won't regret it.",
    ],
  },
  {
    name: "Steve Jones",
    meta: "10 reviews · 8 photos",
    when: "11 months ago",
    label: "Reasonable price",
    initial: "S",
    avatar: "#188038",
    paragraphs: [
      "Mike and the whole team were wonderful to work with—professional, efficient, and attentive throughout the project. They made the process easy, and the finished pool looks beautiful. We're really happy with how everything turned out!",
    ],
  },
  {
    name: "Russ and Tina",
    meta: "2 reviews · 2 photos",
    when: "10 months ago",
    label: "Reasonable price",
    initial: "R",
    avatar: "#d93025",
    paragraphs: [
      "HCP is the BEST!! Everything was fantastic! From design (they really listened to what we wanted), from construction (communication was A++), post-construction (Sarah goes above & beyond!) and now during maintenance (Mike is thorough, respectful & reliable). Mike L., Mike C., Jake, Sarah, Mike D., THANK YOU all for being the most wonderful team! You are truly appreciated!",
    ],
  },
];

const EXPERIENCE_REVIEWS: Review[] = [
  {
    name: "Megan LeBleu",
    meta: "6 reviews · 12 photos",
    when: "3 years ago",
    initial: "M",
    avatar: "#c5221f",
    paragraphs: [
      "Absolute GREAT company to work with! From the consult and design process with the awesome Mike C. to project completion with Jake C.… and interactions with the owner Mike. L… we felt like family. They were thorough but quick and always ready to answer questions via email or phone… or a quick stop by the shop… we highly recommend Houston Cool Pools to anyone doing a pool project!",
      "Along with Houston Cool Pools we worked with their partner Pope Remodeling to build a covered patio, an outdoor kitchen area and a pergola. Again, thorough but speedy work. All the subcontractors were polite, talented and helpful. Bob's design expertise took the covered patio idea from one that would be separate from the house to one that looks like it was built with the house. Just beautiful.",
      "Just as a note: Our backyard prior to this project was just grass with a couple of trees… and one tiny strip of concrete just outside the door. What a transformation!",
    ],
  },
  {
    name: "joe lopez",
    meta: "16 reviews · 9 photos",
    localGuide: true,
    when: "3 years ago",
    initial: "J",
    avatar: "#e37400",
    paragraphs: [
      "Once we agreed on design Houston Cool Pools took over. They prepared and submitted the architectural design plan. They answered all inquires and kept the construction area clean. Their trades were very professional. No loud music. The end product is amazing. This is our fourth pool.. Second by Houston Cool Pools. Highly recommend. I will not ever use anyone else. I also use their weekly cleaning service. No issues on build or since completion.",
    ],
  },
  {
    name: "Kim Patchan",
    meta: "12 reviews",
    when: "11 months ago",
    label: "Great price",
    title: "Outstanding Experience with Houston Cool Pools!",
    initial: "K",
    avatar: "#9334e6",
    paragraphs: [
      "We couldn't be happier with our new pool! From the first consultation to the final walkthrough, the entire team at Houston Cool Pools was professional, responsive, and detail-oriented. They helped us design the perfect backyard oasis that fits our space and style perfectly.",
      "Communication was excellent throughout the process — we always knew what stage the project was in and what to expect next. The crew showed up on time, worked efficiently, and kept the area clean each day. The craftsmanship and finish quality are top-notch — you can tell they take real pride in their work.",
      "Now that it's complete, our pool looks absolutely stunning, and everything functions perfectly. Friends and family can't stop complimenting it! I highly recommend Houston Cool Pools to anyone looking for a reliable, creative, and high-quality pool builder in the Houston area.",
    ],
  },
];

const RELATIONSHIP_REVIEWS: Review[] = [
  {
    name: "Mark Stewart",
    meta: "10 reviews",
    when: "6 months ago",
    initial: "M",
    avatar: "#e37400",
    paragraphs: [
      "Houston Cool Pools did a fantastic job installing our pool a few years back and whenever I have since had a maintenance query they have been incredibly attentive and called to help or sent someone round if I couldn't trouble shoot it. Excellent after service care - thank you guys",
    ],
  },
  {
    name: "Andy Akers",
    meta: "50 reviews · 206 photos",
    localGuide: true,
    when: "6 years ago",
    initial: "A",
    avatar: "#1a73e8",
    paragraphs: [
      "My wife and I chose HCP from several suggestions from co-workers and personal interviews. This is our first pool and we wanted to get it right from a quality standpoint and value. Since we were new to this there were a few changes made along the way, but each time it was effortless. Mike C, Mike L, and of course Miguel and their teams of contractors made the vision come to life. We're very happy with the final product and have already spent countless hours enjoying and learning about our pool and will for many years to come.",
      "Thanks guys!",
    ],
  },
  {
    name: "Jeff Wheeler",
    meta: "10 reviews · 1 photo",
    when: "4 years ago",
    initial: "J",
    avatar: "#e37400",
    paragraphs: [
      "What a great experience. The process and final product exceeded our expectations. Mike C. did a great job on the design and captured exactly what we wanted. Everyone at HCP was very professional and easy to work with. They also completed everything ahead of schedule!",
    ],
  },
  {
    name: "Marie Liddell",
    meta: "9 reviews · 2 photos",
    when: "11 months ago",
    label: "Reasonable price",
    initial: "M",
    avatar: "#1a73e8",
    paragraphs: [
      "Houston Cool Pools did a fantastic job on our backyard pool and fire pit. Everyone was friendly and a pleasure to work with.",
      "Mike Chatelain was patient, understanding and helpful throughout the entire process. Sarah has been wonderful and responsive when there are any maintenance needs that arise. We highly recommend Houston Cool Pools.",
    ],
  },
];

const OWN_BACKYARD = [
  {
    n: "01",
    title: "In-floor cleaning",
    body: "Less cleaning, better circulation, and more time enjoying your pool. An engineered in-floor cleaning system works quietly behind the scenes to keep your pool cleaner with less effort, so you can spend more time swimming and less time maintaining it.",
  },
  {
    n: "02",
    title: "Sun shelves",
    body: "The perfect place to kick back, soak up the sun, and relax in the water without ever leaving the comfort of your pool.",
  },
  {
    n: "03",
    title: "A natural rock waterfall",
    body: "The soothing sound of cascading water, the natural beauty of stone, and a stunning focal point that transforms your backyard into your own private retreat.",
  },
  {
    n: "04",
    title: "A fire pit with built-in seating",
    body: "The perfect gathering spot to relax by the warmth of the fire, share stories, and enjoy great company long after the swimming is done.",
  },
];

const CHALLENGE_BLOCKS = [
  {
    label: "The Engineering",
    body: "One of the most complex aspects of this project was designing the drainage system. We needed to collect runoff from the pickleball court, route the drainage lines around the back of the swimming pool, incorporate the discharge from the sunken entertainment area's sump pump, and continue the drainage system around the opposite side of the property to the street. The real challenge was coordinating elevations, pipe routing, and drainage slopes to maintain positive flow throughout the gravity-fed portions of the system. It's the kind of engineering that homeowners rarely see, but that makes all the difference in how a backyard performs.",
  },
  {
    label: "The Design",
    body: "This project also pushed the boundaries of traditional swimming pool aesthetics. We incorporated glass tile, split-face stone, dark finishes, raised walls, and multiple water features into a cohesive design. With so many contrasting materials, the challenge was achieving the right balance of texture, color, and proportion without making the backyard feel overwhelming. Equally important was positioning the pool, spa, fire feature, and water features to create carefully planned sightlines from the main living areas across the back of the home. The backyard needed to look just as impressive from inside the house as it did when you were enjoying it outdoors.",
  },
  {
    label: "The Pool Nerd Touch",
    body: "A backyard this elaborate shouldn't require equally elaborate maintenance. That's why we incorporated an engineered in-floor cleaning system designed to circulate water and help remove debris from the pool's floor, steps, and other surfaces. The objective was simple: maximize the time spent enjoying the backyard while minimizing routine cleaning.",
  },
  {
    label: "The Result",
    body: "The Sumpter project demonstrates something I've believed throughout my career: Great pool design isn't just about creating something beautiful. It's about understanding how every component works together, solving the challenges homeowners may never see, and creating an outdoor environment that looks incredible and functions exactly as intended. That's where nearly 30 years of experience and a little Pool Nerd thinking really pay off.",
  },
];

function Stars() {
  return (
    <span className="inline-flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-[#fbbc04]" aria-hidden>
          <path d="M10 1.6 12.5 7l5.9.7-4.4 4 1.2 5.8L10 14.8 4.8 17.5l1.2-5.8L1.6 7.7 7.5 7 10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19.5C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.6 7.1l6.3 5.3C37.4 38.3 44 33 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

const CHALLENGE_COMPONENTS = [
  "Custom swimming pool",
  "Raised spa",
  "Sunken conversation area with a fire feature",
  "Multiple water features",
  "Full-size pickleball court",
];

function Photo({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[1.75rem] bg-[#dfe7ea] shadow-[0_30px_60px_-35px_rgba(0,27,36,0.55)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${light ? "text-[var(--color-gold-light)]" : "text-[var(--color-pool)]"}`}
    >
      <span className={`h-px w-10 ${light ? "bg-[var(--color-gold-light)]/60" : "bg-[var(--color-pool)]/50"}`} />
      {children}
    </p>
  );
}

function Heading({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-[family-name:var(--font-display)] text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.02em] md:text-6xl ${light ? "text-white" : "text-[var(--color-navy-deep)]"} ${className}`}
    >
      {children}
    </h2>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="mb-5 break-inside-avoid rounded-2xl border border-[#e3e6ea] bg-white p-6 shadow-[0_1px_2px_rgba(60,64,67,0.10),0_8px_24px_-16px_rgba(60,64,67,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(60,64,67,0.12),0_18px_36px_-18px_rgba(60,64,67,0.35)]">
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-medium text-white"
          style={{ backgroundColor: review.avatar }}
          aria-hidden
        >
          {review.initial}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[15px] font-medium leading-tight text-[#202124]">{review.name}</p>
            <GoogleMark />
          </div>
          <p className="mt-1 text-[12px] leading-snug text-[#5f6368]">
            {review.localGuide ? (
              <>
                <span>Local Guide</span>
                <span> · {review.meta}</span>
              </>
            ) : (
              review.meta
            )}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Stars />
        <span className="text-[12px] text-[#5f6368]">{review.when}</span>
      </div>
      {review.label ? (
        <p className="mt-2 text-[12px] font-medium text-[#5f6368]">{review.label}</p>
      ) : null}
      {review.title ? (
        <p className="mt-3 text-[15px] font-semibold text-[#202124]">{review.title}</p>
      ) : null}
      <div className="mt-3 space-y-3 text-[14px] leading-[1.7] text-[#3c4043]">
        {review.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function ReviewGroup({
  title,
  lede,
  children,
  reviews,
}: {
  title: string;
  lede: string;
  children?: React.ReactNode;
  reviews: Review[];
}) {
  return (
    <div className="grid gap-10 border-t border-[var(--color-navy-deep)]/10 py-16 first:border-t-0 first:pt-0 md:py-20 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
      <Reveal className="lg:sticky lg:top-36 lg:self-start">
        <Heading className="!text-4xl md:!text-5xl">{title}</Heading>
        <p className="mt-4 font-[family-name:var(--font-display)] text-xl italic leading-snug text-[var(--color-pool-deep)]">
          {lede}
        </p>
        {children}
      </Reveal>
      <div className="columns-1 gap-5 md:columns-2">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function PoolNerdPage() {
  return (
    <>
      <PoolNerdHeader phone={PHONE} phoneHref={PHONE_HREF} email={EMAIL} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] text-white">
        <Image
          src="/images/pool-nerd/favorite-lagoon-dusk.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-navy-deep)] via-[var(--color-navy-deep)]/90 to-[var(--color-navy-deep)]/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-navy-deep)] via-transparent to-[var(--color-navy-deep)]/60" />
        <div className="absolute -right-40 top-20 -z-10 h-[520px] w-[520px] rounded-full bg-[var(--color-pool)]/25 blur-[160px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pt-32 pb-20 md:px-10 md:pt-40 lg:grid-cols-[1.25fr_0.75fr] lg:pb-28">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
              Houston Cool Pools
            </p>
            <h1 className="font-[family-name:var(--font-display)] mt-8 font-semibold leading-[0.92] tracking-[-0.03em]">
              <span className="block text-5xl text-white/90 md:text-7xl">The Ultimate</span>
              <span className="mt-2 block bg-gradient-to-r from-[var(--color-gold-light)] via-white to-[var(--color-gold-light)] bg-clip-text pb-2 text-6xl italic text-transparent md:text-8xl lg:text-[7.5rem]">
                &ldquo;Pool Nerd&rdquo;
              </span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <p className="font-[family-name:var(--font-display)] text-2xl font-medium md:text-3xl">
                Mike Chatelain,
              </p>
              <p className="rounded-full bg-[var(--color-pool)]/20 px-4 py-1.5 text-sm font-medium text-[var(--color-gold-light)] ring-1 ring-[var(--color-gold-light)]/30">
                PhD (Pool Hole Designer)
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-pool)] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(0,124,182,0.9)] transition hover:-translate-y-0.5 hover:bg-[var(--color-pool-deep)]"
              >
                Call or text Mike: {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                {EMAIL}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[360px]">
            <div className="absolute -inset-3 rotate-[4deg] rounded-[2.25rem] border border-[var(--color-gold-light)]/30" />
            <div className="absolute -inset-3 -rotate-[3deg] rounded-[2.25rem] bg-[var(--color-pool)]/15" />
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
              <Image
                src="/images/pool-nerd/mike-and-simone.jpg"
                alt="Mike Chatelain with his wife, Simone"
                fill
                priority
                sizes="360px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex h-20 w-20 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-[var(--color-navy-deep)] shadow-xl">
                    <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current" aria-hidden>
                      <path d="M8 5.5v13l11-6.5-11-6.5z" />
                    </svg>
                  </span>
                </span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-light)]">
                  Video coming soon
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="border-t border-white/10 bg-white/[0.03] backdrop-blur">
          <dl className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-3 md:px-10">
            <div>
              <dt className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white">30+ years</dt>
              <dd className="mt-1 text-sm text-white/60">in the swimming pool industry</dd>
            </div>
            <div>
              <dt className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white">March 2020</dt>
              <dd className="mt-1 text-sm text-white/60">joined Houston Cool Pools</dd>
            </div>
            <div>
              <dt className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white">Ground up</dt>
              <dd className="mt-1 text-sm text-white/60">chemistry, design, construction and customer care</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <span className="font-[family-name:var(--font-display)] block text-8xl leading-none text-[var(--color-pool)]/25">
              &ldquo;
            </span>
            <p className="font-[family-name:var(--font-display)] -mt-6 text-3xl font-medium leading-[1.25] tracking-[-0.01em] text-[var(--color-navy-deep)] md:text-[2.6rem]">
              I&apos;m Mike Chatelain. I&apos;ve spent more than 30 years in the swimming pool
              industry, learning the business from the ground up: chemistry, design, construction
              and customer care.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 self-end border-l-2 border-[var(--color-pool)]/30 pl-8 text-lg leading-relaxed text-[#3d4c55]">
            <p>
              Along the way, I&apos;ve trained many pool designers and led a design and sales team. I
              joined Houston Cool Pools in March 2020 because its reputation mattered to me.
            </p>
            <p>
              I still love helping homeowners turn an idea into a backyard that fits their home,
              family and lifestyle. I care just as much about how the details come together when
              it&apos;s time to build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Life outside the design studio */}
      <section className="relative overflow-hidden bg-[#f6f3ee] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Heading>Life outside the design studio</Heading>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3d4c55]">
              Away from work, you&apos;ll find me with my wife, Simone, and our two dogs. We love
              bareboat cruising, traveling and time by the pool.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative pb-16 md:pb-10">
            <Photo
              src="/images/pool-nerd/bareboat-cruise.png"
              alt="Mike and Simone on a bareboat cruise, and with friends aboard a boat in a marina"
              sizes="(min-width: 1024px) 700px, 100vw"
              className="aspect-[1003/368]"
            />
            <div className="absolute -bottom-2 right-4 w-32 rotate-[5deg] rounded-[1.25rem] bg-white p-2 shadow-[0_25px_50px_-20px_rgba(0,27,36,0.5)] md:-bottom-8 md:right-10 md:w-44">
              <div className="relative aspect-[162/177] overflow-hidden rounded-[0.9rem]">
                <Image
                  src="/images/pool-nerd/mike-and-corgi.jpg"
                  alt="Mike Chatelain holding one of the family's Corgis"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>The portfolio</Eyebrow>
              <Heading className="mt-5">My favorite pools</Heading>
            </div>
            <p className="max-w-sm font-[family-name:var(--font-display)] text-xl italic leading-snug text-[var(--color-pool-deep)]">
              Different yards. Different personalities. A backyard should feel like yours.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-[300px_300px]">
            <Photo
              src="/images/pool-nerd/favorite-lagoon-dusk.jpg"
              alt="Dusk lagoon pool with fire bowls, a raised spa, and a hammock under a pavilion"
              sizes="(min-width: 768px) 66vw, 100vw"
              className="aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto"
            />
            <Photo
              src="/images/pool-nerd/favorite-curve.jpg"
              alt="Curved freeform pool"
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-[4/3] md:aspect-auto"
            />
            <Photo
              src="/images/pool-nerd/favorite-geometric.jpg"
              alt="Geometric pool with Moroccan tile, turf, and a covered lounge"
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-[4/3] md:aspect-auto"
            />
          </Reveal>
        </div>
      </section>

      {/* Dream / Design / Enjoy */}
      <section className="overflow-hidden bg-[var(--color-navy-deep)] py-14 md:py-20">
        <p className="font-[family-name:var(--font-display)] flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 text-center text-5xl font-semibold uppercase tracking-[0.06em] text-white md:gap-x-8 md:text-6xl lg:text-7xl">
          <span>Dream</span>
          <span className="text-[var(--color-pool)]">/</span>
          <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.75)]">Design</span>
          <span className="text-[var(--color-pool)]">/</span>
          <span className="text-[var(--color-gold-light)]">Enjoy</span>
        </p>
      </section>

      {/* More backyard inspiration */}
      <section className="bg-[#f4f7f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-2xl">
            <Heading>More backyard inspiration</Heading>
            <p className="mt-5 font-[family-name:var(--font-display)] text-xl italic text-[var(--color-pool-deep)]">
              Room to relax, gather and enjoy the water.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 grid gap-4 md:grid-cols-[1.6fr_1fr] md:grid-rows-[270px_270px]">
            <Photo
              src="/images/pool-nerd/inspiration-wide.jpg"
              alt="Dark geometric pool with bubblers, a sun shelf, and a tanning ledge"
              sizes="(min-width: 768px) 62vw, 100vw"
              className="aspect-[16/10] md:row-span-2 md:aspect-auto"
            />
            <Photo
              src="/images/pool-nerd/inspiration-spa.jpg"
              alt="Freeform pool with a raised spa, stone walls, and a broad patio"
              sizes="(min-width: 768px) 38vw, 100vw"
              className="aspect-[4/3] md:aspect-auto"
            />
            <Photo
              src="/images/pool-nerd/inspiration-loungers.jpg"
              alt="Geometric pool and raised spa with sheer descents and blue loungers"
              sizes="(min-width: 768px) 38vw, 100vw"
              className="aspect-[4/3] md:aspect-auto"
            />
          </Reveal>
        </div>
      </section>

      {/* The whole backyard */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Heading>The whole backyard</Heading>
            <p className="mt-5 font-[family-name:var(--font-display)] text-xl italic text-[var(--color-pool-deep)]">
              The best designs bring the pool and outdoor living together.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-6">
            <Reveal className="md:col-span-7">
              <Photo
                src="/images/pool-nerd/whole-yard-pool.jpg"
                alt="Rectangular pool with a sun shelf, in-water loungers, and a raised stone spa"
                sizes="(min-width: 768px) 58vw, 100vw"
                className="aspect-[16/10]"
              />
            </Reveal>
            <Reveal delay={0.12} className="md:col-span-5 md:mt-28">
              <Photo
                src="/images/pool-nerd/whole-yard-living.jpg"
                alt="Outdoor kitchen, fireplace, and dining area beside the pool"
                sizes="(min-width: 768px) 42vw, 100vw"
                className="aspect-[16/10]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#f8f9fa] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ReviewGroup
            title="The best part of the job?"
            lede="Hearing that the backyard feels like home."
            reviews={FAVORITE_REVIEWS}
          >
            <p className="mt-6 text-base leading-relaxed text-[#3d4c55]">
              Houston Cool Pools&apos; reputation helped draw me here. I encourage you to talk with
              customers we&apos;ve built pools for and hear about their experience firsthand. Here
              are a few of my favorite reviews.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#e3e6ea] bg-white px-5 py-3 shadow-sm">
              <GoogleMark />
              <span className="text-sm font-medium text-[#202124]">Google reviews</span>
              <Stars />
            </div>
          </ReviewGroup>
          <ReviewGroup
            title="The experience matters"
            lede="From the first design conversation to the finished backyard."
            reviews={EXPERIENCE_REVIEWS}
          />
          <ReviewGroup
            title="Relationships that last"
            lede="Design, construction and care after the pool is finished."
            reviews={RELATIONSHIP_REVIEWS}
          />
        </div>
      </section>

      {/* Toughest design challenge */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-28">
        <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[var(--color-pool)]/20 blur-[160px]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-3xl">
            <Heading light>My toughest design challenge</Heading>
            <p className="mt-5 font-[family-name:var(--font-display)] text-xl italic text-[var(--color-gold-light)]">
              A beautiful pool also needs to fit the yard and work in real life.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-12">
            <Photo
              src="/images/pool-nerd/sumpter.jpg"
              alt="The Sumpter project: geometric pool, raised spa, sheer descents, and lounge seating"
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="aspect-[16/9] ring-1 ring-white/10"
            />
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
                The challenge
              </h3>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-white/75">
                <p>
                  The goal was to transform an ordinary backyard into a complete outdoor
                  entertainment destination featuring a custom swimming pool, raised spa, sunken
                  conversation area with a fire feature, multiple water features, and a full-size
                  pickleball court.
                </p>
                <p>
                  The challenge wasn&apos;t simply fitting everything into the backyard. It was
                  making every component work together, both visually and mechanically.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="divide-y divide-white/10 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-2 backdrop-blur">
                {CHALLENGE_COMPONENTS.map((item) => (
                  <li key={item} className="flex items-center gap-4 px-5 py-4 text-white/90">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-pool)]/25 text-[var(--color-gold-light)]">
                      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                        <path d="M7.7 13.6 4.4 10.3l-1.2 1.2 4.5 4.5 9.1-9.1-1.2-1.2z" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {CHALLENGE_BLOCKS.slice(0, 3).map((block, i) => (
              <Reveal
                key={block.label}
                delay={i * 0.08}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition hover:border-[var(--color-gold-light)]/40"
              >
                <p className="text-xs font-semibold tracking-[0.3em] text-[var(--color-gold-light)]">
                  {`0${i + 1}`}
                </p>
                <h3 className="font-[family-name:var(--font-display)] mt-4 text-2xl font-semibold text-white">
                  {block.label}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-white/70">{block.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-5 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-white/70">04</p>
                <h3 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold text-white">
                  {CHALLENGE_BLOCKS[3].label}
                </h3>
              </div>
              <p className="font-[family-name:var(--font-display)] text-xl leading-relaxed text-white md:text-2xl">
                {CHALLENGE_BLOCKS[3].body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What I'd put in my own backyard */}
      <section className="bg-[#f6f3ee] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-36 lg:self-start">
            <Heading>What I&apos;d put in my own backyard</Heading>
          </Reveal>
          <ol>
            {OWN_BACKYARD.map((item, i) => (
              <Reveal
                key={item.n}
                as="li"
                delay={i * 0.06}
                className="group grid grid-cols-[auto_1fr] gap-6 border-t border-[var(--color-navy-deep)]/15 py-8 md:gap-10 md:py-10"
              >
                  <span className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_var(--color-pool)] group-hover:text-[var(--color-pool)] md:text-6xl">
                    {item.n}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy-deep)] md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#3d4c55] md:text-lg">
                      {item.body}
                    </p>
                  </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f6f3ee] px-4 pb-20 md:px-8 md:pb-28">
        <Reveal className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-[var(--color-navy-deep)] px-7 py-16 text-center text-white md:px-16 md:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.55),transparent_65%)]" />
          <div className="absolute -bottom-40 left-1/2 -z-10 h-80 w-[700px] -translate-x-1/2 rounded-full bg-[var(--color-gold-light)]/20 blur-[120px]" />
          <Eyebrow light>Let&apos;s talk about your backyard</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Have an idea? I&apos;d love to hear it.
          </h2>
          <p className="mt-5 text-lg text-white/70">No need to have every detail figured out.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[var(--color-navy-deep)] shadow-[0_18px_40px_-14px_rgba(79,195,224,0.8)] transition hover:-translate-y-0.5"
            >
              Call or text Mike: {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              {EMAIL}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
