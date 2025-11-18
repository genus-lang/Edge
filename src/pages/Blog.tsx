import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { BlogHero } from "../components/blog/BlogHero";
import { BlogFilters } from "../components/blog/BlogFilters";
import { BlogCard } from "../components/blog/BlogCard";
import { BlogNewsletter } from "../components/blog/BlogNewsletter";
import { Pagination } from "../components/blog/Pagination";
import { Footer } from "../components/Footer";
import { blogPostsData } from "../data/blogPosts";

export function Blog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts =
    activeFilter === "All"
      ? blogPostsData
      : blogPostsData.filter((post) => post.category === activeFilter);

  const postsPerPage = 9;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const featuredPosts = blogPostsData.filter((post) => post.featured);
  const regularPosts = currentPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <BlogHero />
      <BlogFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Featured Posts */}
      {activeFilter === "All" && currentPage === 1 && (
        <section className="px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl mb-8">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard key={index} {...post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {activeFilter !== "All" && <h2 className="text-3xl mb-8">{activeFilter}</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeFilter === "All" && currentPage === 1 ? regularPosts : currentPosts).map(
              (post, index) => (
                <BlogCard key={index} {...post} />
              )
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      <BlogNewsletter />
      <Footer />
    </div>
  );
}