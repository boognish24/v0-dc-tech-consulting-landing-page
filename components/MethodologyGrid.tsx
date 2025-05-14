interface Step {
  num: number
  title: string
  blurb: string
  color: string
}

interface MethodologyGridProps {
  steps: Step[]
}

export default function MethodologyGrid({ steps }: MethodologyGridProps) {
  return (
    <section id="methodology" className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="container text-center">
        <h2 className="text-3xl font-semibold mb-4 text-[#1A2D44]">DC Tech Consulting's Methodology</h2>
        <p className="text-xl text-[#707070] max-w-3xl mx-auto mb-12">
          A proven six-step roadmap to understand, control &amp; optimize your technology spend.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative flex flex-col items-center text-center bg-white p-6 rounded-md shadow-md"
            >
              <span
                className="absolute -top-4 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                style={{ backgroundColor: step.color }}
              >
                {step.num}
              </span>
              <h3 className="mt-6 mb-2 font-semibold text-[#1A2D44]">{step.title}</h3>
              <p className="text-[#707070] text-sm">{step.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
