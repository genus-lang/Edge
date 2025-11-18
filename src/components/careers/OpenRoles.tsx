import { JobCard } from "./JobCard";

export function OpenRoles() {
  const jobs = [
    {
      title: "Frontend Engineer — React / TypeScript",
      department: "Engineering",
      location: "Remote",
      workType: "Full-time",
      description:
        "Build pixel-perfect interfaces used by traders globally. Work with React, TypeScript, and modern web technologies.",
    },
    {
      title: "Backend Engineer — Python / FastAPI",
      department: "Engineering",
      location: "Remote",
      workType: "Full-time",
      description:
        "Architect and scale our trading and backtesting systems. Design high-performance APIs and data pipelines.",
    },
    {
      title: "Quant Research Intern",
      department: "Research",
      location: "Remote",
      workType: "Internship",
      description:
        "Assist in developing and testing quantitative trading strategies. Perfect for students passionate about finance and data science.",
    },
    {
      title: "Product Designer — UI/UX",
      department: "Design",
      location: "Remote",
      workType: "Full-time",
      description:
        "Create intuitive, beautiful experiences for traders. Shape the product vision from concept to execution.",
    },
    {
      title: "Data Scientist — ML/AI",
      department: "Research",
      location: "Remote",
      workType: "Full-time",
      description:
        "Build and optimize AI models for strategy optimization and market prediction. Work with large-scale financial datasets.",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      workType: "Full-time",
      description:
        "Build and maintain our cloud infrastructure. Ensure 99.9% uptime for our trading platform.",
    },
  ];

  return (
    <section id="open-positions" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl mb-12 text-center">Open Positions</h2>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}
