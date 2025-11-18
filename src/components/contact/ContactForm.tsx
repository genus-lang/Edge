import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Send, Check } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-8 md:p-12 border border-white/10">
          <h2 className="text-3xl md:text-4xl mb-2 text-center">
            Send us a message
          </h2>
          <p className="text-gray-400 text-center mb-8">
            We'll get back to you within 24 hours
          </p>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg flex items-center gap-3 animate-in slide-in-from-top">
              <Check className="text-[#00FF88]" size={24} />
              <p className="text-[#00FF88]">
                Thank you for reaching out — our support team will get back to you within 24
                hours.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-gray-300 mb-2 block">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`bg-[#0B0B0B] border-white/10 focus:border-[#00FF88] transition-colors ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300 mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`bg-[#0B0B0B] border-white/10 focus:border-[#00FF88] transition-colors ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Subject */}
            <div>
              <Label htmlFor="subject" className="text-gray-300 mb-2 block">
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className={`bg-[#0B0B0B] border-white/10 focus:border-[#00FF88] transition-colors ${
                  errors.subject ? "border-red-500" : ""
                }`}
                placeholder="How can we help?"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-gray-300 mb-2 block">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`bg-[#0B0B0B] border-white/10 focus:border-[#00FF88] transition-colors min-h-[150px] ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder="Tell us more about your question or concern..."
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group min-w-[200px]"
              >
                <Send className="mr-2" size={20} />
                Submit Message
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy and never share your information.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
