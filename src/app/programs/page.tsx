"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  MapPin,
  Monitor,
  Clock,
  Users,
  User,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ── Events Data ──
const events = [
  {
    id: 1,
    name: "Speak Up Saturday",
    type: "online" as const,
    date: new Date(2025, 4, 17),
    description:
      "A 2-hour interactive session to break the ice with public speaking. Perfect for beginners.",
    cta: "Save My Spot",
  },
  {
    id: 2,
    name: "Voice & Presence Workshop",
    type: "offline" as const,
    date: new Date(2025, 4, 24),
    description:
      "In-person deep-dive into vocal variety, body language, and executive presence.",
    cta: "Save My Spot",
  },
  {
    id: 3,
    name: "Confidence Masterclass",
    type: "online" as const,
    date: new Date(2025, 5, 7),
    description:
      "Learn the psychology of confidence and actionable techniques to overcome speaking anxiety.",
    cta: "Save My Spot",
  },
  {
    id: 4,
    name: "Group Discussion Bootcamp",
    type: "offline" as const,
    date: new Date(2025, 5, 14),
    description:
      "Practice structured discussions, learn to lead talks, and express ideas with clarity.",
    cta: "Save My Spot",
  },
];

// ── Courses Data ──
const courses = [
  {
    name: "Speak Up, Show Up",
    tagline: "Group confidence-building program",
    outcome:
      "Walk into any room and own your presence. Go from hesitant to heard in 8 weeks.",
    duration: "8 Weeks",
    format: "Group · Online",
    icon: <Users size={20} />,
  },
  {
    name: "Voice & Vocabulary",
    tagline: "1:1 personalized coaching",
    outcome:
      "Tailored sessions that target your specific blocks — filler words, accent anxiety, or stage fright.",
    duration: "12 Sessions",
    format: "1:1 · Online/Offline",
    icon: <User size={20} />,
    featured: true,
  },
  {
    name: "In-Person Intensive",
    tagline: "Offline workshop series",
    outcome:
      "Immersive weekend workshops with live practice, peer feedback, and real-time transformation.",
    duration: "2 Days",
    format: "Workshop · Offline",
    icon: <MapPin size={20} />,
  },
];

