const items = [
  "Small Batch Grinding",
  "No Artificial Colors",
  "Aroma Locked Packaging",
  "Farm-Sourced Ingredients",
  "Restaurant Grade Quality",
  "PAN India Delivery",
];

export function SpiceMarquee() {
  return (
    <section className="border-y border-border/70 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <div className="relative">
        <div className="animate-marquee whitespace-nowrap py-3">
          {[...items, ...items].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-6 inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-amber-200"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
