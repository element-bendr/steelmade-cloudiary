"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TeamMemberCard } from "./team-member-card";
import { teamMembers } from "@/lib/data/team-data";
import { TeamProps } from "./types";
import { motion } from "framer-motion";

export function Team({ className, members = teamMembers }: TeamProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={cn("p-8", className)}>
      <header className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
        >
          Our Team
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-2 text-lg"
        >
          Meet the experts behind our success
        </motion.p>
      </header>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {members.map((member, index) => (
          <TeamMemberCard 
            key={member.id} 
            member={member}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default Team;
