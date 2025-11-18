import { BlogPostContent as BlogPostContentType } from "../../types/blog";

interface BlogPostContentProps {
  content: BlogPostContentType;
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <article className="px-6 lg:px-8 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Opening Paragraph */}
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
          {content.openingParagraph}
        </p>

        {/* Sections */}
        {content.sections.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-2xl md:text-3xl mb-6">{section.heading}</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">{section.content}</p>
            
            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-3 ml-6">
                {section.bulletPoints.map((point, idx) => (
                  <li key={idx} className="text-gray-300 relative pl-6 before:content-['→'] before:absolute before:left-0 before:text-[#00FF88]">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Quote Block */}
        {content.quote && (
          <blockquote className="relative my-12 p-8 bg-gradient-to-br from-[#00FF88]/5 to-[#00C8FF]/5 border-l-4 border-[#00FF88] rounded-r-xl">
            <div className="absolute top-4 left-4 text-6xl text-[#00FF88]/20">"</div>
            <p className="text-xl md:text-2xl text-white italic pl-8 leading-relaxed">
              {content.quote}
            </p>
          </blockquote>
        )}

        {/* Closing Paragraph */}
        <p className="text-lg text-gray-300 leading-relaxed mt-12">
          {content.closingParagraph}
        </p>
      </div>
    </article>
  );
}
