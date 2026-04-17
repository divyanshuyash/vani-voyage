import re

with open("src/app/page.tsx", "r") as f:
    page_content = f.read()

# 1. Modify the CSS in page.tsx to add the layout reverse and mask-image
css_add = """
          .hero-grid {
            display: flex !important;
            flex-direction: column-reverse !important;
            gap: 1rem !important;
          }
          .hero-photo-container {
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
          }
"""
page_content = page_content.replace("        @media (max-width: 768px) {", "        @media (max-width: 768px) {\n" + css_add)

# 2. Add classes to the grid and containers
page_content = page_content.replace(
    """className="lg:!grid-cols-[1fr_1fr]\"""",
    """className="hero-grid lg:!grid-cols-[1fr_1fr]\""""
)
page_content = page_content.replace(
    """<div style={{ width: "100%", maxWidth: 500, marginInline: "auto" }}>""",
    """<div className="hero-text-container" style={{ width: "100%", maxWidth: 500, marginInline: "auto" }}>"""
)
page_content = page_content.replace(
    """<motion.div\n              initial={{ opacity: 0, scale: 1.03 }}\n              animate={{ opacity: 1, scale: 1 }}\n              transition={{ duration: 1.2, delay: 0.2, ease }}\n              style={{ display: "flex", justifyContent: "center", width: "100%" }}\n            >""",
    """<motion.div\n              className="hero-photo-container"\n              initial={{ opacity: 0, scale: 1.03 }}\n              animate={{ opacity: 1, scale: 1 }}\n              transition={{ duration: 1.2, delay: 0.2, ease }}\n              style={{ display: "flex", justifyContent: "center", width: "100%" }}\n            >"""
)

with open("src/app/page.tsx", "w") as f:
    f.write(page_content)


with open("src/components/Footer.tsx", "r") as f:
    footer_content = f.read()

# Make Footer responsive
footer_grid_old = """style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 1.3fr) repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.75rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(245, 240, 232, 0.12)",
          }}"""
footer_grid_new = """className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] gap-10"
          style={{
            marginBottom: "2.75rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(245, 240, 232, 0.12)",
          }}"""
footer_content = footer_content.replace(footer_grid_old, footer_grid_new)

with open("src/components/Footer.tsx", "w") as f:
    f.write(footer_content)

print("Modifications done.")
