import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# 1. CSS Adds
css_additions = """
          .hero-grain::before {
            content: "";
            position: absolute;
            inset: -50%;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
            background-size: 256px 256px;
            opacity: 0.6;
            z-index: 0;
          }
          @keyframes pulse-shadow {
            0% { box-shadow: 0 0 0 0 rgba(193, 123, 60, 0.4); }
            70% { box-shadow: 0 0 0 12px rgba(193, 123, 60, 0); }
            100% { box-shadow: 0 0 0 0 rgba(193, 123, 60, 0); }
          }
          .btn-pulse {
            animation: pulse-shadow 3s infinite;
          }
          .card-wipe-border {
            position: relative;
          }
          .card-wipe-border::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--accent);
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 0.4s ease;
            border-radius: 4px 0 0 4px;
          }
          .glass-card:hover .card-wipe-border::before,
          .glass-card:hover::before {
            transform: scaleY(1);
          }
          .glass-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--accent);
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 0.4s ease;
            border-radius: 4px 0 0 4px;
          }
          .explore-link:hover .explore-arrow {
            transform: translateX(6px);
          }
          .explore-arrow {
            transition: transform 0.3s ease;
          }
          .marquee-wrap:hover .marquee-track {
            animation-play-state: paused;
          }
"""

content = content.replace("        @media (max-width: 768px) {", css_additions + "\n        @media (max-width: 768px) {")


# 2. Hero: Background grain class
content = content.replace('className="bg-accent-glow"', 'className="bg-accent-glow hero-grain"')

# 3. Hero: Button pulse class
content = content.replace('className="btn-primary"', 'className="btn-primary btn-pulse"')

# 4. Hero: Headline word reveal
headline_orig_text = """                Find your voice.
                <br />
                <span style={{ color: "var(--accent)" }}>Speak with confidence.</span>"""

headline_new = """                {"Find your voice.".split(" ").map((w, i) => <motion.span key={i} style={{display:"inline-block", marginRight:"0.28em"}} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1 + i*0.1, duration:0.6}}>{w}</motion.span>)}
                <br />
                <span style={{ color: "var(--accent)" }}>
                  {"Speak with confidence.".split(" ").map((w, i) => <motion.span key={i} style={{display:"inline-block", marginRight:"0.28em"}} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.4 + i*0.1, duration:0.6}}>{w}</motion.span>)}
                </span>"""
content = content.replace(headline_orig_text, headline_new)

# 5. Hero: Vani's Photo scale down (from 1.03 to 1.0 over 1.2s)
content = content.replace("initial={{ opacity: 0, scale: 0.95 }}", "initial={{ opacity: 0, scale: 1.03 }}")
content = content.replace("transition={{ duration: 0.8, delay: 0.2, ease }}", "transition={{ duration: 1.2, delay: 0.2, ease }}")

# 6. Trust Badges: stagger in, hover lift
badge_orig = """                {heroProof.map((text) => (
                  <span
                    key={text}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "0.74rem",
                      color: "var(--muted)",
                      padding: "0.35rem 0.72rem",
                      background: "var(--surface)",
                      borderRadius: 100,
                      border: "1px solid var(--border)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                    {text}
                  </span>
                ))}"""

badge_new = """                {heroProof.map((text, i) => (
                  <motion.span
                    key={text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(193, 123, 60, 0.12)" }}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "0.74rem",
                      color: "var(--muted)",
                      padding: "0.35rem 0.72rem",
                      background: "var(--surface)",
                      borderRadius: 100,
                      border: "1px solid var(--border)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "default",
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                    {text}
                  </motion.span>
                ))}"""
content = content.replace(badge_orig, badge_new)

# 7. Quote word by word reveal
quote_orig = """                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    lineHeight: 1.25,
                    color: "var(--text)",
                    marginBottom: "1.5rem",
                    position: "relative",
                    paddingLeft: "1.5rem",
                    borderLeft: "3px solid var(--accent)",
                  }}
                >
                  I did not build this to teach textbook English. I built this
                  to transform confidence, mindset, and voice.
                </blockquote>"""
quote_new = """                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    lineHeight: 1.25,
                    color: "var(--text)",
                    marginBottom: "1.5rem",
                    position: "relative",
                    paddingLeft: "1.5rem",
                    borderLeft: "3px solid var(--accent)",
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    style={{ color: "var(--accent)", position: "absolute", left: "-0.5rem", top: "-0.5rem", fontSize: "1.2em", opacity: 0.4, fontStyle: "italic" }}
                  >
                    "
                  </motion.span>
                  {"I did not build this to teach textbook English. I built this to transform confidence, mindset, and voice.".split(" ").map((w, i) => (
                    <motion.span key={i} style={{display:"inline-block", marginRight:"0.28em"}} initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, margin:"-50px"}} transition={{delay: i*0.06, duration:0.3}}>{w}</motion.span>
                  ))}
                </blockquote>"""
content = content.replace(quote_orig, quote_new)

# 8. Signature Programs: Make ghost numbers more visible
content = content.replace('color: "rgba(122, 110, 100, 0.45)",', 'color: "rgba(193, 123, 60, 0.5)",')

# 9. Signature Programs hover and arrow animations
# Find the arrow logic inside the card
arrow_orig = """<ArrowRight size={16} style={{ color: "var(--accent)" }} />"""
arrow_new = """<ArrowRight size={16} className="explore-arrow" style={{ color: "var(--accent)" }} />"""
content = content.replace('href="/programs"\n                    className="glass-card"', 'href="/programs"\n                    className="glass-card explore-link"')
content = content.replace(arrow_orig, arrow_new)
content = content.replace('whileHover={{ y: -8, scale: 1.01 }}', 'whileHover={{ y: -8, scale: 1.01 }}\n                  className="card-wipe-border"')
content = content.replace('transition={{ duration: 0.3, ease }}', 'transition={{ duration: 0.4, ease }}')

# 10. Testimonial opening quote mark
test_orig = """<Star size={12} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {text}"""
test_new = """<Star size={12} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    <span style={{color:"var(--accent)", fontStyle:"italic", marginRight:"-0.4rem"}}>“</span>{text}"""
content = content.replace(test_orig, test_new)

with open("src/app/page.tsx", "w") as f:
    f.write(content)

print("Modifications done.")
