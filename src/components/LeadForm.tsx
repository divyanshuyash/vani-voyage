"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LeadForm.module.css";

const GOOGLE_SHEET_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbwMfCIiLOI4XqNSmwzOIygH_Q9oj1qI3QZfiCoC3wcRzwU8TQwUU3uP306yhOozA7UhLw/exec";

export default function LeadForm({
  title = "Book Your Spot",
  subtitle = "Fill out the form below and our team will get in touch with you shortly.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      what: formData.get("what"),
      why: formData.get("why"),
      source: window.location.pathname.includes("webinar")
        ? "Live Webinar"
        : "1:1 Session",
    };

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      router.push("/thankyoupage");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name *</label>
          <input type="text" id="name" name="name" required placeholder="John Doe" />
        </div>
        
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" name="email" required placeholder="john@example.com" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone Number *</label>
            <input type="tel" id="phone" name="phone" required placeholder="+91 9876543210" />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="what">What are you looking for? *</label>
          <textarea id="what" name="what" required rows={2} placeholder="E.g., Improve my communication skills, prepare for an interview..."></textarea>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="why">Why do you want to join? *</label>
          <textarea id="why" name="why" required rows={2} placeholder="E.g., I have a promotion coming up and need to speak confidently..."></textarea>
        </div>

        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
