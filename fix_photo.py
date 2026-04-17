import re

with open("src/app/page.tsx", "r") as f:
    page_content = f.read()

# Fix CSS overrides
old_css = """.hero-photo-container {
            width: 100% !important;
            margin-bottom: -50px !important;
            z-index: 0 !important;
            position: relative;
          }
          .hero-text-container {
            z-index: 1 !important;
            position: relative;
            padding-top: 1rem;
          }
          .hero-photo-wrapper {
            border-radius: 0 !important;
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%) !important;
            mask-image: linear-gradient(to bottom, black 50%, transparent 100%) !important;
            width: 100% !important;
            height: 45vh !important;
            min-height: 380px !important;
          }"""

new_css = """.hero-photo-container {
            width: 100% !important;
            margin-bottom: -110px !important;
            z-index: 0 !important;
            position: relative;
          }
          .hero-text-container {
            z-index: 1 !important;
            position: relative;
            padding-top: 1rem;
          }
          .hero-photo-wrapper {
            border-radius: 0 !important;
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%) !important;
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%) !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            aspect-ratio: 1 / 1.15 !important;
          }
          .hero-image-overlay {
            display: none !important;
          }"""
page_content = page_content.replace(old_css, new_css)

# Hide the black gradient overlay and the "Speak with confidence" chip on mobile
old_overlay = """<div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "35%",
                    background: "linear-gradient(transparent, rgba(26, 22, 18, 0.5))",
                    pointerEvents: "none",
                  }}
                />
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.45, ease }}
                  style={{
                    position: "absolute",
                    left: 14,
                    bottom: 14,
                    borderRadius: 999,
                    padding: "0.4rem 0.75rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.68rem",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "var(--on-dark)",
                    background: "rgba(44, 62, 53, 0.72)",
                    border: "1px solid rgba(245, 240, 232, 0.3)",
                  }}
                >
                  Speak with Confidence
                </motion.span>"""

new_overlay = """<div
                  className="hero-image-overlay"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "40%",
                    background: "linear-gradient(transparent, rgba(26, 22, 18, 0.6))",
                    pointerEvents: "none",
                  }}
                />
                <motion.span
                  className="hide-mobile"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.45, ease }}
                  style={{
                    position: "absolute",
                    left: 14,
                    bottom: 14,
                    borderRadius: 999,
                    padding: "0.4rem 0.75rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.68rem",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "var(--on-dark)",
                    background: "rgba(44, 62, 53, 0.72)",
                    border: "1px solid rgba(245, 240, 232, 0.3)",
                  }}
                >
                  Speak with Confidence
                </motion.span>"""
page_content = page_content.replace(old_overlay, new_overlay)

with open("src/app/page.tsx", "w") as f:
    f.write(page_content)

print("Modifications done.")
