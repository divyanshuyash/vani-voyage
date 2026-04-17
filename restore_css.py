import re

with open("src/app/page.tsx", "r") as f:
    page_content = f.read()

correct_css = """.hero-photo-wrapper {
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
          }"""

# Insert inside the media query safely
page_content = page_content.replace(
"""          .hero-text-container {
            z-index: 1 !important;
            position: relative;
            padding-top: 1rem;
          }""",
"""          .hero-text-container {
            z-index: 1 !important;
            position: relative;
            padding-top: 1rem;
          }
          """ + correct_css
)

with open("src/app/page.tsx", "w") as f:
    f.write(page_content)

print("Restored.")
