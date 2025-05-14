interface Step {
  num: number
  title: string
  blurb: string
  color: string
}

interface SixStepsGridProps {
  steps: Step[]
}

export default function SixStepsGrid({ steps }: SixStepsGridProps) {
  return (
    <section id="methodology" className="py-16 md:py-24 bg-white">
      <div className="container text-center">
        <h2 className="text-3xl font-semibold mb-4 text-[#1A2D44]">DC Tech Consulting's Methodology</h2>
        <p className="text-xl text-[#707070] max-w-3xl mx-auto mb-12">
          A proven six-step roadmap to understand, control &amp; optimize your technology spend.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s) => (
            <article
              key={s.num}
              className="relative group bg-white p-6 rounded-md shadow-md border
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span
                className="absolute -top-4 left-4 w-10 h-10 rounded-full flex items-center
                          justify-center text-white font-bold"
                style={{ backgroundColor: s.color }}
              >
                {s.num}
              </span>
              <h3 className="mt-6 mb-2 font-semibold text-[#1A2D44] group-hover:text-[#42C5C9] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-[#707070] text-sm">{s.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
