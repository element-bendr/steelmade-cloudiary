export interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  imageUrl: string;
  role?: string;
  company?: string;
}

export interface TestimonialProps {
  className?: string;
  testimonials?: Testimonial[];
}
