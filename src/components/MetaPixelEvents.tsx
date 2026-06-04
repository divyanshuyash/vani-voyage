"use client";

import { useEffect } from "react";

type MetaPixelEventsProps = {
  trackLead?: boolean;
};

type FacebookPixelWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  metaPixelLastEvent?: {
    key: string;
    time: number;
  };
};

const DEDUPE_WINDOW_MS = 1000;

export default function MetaPixelEvents({ trackLead = false }: MetaPixelEventsProps) {
  useEffect(() => {
    let attempts = 0;

    const trackEvents = () => {
      const fbq = (window as FacebookPixelWindow).fbq;

      if (!fbq) {
        return false;
      }

      const eventKey = `${window.location.pathname}:${trackLead ? "lead" : "pageview"}`;
      const now = Date.now();
      const pixelWindow = window as FacebookPixelWindow;

      if (
        pixelWindow.metaPixelLastEvent?.key === eventKey &&
        now - pixelWindow.metaPixelLastEvent.time < DEDUPE_WINDOW_MS
      ) {
        return true;
      }

      pixelWindow.metaPixelLastEvent = {
        key: eventKey,
        time: now,
      };

      fbq("track", "PageView");

      if (trackLead) {
        fbq("track", "Lead");
      }

      return true;
    };

    if (trackEvents()) {
      return;
    }

    const interval = window.setInterval(() => {
      attempts += 1;

      if (trackEvents() || attempts >= 20) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [trackLead]);

  return null;
}
