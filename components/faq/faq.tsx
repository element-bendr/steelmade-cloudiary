"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQProps, FAQItem } from "./types";

const defaultFAQItems: FAQItem[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "We offer high-quality steel manufacturing solutions including custom fabrication, processing, and design consultancy.",
  },
  {
    id: 2,
    question: "How can I request a quote?",
    answer: "You can request a quote through our Contact page by filling out the provided form.",
  },
  {
    id: 3,
    question: "Do you offer after-sales support?",
    answer: "Yes, we provide comprehensive after-sales support to ensure your complete satisfaction.",
  },
];

export function FAQ({ className, items = defaultFAQItems }: FAQProps) {
  return (
    <div className={cn("p-8", className)}>
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
            <AccordionTrigger className="text-xl font-semibold hover:text-red-600 transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQ;
