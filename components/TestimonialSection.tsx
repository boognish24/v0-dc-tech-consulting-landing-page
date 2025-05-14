import Image from "next/image"

interface Testimonial {
  quote: string
  attribution: string
  company: string
  logo: string
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-[#1A2D44]">What Our Clients Say</h2>
          <p className="text-xl text-[#707070] max-w-3xl mx-auto">
            Hear from executives who have gained clarity and control over their technology costs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-md shadow-md">
              <div className="flex justify-center mb-4">
                <svg className="h-8 w-8 text-[#42C5C9]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-[#707070] mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1A2D44]">{testimonial.attribution}</p>
                  <p className="text-sm text-[#707070]">{testimonial.company}</p>
                </div>
                <Image
                  src={testimonial.logo || "/placeholder.svg"}
                  alt={`${testimonial.company} logo`}
                  width={80}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
