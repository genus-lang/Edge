import { Button } from "../ui/button";
import { MapPin, Briefcase, Clock } from "lucide-react";

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  workType: string;
  description: string;
}

export function JobCard({
  title,
  department,
  location,
  workType,
  description,
}: JobCardProps) {
  const handleApply = () => {
    console.log("Apply for:", title);
    // Handle job application logic
  };

  return (
    <div className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 hover:border-[#00FF88]/50 hover:shadow-2xl hover:shadow-[#00FF88]/20 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-2xl mb-2 group-hover:text-[#00FF88] transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 mb-4">{description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-[#00FF88]" />
          <span>{department}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#00C8FF]" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#00FF88]" />
          <span>{workType}</span>
        </div>
      </div>

      <Button
        onClick={handleApply}
        className="w-full md:w-auto bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity group"
      >
        Apply Now
        <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
      </Button>
    </div>
  );
}
