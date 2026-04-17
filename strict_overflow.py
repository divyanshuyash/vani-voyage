import re

with open("src/app/layout.tsx", "r") as f:
    layout = f.read()

layout = layout.replace('<html lang="en"', '<html lang="en" className="overflow-x-hidden w-full max-w-[100vw]"')
layout = layout.replace('<body>', '<body className="overflow-x-hidden w-full max-w-[100vw]">')

with open("src/app/layout.tsx", "w") as f:
    f.write(layout)


with open("src/app/page.tsx", "r") as f:
    page = f.read()

# Fix the pill container overflowing
page = page.replace(
'''                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",''',
'''                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  maxWidth: "100%",
                  flexWrap: "wrap",'''
)

# And make the Navbar strictly aligned
with open("src/components/Navbar.tsx", "r") as f:
    nav = f.read()

nav = nav.replace(
'''          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1040,
            margin: "0 auto",
            paddingLeft: "clamp(12px, 3vw, 64px)",
            paddingRight: "clamp(12px, 3vw, 64px)",''',
'''          pointerEvents: "none",
        }}
      >
        <div
          className="w-full justify-between items-center px-4 md:px-12 max-w-[1040px] mx-auto"
          style={{
            display: "flex",'''
)

# wait I should be careful not to break the structure.
# Currently Navbar.tsx has:
#         <div
#           style={{
#             width: "100%",
#             maxWidth: 1040,
#             margin: "0 auto",
#             paddingLeft: "clamp(12px, 3vw, 64px)",
#             paddingRight: "clamp(12px, 3vw, 64px)",
#             display: "flex",

nav = re.sub(
    r'width: "100%",\s*maxWidth: 1040,\s*margin: "0 auto",\s*paddingLeft: "clamp\(12px, 3vw, 64px\)",\s*paddingRight: "clamp\(12px, 3vw, 64px\)",',
    'maxWidth: 1040,\n            margin: "0 auto",',
    nav
)

# adding classes directly to the inner div
nav = re.sub(
    r'<div\n\s*style=\{\{',
    '<div\n          className="w-full flex justify-between items-center px-4 md:px-12"\n          style={{',
    nav
)

with open("src/components/Navbar.tsx", "w") as f:
    f.write(nav)

print("Applied strict bounding.")