// ── Calendar Component ──
function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(
    null
  );

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const days = useMemo(
    () => eachDayOfInterval({ start: calStart, end: calEnd }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDate.getMonth(), currentDate.getFullYear()]
  );

  const getEventForDay = (day: Date) => events.find((e) => isSameDay(e.date, day));

  return (
    <div className="glass-card-static">
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
      }}>
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          style={{
            color: "var(--muted)",
            padding: 8,
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <h4 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "var(--text)",
        }}>
          {format(currentDate, "MMMM yyyy")}
        </h4>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          style={{
            color: "var(--muted)",
            padding: 8,
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day labels */}
      <div className="calendar-grid" style={{ marginBottom: "0.5rem" }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              padding: "0.5rem 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="calendar-grid" style={{ position: "relative" }}>
        {days.map((day) => {
          const event = getEventForDay(day);
          const inMonth = isSameMonth(day, currentDate);
          const todayCheck = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className={`calendar-day ${!inMonth ? "opacity-20" : ""} ${
                event ? "has-event" : ""
              } ${todayCheck ? "today" : ""}`}
              onClick={() => event && setSelectedEvent(event)}
            >
              {format(day, "d")}
            </div>
          );
        })}

        {/* Event Popover */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease }}
              style={{
                position: "absolute",
                zIndex: 50,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                minWidth: 280,
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
              }}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: "var(--muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Close popover"
              >
                <X size={16} />
              </button>
              <span className="t-label" style={{ marginBottom: "0.5rem", display: "block" }}>
                {selectedEvent.type === "online" ? "Online" : "Offline"} ·{" "}
                {format(selectedEvent.date, "MMM d, yyyy")}
              </span>
              <h5 className="t-card" style={{ marginBottom: "0.5rem" }}>
                {selectedEvent.name}
              </h5>
              <p style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.85rem",
                color: "var(--text-dim)",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}>
                {selectedEvent.description}
              </p>
              <Link href="/contact" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
                {selectedEvent.cta}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <>
      {/* ════════════════════════════════════
          HERO + EVENTS
          ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--bg)", paddingTop: "clamp(140px, 18vw, 200px)" }}>
        <div className="max-w">
          <div className="section-header">
            <span className="t-label">PROGRAMS & EVENTS</span>
            <h2 className="t-section">Where voices come alive</h2>
            <p>From group workshops to personal coaching — find the format that fits your journey.</p>
          </div>

          {/* Event Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            marginBottom: "1rem",
          }}>
            {events.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.08}>
                <div className="glass-card" style={{ height: "100%" }}>
                  {/* Date badge */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "var(--accent-soft)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <CalendarIcon size={16} style={{ color: "var(--accent)" }} />
                      </div>
                      <div>
                        <span style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          color: "var(--text)",
                          display: "block",
                          lineHeight: 1.2,
                        }}>
                          {format(event.date, "MMM d")}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.7rem",
                          color: "var(--muted)",
                        }}>
                          {format(event.date, "yyyy")}
                        </span>
                      </div>
                    </div>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.2rem 0.6rem",
                      background: "var(--surface-2)",
                      borderRadius: 100,
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      color: "var(--text-dim)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}>
                      {event.type === "online" ? (
                        <><Monitor size={10} /> Online</>
                      ) : (
                        <><MapPin size={10} /> Offline</>
                      )}
                    </span>
                  </div>

                  <h3 className="t-card" style={{ marginBottom: "0.5rem" }}>
                    {event.name}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: "1.25rem",
                  }}>
                    {event.description}
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      color: "var(--accent)",
                      transition: "gap 0.3s",
                    }}
                  >
                    {event.cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CALENDAR
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle">
        <div className="max-w" style={{ maxWidth: 600 }}>
          <div className="section-header">
            <span className="t-label">SCHEDULE</span>
            <h2 className="t-section">Find your date</h2>
            <p>Tap any highlighted date to see event details.</p>
          </div>

          <ScrollReveal>
            <EventCalendar />
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          COURSES
          ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--bg)" }}>
        <div className="max-w">
          <div className="section-header">
            <span className="t-label">STRUCTURED PROGRAMS</span>
            <h2 className="t-section">Choose your path</h2>
            <p>Long-term programs designed for lasting transformation.</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}>
            {courses.map((course, i) => (
              <ScrollReveal key={course.name} delay={i * 0.1}>
                <div
                  className="glass-card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    ...(course.featured ? { borderColor: "rgba(240,192,96,0.3)" } : {}),
                  }}
                >
                  {course.featured && (
                    <span
                      style={{
                        alignSelf: "flex-start",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "var(--accent)",
                        color: "var(--bg)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: 100,
                        marginBottom: "0.75rem",
                      }}
                    >
                      Recommended
                    </span>
                  )}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "var(--accent-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    marginBottom: "1.25rem",
                  }}>
                    {course.icon}
                  </div>
                  <h3 className="t-card" style={{ marginBottom: "0.25rem" }}>
                    {course.name}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    color: "var(--accent)",
                    fontStyle: "normal",
                    marginBottom: "0.75rem",
                  }}>
                    {course.tagline}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.7,
                    flex: 1,
                  }}>
                    {course.outcome}
                  </p>

                  <div style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "1.25rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border)",
                    flexWrap: "wrap",
                  }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.25rem 0.6rem",
                      background: "var(--surface-2)",
                      borderRadius: 100,
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "var(--text-dim)",
                    }}>
                      <Clock size={11} />
                      {course.duration}
                    </span>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.25rem 0.6rem",
                      background: "var(--surface-2)",
                      borderRadius: 100,
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "var(--text-dim)",
                    }}>
                      {course.format}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SERVICE COMPARISON
          ════════════════════════════════════ */}
      <section className="section-pad bg-gradient-subtle">
        <div className="max-w">
          <div className="section-header">
            <span className="t-label">COMPARE</span>
            <h2 className="t-section">What&apos;s included</h2>
            <p>Every format delivers transformation — pick what&apos;s right for you.</p>
          </div>

          {/* Table-like comparison */}
          <ScrollReveal>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
            }}>
              {/* Table Header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                borderBottom: "1px solid var(--border)",
              }}>
                <div style={{ padding: "1rem 1.25rem" }} />
                {["Group Class", "1:1 Coaching", "In-Person"].map((heading) => (
                  <div key={heading} style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "var(--text)",
                    textAlign: "center",
                    borderLeft: "1px solid var(--border)",
                  }}>
                    {heading}
                  </div>
                ))}
              </div>

              {/* Feature Rows */}
              {[
                { feature: "Live practice sessions", group: true, one: true, inPerson: true },
                { feature: "Personal feedback", group: false, one: true, inPerson: true },
                { feature: "Flexible scheduling", group: false, one: true, inPerson: false },
                { feature: "Peer learning", group: true, one: false, inPerson: true },
                { feature: "Custom curriculum", group: false, one: true, inPerson: false },
                { feature: "Certificate", group: true, one: true, inPerson: true },
              ].map((row, i) => (
                <div
                  key={row.feature}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    borderBottom: i < 5 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div style={{
                    padding: "0.75rem 1.25rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    color: "var(--text-dim)",
                  }}>
                    {row.feature}
                  </div>
                  {[row.group, row.one, row.inPerson].map((val, j) => (
                    <div key={j} style={{
                      padding: "0.75rem 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderLeft: "1px solid var(--border)",
                    }}>
                      {val ? (
                        <div style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "var(--accent-soft)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <Check size={12} style={{ color: "var(--accent)" }} />
                        </div>
                      ) : (
                        <span style={{ color: "var(--border)", fontSize: "1.2rem" }}>—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.1}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/contact" className="btn-primary">
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
