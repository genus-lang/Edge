import { ArrowRight, BookOpen, FileQuestion, Video } from "lucide-react";
import { Button } from "../ui/button";

export function HelpCenterCTA() {
  const helpResources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and API docs",
    },
    {
      icon: FileQuestion,
      title: "FAQ",
      description: "Quick answers to common questions",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step platform walkthroughs",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-8 md:p-12 border border-white/10 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Looking for help related to the platform?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore our self-service resources for instant answers
          </p>

          {/* Help Resources Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {helpResources.map((resource, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <resource.icon className="text-[#00FF88] mx-auto mb-3" size={32} />
                <h3 className="mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-400">{resource.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group"
          >
            <BookOpen className="mr-2" size={20} />
            Visit the Help Center
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
