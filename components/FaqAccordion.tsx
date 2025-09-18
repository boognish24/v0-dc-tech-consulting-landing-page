"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqAccordion() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-[#1A2D44]">Frequently Asked Questions</h2>
          <p className="text-xl text-[#707070] max-w-3xl mx-auto">
            Get answers to common questions about our technology cost management services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden">
              <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                Who is this service best suited for?
              </AccordionTrigger>
              <AccordionContent className="text-[#707070] px-6 pb-4">
                Our methodology is specifically designed for medium to large multi-location organizations with complex technology environments. It's particularly valuable for CIOs, CFOs, and IT executives who need clear visibility into their technology costs and contractual obligations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden">
              <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                How long does the implementation process take?
              </AccordionTrigger>
              <AccordionContent className="text-[#707070] px-6 pb-4">
                The initial implementation typically takes 4-8 weeks, depending on the size and complexity of your organization. However, you'll start seeing valuable insights within the first few weeks as we begin analyzing your accounts payable data and vendor invoices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden">
              <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                Can we implement this framework on our own?
              </AccordionTrigger>
              <AccordionContent className="text-[#707070] px-6 pb-4">
                Yes, the 6-step framework is designed to be implementable by your internal team. However, many organizations choose to leverage our expertise for the initial setup and training, then maintain the system themselves going forward. We offer flexible engagement models to suit your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden">
              <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                What kind of ROI can we expect?
              </AccordionTrigger>
              <AccordionContent className="text-[#707070] px-6 pb-4">
                Most clients identify cost-saving opportunities of 15-30% of their technology spend within the first 3 months. Beyond direct cost savings, the improved visibility and decision-making capabilities typically lead to better technology investments and reduced waste over time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden">
              <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                What's the first step to get started?
              </AccordionTrigger>
              <AccordionContent className="text-[#707070] px-6 pb-4">
                The first step is to schedule a 30-minute introduction call where we'll review the framework and discuss how it applies to your specific situation. After that, you can decide whether to implement it on your own or with our assistance. There's no obligation, and you'll gain valuable insights just from the initial conversation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

