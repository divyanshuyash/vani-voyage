import re

with open("src/app/globals.css", "r") as f:
    css = f.read()

if ".site-content {" not in css:
    css += "\n\n.site-content {\n  overflow-x: hidden;\n  width: 100%;\n  position: relative;\n}\n"
else:
    css = re.sub(r"(\.site-content\s*\{[^}]*)(\})", r"\1  overflow-x: hidden;\n  width: 100%;\n\2", css)

with open("src/app/globals.css", "w") as f:
    f.write(css)


with open("src/components/Navbar.tsx", "r") as f:
    nav = f.read()

# Add Menu, X icons to lucide-react import
if "import { Menu, X } from" not in nav:
    nav = nav.replace('import { motion } from "framer-motion";', 'import { motion, AnimatePresence } from "framer-motion";\nimport { Menu, X } from "lucide-react";')

# Add isOpen state
if "const [isOpen, setIsOpen] = useState(false);" not in nav:
    nav = nav.replace('const [scrolled, setScrolled] = useState(false);', 'const [scrolled, setScrolled] = useState(false);\n  const [isOpen, setIsOpen] = useState(false);')

# Replace the links div with mobile friendly logic
old_links_start = """{/* Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.2rem, 1vw, 1.2rem)" }}>"""

new_links = """{/* Desktop Nav Links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "clamp(0.2rem, 1vw, 1.2rem)" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    transition: "color 0.3s, background 0.3s, transform 0.3s",
                    position: "relative",
                    padding: "clamp(0.3rem, 1.5vw, 0.45rem) clamp(0.5rem, 2vw, 0.8rem)",
                    borderRadius: 999,
                    background: isActive ? "var(--accent-soft)" : "transparent",
                    display: "inline-flex",
                    alignItems: "center",
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                         position: "absolute",
                         bottom: 3,
                         left: 0,
                         right: 0,
                         height: 2,
                         background: "var(--accent)",
                         borderRadius: 1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center"
            style={{ width: 44, height: 44, background: "transparent", border: "none", color: "var(--text)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{
              position: "fixed",
              top: 72,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(245, 240, 232, 0.98)",
              borderBottom: "1px solid rgba(217, 210, 199, 0.45)",
              boxShadow: "0 10px 24px rgba(26, 22, 18, 0.08)",
              backdropFilter: "blur(10px)",
              padding: "1rem clamp(12px, 3vw, 64px)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "1rem",
                    color: isActive ? "var(--text)" : "var(--muted)",
                    padding: "0.8rem 1rem",
                    borderRadius: 8,
                    background: isActive ? "var(--accent-soft)" : "transparent",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>"""

# Using regex to replace the old links div with the new Desktop/Mobile logic
# We need to replace everything from `          <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.2rem, 1vw, 1.2rem)" }}>`
# strictly up to the closing tags ending `Navbar.tsx`!
nav = re.sub(r'\{\/\* Nav Links \*\/\}.+', new_links + '\n    </>\n  );\n}', nav, flags=re.DOTALL)

with open("src/components/Navbar.tsx", "w") as f:
    f.write(nav)


with open("src/app/page.tsx", "r") as f:
    page = f.read()

# Make hero container strict about overflow and padding responsive logic
page = page.replace(
    'className="max-w hero-mobile-pad"',
    'className="max-w hero-mobile-pad overflow-x-hidden w-full"'
)
# Ensure the image uses strictly safe responsive classes and removes hard pixel constraints that might exceed 100vw
page = page.replace(
    'width: "min(100%, 500px)"',
    'width: "100%", maxWidth: 500'
)

# Text and badge padding: user mentioned adding px-4 on mobile and md:px-12 on larger screens.
# Since padding is currently clamp(20px, 6vw, 100px), we can update it:
page = page.replace('padding: "clamp(1.5rem, 4vw, 3rem) clamp(20px, 6vw, 100px)",', 'padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 5vw, 4rem)", paddingLeft: "max(16px, clamp(1rem, 5vw, 4rem))", paddingRight: "max(16px, clamp(1rem, 5vw, 4rem))", overflowX: "hidden",')

with open("src/app/page.tsx", "w") as f:
    f.write(page)

print("Navbar and Layout Responsive fixes strictly applied.")
