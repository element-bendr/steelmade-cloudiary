export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TeamProps {
  className?: string;
  members?: TeamMember[];
}
