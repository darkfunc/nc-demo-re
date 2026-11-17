export function PrincipalSection() {
  return (
    <section
      id="principal"
      className="border-t border-border bg-secondary/60"
      aria-labelledby="principal-heading"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-border pb-6">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-maroon">
              04
            </span>
            <h2
              id="principal-heading"
              className="font-display text-3xl md:text-4xl font-semibold tracking-tight"
            >
              From the Principal
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Leadership Message
          </div>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <figure className="order-2 lg:order-1 lg:col-span-4">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-full w-full border border-maroon/40"
              />
              <img
                src="/principal.jpg"
                alt="Mr. Iran Champika de Silva, Principal of Nalanda College Colombo"
                loading="lazy"
                decoding="async"
                className="relative w-full aspect-3/4 object-cover bg-secondary"
              />
            </div>
            <figcaption className="mt-4 border-t border-border pt-4">
              <span className="block font-display text-lg font-semibold tracking-tight">
                Mr. Iran Champika de Silva
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Principal, Nalanda College Colombo
              </span>
            </figcaption>
          </figure>

          {/* Message */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <blockquote className="border-l-2 border-maroon pl-6 md:pl-8">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-[2rem] md:leading-[1.3]">
                At Nalanda, we believe true education goes beyond textbooks and
                examinations — every Nalandian is encouraged to grow with
                <span className="text-maroon"> confidence and purpose.</span>
              </p>
            </blockquote>

            <div className="mt-10 max-w-2xl space-y-5 text-[16px] leading-relaxed text-muted-foreground">
              <p>
                It gives me immense pleasure to welcome you to Nalanda College, Colombo, an
                institution that has stood at the forefront of Buddhist education in Sri Lanka
                for nearly a century.
              </p>
              <p>
                Our mission is to nurture well-rounded individuals who embody our motto,
                <em className="text-foreground font-medium"> Character Illumines Wisdom.</em>{" "}
                We remain committed to academic excellence while instilling compassion,
                integrity, and service — supported by dedicated teachers, strong traditions and
                a vibrant co-curricular life.
              </p>
              <p>
                As we continue our journey, we stay focused on producing noble sons who will
                contribute meaningfully to Sri Lanka and beyond.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
              <span className="h-px w-10 bg-maroon" aria-hidden="true" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Signed · The Principal&apos;s Office
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
