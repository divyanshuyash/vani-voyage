import Script from "next/script";

type MetaPixelEventsProps = {
  trackLead?: boolean;
};

export default function MetaPixelEvents({ trackLead = false }: MetaPixelEventsProps) {
  return (
    <Script
      id={trackLead ? "meta-pixel-thankyou-events" : "meta-pixel-home-events"}
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: trackLead
          ? `
fbq('track', 'PageView');
fbq('track', 'Lead');
`
          : `
fbq('track', 'PageView');
`,
      }}
    />
  );
}
