"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  MapPin,
  Monitor,
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
import type { ProgramSheetRow } from "@/lib/programSheet";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type ProgramEvent = {
  id: number;
  name: string;
  type: "online" | "offline";
  date: Date;
  description: string;
  cta: string;
  url: string;
};

// ── Events Data ──
const events: ProgramEvent[] = [
  {
    id: 1,
    name: "Speak Like an Executive",
    type: "online" as const,
    date: new Date(2026, 0, 17),
    description:
      "Executive communication training to help you speak with authority in meetings, presentations, and leadership conversations.",
    cta: "Book This Program",
    url: "/contact",
  },
  {
    id: 2,
    name: "Unshakable Confidence Webinar",
    type: "online" as const,
    date: new Date(2026, 1, 7),
    description:
      "A confidence reset for learners and professionals who know their potential but hesitate when it is time to speak.",
    cta: "Book This Program",
    url: "/contact",
  },
  {
    id: 3,
    name: "From Silent Strength to Recognised Power",
    type: "offline" as const,
    date: new Date(2026, 2, 14),
    description:
      "For high-potential professionals ready to step forward, communicate clearly, and be seen as valuable contributors.",
    cta: "Book This Program",
    url: "/contact",
  },
  {
    id: 4,
    name: "Career Catalyst",
    type: "online" as const,
    date: new Date(2026, 3, 4),
    description:
      "Communication and mindset coaching to accelerate your professional growth and leadership readiness.",
    cta: "Book This Program",
    url: "/contact",
  },
  {
    id: 5,
    name: "Boardroom Breakthrough",
    type: "offline" as const,
    date: new Date(2026, 4, 9),
    description:
      "High-impact in-person training to own high-stakes rooms, influence decisions, and communicate with executive presence.",
    cta: "Book This Program",
    url: "/contact",
  },
  {
    id: 6,
    name: "Corporate Training for BOSCH Group",
    type: "offline" as const,
    date: new Date(2026, 5, 13),
    description:
      "Enterprise communication and confidence training model tailored for teams and corporate cohorts.",
    cta: "Enquire for Corporate",
    url: "/contact",
  },
];

function parseSheetDate(value: string): Date | null {
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  const dayFirstMatch = normalized.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dayFirstMatch) {
    const day = Number(dayFirstMatch[1]);
    const month = Number(dayFirstMatch[2]) - 1;
    const year = Number(dayFirstMatch[3]);
    const date = new Date(year, month, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const isoMatch = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    const date = new Date(year, month, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const fallback = new Date(normalized);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function getProgramType(mode: string, location: string): "online" | "offline" {
  const normalizedMode = mode.toLowerCase();
  const normalizedLocation = location.toLowerCase();

  if (normalizedMode.includes("offline") || normalizedLocation.includes("offline")) {
    return "offline";
  }

  return "online";
}

// ── Calendar Component ──
function EventCalendar({ eventItems }: { eventItems: ProgramEvent[] }) {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    if (eventItems.length > 0) {
      const firstEvent = [...eventItems].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )[0];
      return new Date(firstEvent.date.getFullYear(), firstEvent.date.getMonth(), 1);
    }

    return new Date();
  });
  const [selectedEvent, setSelectedEvent] = useState<ProgramEvent | null>(
    null
  );

  useEffect(() => {
    if (eventItems.length === 0) {
      return;
    }

    const firstEvent = [...eventItems].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )[0];
    setCurrentDate(new Date(firstEvent.date.getFullYear(), firstEvent.date.getMonth(), 1));
  }, [eventItems]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const days = useMemo(
    () => eachDayOfInterval({ start: calStart, end: calEnd }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDate.getMonth(), currentDate.getFullYear()]
  );

  const getEventForDay = (day: Date) => eventItems.find((e) => isSameDay(e.date, day));

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
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            onClick={() => setSelectedEvent(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 80,
              background: "rgba(10, 10, 10, 0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease }}
              onClick={(event) => event.stopPropagation()}
              style={{
                position: "relative",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                width: "min(560px, calc(100vw - 2rem))",
                maxHeight: "min(78vh, 560px)",
                overflowY: "auto",
                boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
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
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "0.85rem",
                  color: "var(--text-dim)",
                  marginBottom: "1rem",
                  lineHeight: 1.6,
                }}
              >
                {selectedEvent.description}
              </p>
              <Link
                href={selectedEvent.url || "/contact"}
                className="btn-primary"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
              >
                {selectedEvent.cta}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProgramsPage() {
  const [eventItems, setEventItems] = useState<ProgramEvent[]>([]);

  const summary = useMemo(() => {
    const onlineCount = eventItems.filter((event) => event.type === "online").length;
    const offlineCount = eventItems.filter((event) => event.type === "offline").length;
    const nextEvent = [...eventItems].sort((a, b) => a.date.getTime() - b.date.getTime())[0];

    return {
      total: eventItems.length,
      online: onlineCount,
      offline: offlineCount,
      nextLabel: nextEvent ? format(nextEvent.date, "MMM d, yyyy") : "To be announced",
    };
  }, [eventItems]);

  useEffect(() => {
    let active = true;

    fetch("/api/programs", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Programs API failed with status ${response.status}`);
        }

        return response.json() as Promise<{ rows: ProgramSheetRow[] }>;
      })
      .then(({ rows }) => {
        if (!active) {
          return;
        }

        const mappedEvents: ProgramEvent[] = rows
          .map((row, index) => {
            const parsedDate = parseSheetDate(row.startDate);
            if (!parsedDate) {
              return null;
            }

            const eventType = getProgramType(row.mode, row.location);

            return {
              id: index + 1,
              name: row.course,
              type: eventType,
              date: parsedDate,
              description: row.description || "Details will be shared soon.",
              cta: "Book This Program",
              url: row.url || "/contact",
            };
          })
          .filter((event): event is ProgramEvent => event !== null);

        setEventItems(mappedEvents);
      })
      .catch((error) => {
        console.error("Failed to load program rows from API", error);
        if (!active) {
          return;
        }

        setEventItems(events);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* ════════════════════════════════════
          HERO + EVENTS
          ════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--bg)", paddingTop: "clamp(110px, 16vw, 190px)" }}>
        <div className="max-w">
          <div className="section-header">
            <span className="t-label">PROGRAMS & EVENTS</span>
            <h2 className="t-section">Build voice, confidence, and leadership</h2>
            <p>
              Every program is designed to help you speak with clarity,
              influence, and professional presence in real-world situations.
            </p>
          </div>

          {/* Event Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}>
            {eventItems.map((event, i) => (
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
                    href={event.url || "/contact"}
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.9rem",
            }}
          >
            {[
              { label: "Upcoming Programs", value: `${summary.total}` },
              { label: "Online Sessions", value: `${summary.online}` },
              { label: "Offline Sessions", value: `${summary.offline}` },
              { label: "Next Start", value: summary.nextLabel },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  background: "var(--surface)",
                  padding: "1rem 1.1rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {item.value}
                </p>
              </div>
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
            <h2 className="t-section">Program calendar 2026</h2>
            <p>Tap any highlighted date to view details and booking options.</p>
          </div>

          <ScrollReveal>
            <EventCalendar eventItems={eventItems} />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-dim)",
                  marginBottom: "1rem",
                }}
              >
                Need help choosing the right format for your current stage?
              </p>
              <Link href="/contact" className="btn-primary">
                Talk to Me
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
