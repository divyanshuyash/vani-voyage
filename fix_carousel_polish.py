with open("src/components/VideoCarousel.tsx", "r") as f:
    content = f.read()

# 1. Update Video Interface and Data
import re

interface_old = """interface TestimonialVideo {
  id: number;
  src: string;
  caption: string;
}

const videos: TestimonialVideo[] = [
  { id: 1, src: "/videos/testimonial-1.mp4", caption: "WATCH: Realizing true speaking potential" },
  { id: 2, src: "/videos/testimonial-2.mp4", caption: "WATCH: Executive clarity and confidence" },
  { id: 3, src: "/videos/testimonial-3.mp4", caption: "WATCH: Overcoming public speaking roadblocks" },
  { id: 4, src: "/videos/testimonial-4.mp4", caption: "WATCH: Corporate communication mastery" },
];"""

interface_new = """interface TestimonialVideo {
  id: number;
  src: string;
  caption: string;
  objectPos?: string;
}

const videos: TestimonialVideo[] = [
  { id: 1, src: "/videos/testimonial-1.mp4", caption: "WATCH: Realizing true speaking potential" },
  { id: 2, src: "/videos/testimonial-2.mp4", caption: "WATCH: Executive clarity and confidence", objectPos: "50% 15%" },
  { id: 3, src: "/videos/testimonial-3.mp4", caption: "WATCH: Overcoming public speaking roadblocks" },
  { id: 4, src: "/videos/testimonial-4.mp4", caption: "WATCH: Corporate communication mastery" },
];"""

content = content.replace(interface_old, interface_new)

# 2. Update Video element to use objectPos
video_old = """                  className="w-full h-full object-cover rounded-[var(--radius-sm)]"
                  playsInline
                  controls={isPlaying}
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  style={{ background: "#000" }}"""

video_new = """                  className="w-full h-full object-cover rounded-[var(--radius-sm)]"
                  playsInline
                  controls={isPlaying}
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  style={{ background: "#000", objectPosition: currentVideo.objectPos || "50% 50%" }}"""

content = content.replace(video_old, video_new)

# 3. Add Ambient Glow and Decorative elements behind the video container
# Look for: <div className="relative w-full max-w-[1040px] aspect-video rounded-[var(--radius-sm)] overflow-hidden mx-auto"
frame_old = """        {/* Framing and Swipe Container */}
        <div className="relative w-full overflow-hidden" style={{ borderRadius: "var(--radius)", padding: "4px" }}>
          <div className="relative w-full max-w-[1040px] aspect-video rounded-[var(--radius-sm)] overflow-hidden mx-auto"
               style={{ 
                 background: "var(--surface-2)",
                 border: "2px solid rgba(193,123,60,0.3)", /* Subtle gold/bronze border */
                 boxShadow: "0 12px 32px rgba(26,22,18,0.15)"
               }}
          >"""

frame_new = """        {/* Ambient Overlay Behind Frame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-[110%] rounded-[100px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(193,123,60,0.4) 0%, rgba(245,240,232,0) 70%)", filter: "blur(60px)", zIndex: 0 }} />

        {/* Framing and Swipe Container */}
        <div className="relative w-full z-10" style={{ borderRadius: "var(--radius)", padding: "4px" }}>
          <div className="relative w-full max-w-[1040px] aspect-video rounded-2xl overflow-hidden mx-auto"
               style={{ 
                 background: "var(--surface-2)",
                 border: "2px solid rgba(193,123,60,0.4)",
                 boxShadow: "0 24px 64px rgba(193,123,60,0.12), 0 8px 16px rgba(26,22,18,0.08)"
               }}
          >"""

content = content.replace(frame_old, frame_new)

# Add sliding animation to the caption overlay
caption_old = """                      <div className="p-4 md:p-6 w-full">
                        <span className="block w-full text-center" style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                          fontSize: "clamp(0.85rem, 2vw, 1rem)",
                          color: "white",
                          padding: "0.8rem 1rem",
                          background: "rgba(26,22,18,0.65)",
                          backdropFilter: "blur(12px)",
                          borderRadius: 8,
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}>"""

caption_new = """                      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="px-4 md:px-8 pb-6 md:pb-8 w-full flex justify-center">
                        <span className="inline-block text-center shadow-2xl" style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                          fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
                          color: "white",
                          padding: "0.85rem 1.8rem",
                          background: "rgba(26,22,18,0.65)",
                          backdropFilter: "blur(16px)",
                          borderRadius: 999,
                          border: "1px solid rgba(255,255,255,0.15)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
                        }}>"""

caption_close_old = """                          {currentVideo.caption}
                        </span>
                      </div>"""
caption_close_new = """                          {currentVideo.caption}
                        </span>
                      </motion.div>"""

content = content.replace(caption_old, caption_new)
content = content.replace(caption_close_old, caption_close_new)


with open("src/components/VideoCarousel.tsx", "w") as f:
    f.write(content)
