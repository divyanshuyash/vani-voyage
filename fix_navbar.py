import re

with open("src/components/Navbar.tsx", "r") as f:
    nav = f.read()

# Fix the duplicate style display: flex
nav = nav.replace('display: "flex",\n            display: "flex",', 'display: "flex",')

# Ensure space between w-full and flex
nav = nav.replace('className="w-full justify-between items-center', 'className="w-full flex justify-between items-center')

with open("src/components/Navbar.tsx", "w") as f:
    f.write(nav)

with open("src/app/globals.css", "r") as f:
    css = f.read()

if "html, body {" not in css:
    css = "html, body {\n  overflow-x: hidden !important;\n  width: 100vw !important;\n  max-width: 100vw !important;\n  position: relative;\n}\n\n" + css

with open("src/app/globals.css", "w") as f:
    f.write(css)

print("Navbar and global body fixes applied.")
