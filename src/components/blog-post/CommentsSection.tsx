import { Button } from "../ui/button";
import { useState } from "react";

export function CommentsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Comment submitted:", formData);
    setFormData({ name: "", email: "", comment: "" });
  };

  return (
    <section className="px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-8">Join the Discussion</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF88]/50 transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF88]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm text-gray-400 mb-2">
              Comment *
            </label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
              rows={6}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF88]/50 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Comments are moderated to ensure constructive discussion.
            </p>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity"
            >
              Post Comment
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
