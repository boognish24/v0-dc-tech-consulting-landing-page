import Image from "next/image"

type Card = { title: string; subtitle: string; img: string; blurb: string }

const activity: Card[] = [
  {
    title: "Technology Cost Assessment",
    subtitle: "Baseline all telecom & cloud spend",
    img: "/placeholder.svg?height=400&width=600",
    blurb: "Full visibility into every telecom, cloud & SaaS charge—before we negotiate a single dollar.",
  },
  {
    title: "Vendor Contract Negotiation",
    subtitle: "Leverage 30 years of benchmarks",
    img: "/placeholder.svg?height=400&width=600",
    blurb: "Benchmarking 30 yrs of rate data to slash costs and lock in flexible terms.",
  },
  {
    title: "Lifecycle Asset Management",
    subtitle: "Track from activation to retirement",
    img: "/placeholder.svg?height=400&width=600",
    blurb: "Track each circuit, license & device from activation to retirement—no more zombie services.",
  },
  {
    title: "Executive Reporting-as-a-Service",
    subtitle: "Board-ready dashboards monthly",
    img: "/placeholder.svg?height=400&width=600",
    blurb: "Board-ready dashboards surface cost variance, risk and KPI trends—delivered monthly.",
  },
]

const domain: Card[] = [
  {
    title: "Network & Connectivity",
    subtitle: "SD-WAN, SASE, MPLS, DIA",
    img: "/placeholder.svg?height=400&width=600",
    blurb: "SD-WAN, SASE, MPLS, DIA—designed, sourced & optimized.",
  },
  {
    title: "UCaaS / CCaaS",
    subtitle: "Align with hybrid-work needs",
    img: "/placeholder.svg?height=400&width=600",
    blurb: "Align license mix and QOS with hybrid-work user behaviour.",
  },
  {
    title: "Cloud & Colocation",
    subtitle: "Right-size workloads & costs",
    img: "/placeholder.svg?height=400&width=600",
    blurb: "Right-size workloads, interconnects and egress to cut spend.",
  },
  {
    title: "Security Solutions",
    subtitle: "Zero-Trust, MDR & compliance",
    img: "/placeholder.svg?height=400&width=600",
    blurb: "Zero-Trust, MDR and compliance controls scoped for ROI.",
  },
]

export function HelpGrid() {
  const render = (c: Card) => (
    <div key={c.title} className="group relative h-72 rounded-md overflow-hidden">
      <Image
        src={c.img || "/placeholder.svg"}
        alt={c.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-[#1A2D44]/70 group-hover:bg-[#1A2D44]/90 transition-colors duration-300" />
      <div className="relative z-10 flex flex-col justify-center h-full p-6 text-white">
        <h3 className="text-xl font-semibold">{c.title}</h3>
        <p className="text-sm text-[#7FD9DB]">{c.subtitle}</p>
        <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{c.blurb}</p>
      </div>
    </div>
  )

  return (
    <section id="help" className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="container text-center mb-12">
        <h2 className="text-3xl font-semibold text-[#1A2D44]">How Can We Help?</h2>
        <p className="text-xl text-[#707070] max-w-3xl mx-auto">
          Execution expertise <strong>and</strong> domain depth—pick the lane where you need momentum.
        </p>
      </div>

      {/* activity row */}
      <div className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">{activity.map(render)}</div>

      {/* domain row */}
      <div className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{domain.map(render)}</div>
    </section>
  )
}
