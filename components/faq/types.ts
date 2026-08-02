export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQProps {
  className?: string;
  items?: FAQItem[];
}
