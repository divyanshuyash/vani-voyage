import re

with open("src/app/page.tsx", "r") as f:
    page_content = f.read()

# Make sure we add back the one we want. wait, I used sed to delete all of them! I should probably just replace it properly.
