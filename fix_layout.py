with open("src/app/layout.tsx", "r") as f:
    layout = f.read()

layout = layout.replace(
    '<html lang="en" className="overflow-x-hidden w-full max-w-[100vw]" className={`${notoSerif.variable} ${manrope.variable}`}>',
    '<html lang="en" className={`overflow-x-hidden w-full max-w-[100vw] ${notoSerif.variable} ${manrope.variable}`}>'
)

with open("src/app/layout.tsx", "w") as f:
    f.write(layout)
