"use client";

import { useState } from "react";
import styles from "./LeadForm.module.css";

export default function LeadForm({ title = "Book Your Spot", subtitle = "Fill out the form below and our team will get in touch with you shortly." }: { title?: string, subtitle?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      // Send data to our local API route
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Show redirecting message and go to Thank You page
      setStatus("success");
      setTimeout(() => {
        window.location.href = "/thankyoupage";
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3>Redirecting...</h3>
        <p>Taking you to the next steps...</p>
      </div>
    );
  }

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
          <label htmlFor="message">Message / Query</label>
          <textarea id="message" name="message" rows={4} placeholder="How can we help you?"></textarea>
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
