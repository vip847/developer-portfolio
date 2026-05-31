'use client';

import {
  Mail,
  ExternalLink,
  Loader2,
  Send,
  Github,
  Instagram,
  Linkedin,
  Phone
} from "lucide-react";
import { connect } from "@/public/constants/data";
import { useRef, useState } from "react";

const ContactView = () => {

  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    try {
      // 1. Send data to FormSubmit
      const response = await fetch("https://formsubmit.co/ajax/viplaoitankar26@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: (formRef.current.elements.namedItem('from_name') as HTMLInputElement).value,
          email: (formRef.current.elements.namedItem('from_email') as HTMLInputElement).value,
          message: (formRef.current.elements.namedItem('message') as HTMLTextAreaElement).value,
          _subject: "New Portfolio Contact Request!", // Subject line customization
          _template: "table", // Makes the email look nice
        })
      });

      const result = await response.json();

      if (result.success === "true" || response.ok) {
        setEmailStatus("success");
        setIsSending(false);
        setTimeout(() => setEmailStatus("idle"), 5000);
        formRef.current.reset();
      } else {
        throw new Error("Failed to send");
      }

    } catch (error) {
      console.error(error);
      setEmailStatus("error");
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header Section */}
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold mb-1">Get in Touch</h3>
        <p className="text-zinc-500 text-sm">Have a project in mind or just want to say hi?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT COLUMN: Social Links */}
        <div className="space-y-3 order-2 md:order-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Connect</h4>
          {connect.map((item) => {
            const Icon = getSocialIcon(item.title);
            return (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-white dark:group-hover:bg-zinc-900 transition-colors">
                    <Icon size={18} className="text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</span>
                </div>
                <ExternalLink size={16} className="text-zinc-400 group-hover:text-blue-500" />
              </a>
            )
          })}
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-5 border border-zinc-100 dark:border-zinc-800 order-1 md:order-2">
          {emailStatus === "success" ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-3">
                <Send size={24} />
              </div>
              <h4 className="font-bold text-lg text-green-600 dark:text-green-400">Message Sent!</h4>
              <p className="text-sm text-zinc-500">I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-1">Name</label>
                <input
                  type="text"
                  name="from_name" // Must match EmailJS template variable
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-1">Email</label>
                <input
                  type="email"
                  name="from_email" // Must match EmailJS template variable
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-1">Message</label>
                <textarea
                  name="message" // Must match EmailJS template variable
                  required
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>

              {emailStatus === "error" && (
                <p className="text-xs text-red-500 text-center">Failed to send. Please try again.</p>
              )}
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

export default ContactView;

// Helper function to map your data titles to Lucide Icons
function getSocialIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("github")) return Github;
  if (lower.includes("instagram")) return Instagram;
  if (lower.includes("linkedin")) return Linkedin;
  if (lower.includes("mail") || lower.includes("gmail")) return Mail;
  if (lower.includes("contact") || lower.includes("phone")) return Phone;
  return function WhatsAppIcon({ size = 18, className }: { size?: number, className?: string }) {
    return (

      <svg fill="currentColor" width={size} height={size} viewBox="0 0 32 32" className={className} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>whatsapp</title>
        <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>
      </svg>
    );
  };
}