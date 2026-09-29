"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const PHOTOS = [
  "/images/gallery/featured-grand-pool-spa.jpg",
  "/images/gallery/featured-luxury-spa.jpg",
  "/images/gallery/featured-evening-pool.jpg",
  "/images/gallery/featured-modern-geometric.jpg",
  "/images/gallery/featured-spa-overflow.jpg",
  "/images/gallery/featured-grand-vista.jpg",
];

export function GalleryPreview() {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Recent Work
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[var(--color-navy-deep)] md:text-4xl lg:text-5xl">
            Pool Gallery
          </h2>
          <div className="mt-4 h-px w-16 bg-[var(--color-gold)]" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PHOTOS.map((src, i) => (
            <motion.div
              key={src}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
              }}
              className="group relative aspect-[4/3] overflow-hidden bg-neutral-200"
            >
              <Image
                src={src}
                alt={`Houston Cool Pools project ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                  Custom Gunite Pool
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center bg-[var(--color-navy-deep)] px-10 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-[var(--color-navy)]"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
