import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "/images/client-showroom/photo-0004.jpg",
    alt: "Backyard pool and covered patio at twilight",
  },
  {
    src: "/images/client-showroom/photo-0007.jpg",
    alt: "Pool with raised spa, waterfall, and fire pit seating area",
  },
  {
    src: "/images/client-showroom/photo-0008.jpg",
    alt: "Freeform pool and spa with covered cabana",
  },
  {
    src: "/images/client-showroom/photo-0009.jpg",
    alt: "Pool with tanning ledge in a landscaped backyard",
  },
  {
    src: "/images/client-showroom/photo-0010.jpg",
    alt: "Pool with natural stone waterfall feature",
  },
  {
    src: "/images/client-showroom/photo-0012.jpg",
    alt: "Raised spa with glass tile spilling into the pool",
  },
  {
    src: "/images/client-showroom/photo-0013.jpg",
    alt: "Pool steps finished with iridescent tile",
  },
  {
    src: "/images/client-showroom/photo-0018.jpg",
    alt: "Pool and raised spa with tile spillway",
  },
];

export function Gallery() {
  return (
    <section className="bg-white px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool-deep)]">
            Real Results
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            Houston backyards we keep looking like this
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            A clean, balanced pool is the result of consistent maintenance,
            not luck. These are pools currently on our service routes.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
