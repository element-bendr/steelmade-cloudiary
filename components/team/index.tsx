import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamProps {
  members: TeamMember[];
}

export function Team({ members }: TeamProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card key={member.name} className="p-4">
          <div className="relative h-48 w-full mb-4">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <h3 className="text-lg font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
          <p className="mt-2 text-sm">{member.bio}</p>
        </Card>
      ))}
    </section>
  );
}