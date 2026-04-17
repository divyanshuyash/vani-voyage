with open("src/components/VideoCarousel.tsx", "r") as f:
    content = f.read()

# Replace the video and overlays
new_video_section = """
                <video
                  ref={videoRef}
                  src={currentVideo.src}
                  className="w-full h-full object-cover rounded-[var(--radius-sm)]"
                  playsInline
                  controls={isPlaying}
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  style={{ background: "#000" }}
                />

                {/* Overlays (Hidden when playing) */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col justify-between rounded-[var(--radius-sm)]"
                      style={{ background: "linear-gradient(to bottom, rgba(26,22,18,0.1) 0%, rgba(26,22,18,0.7) 100%)" }}
                      onClick={togglePlay}
                    >
                      <div className="flex-1 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
                          style={{
                            background: "rgba(245, 240, 232, 0.9)",
                            backdropFilter: "blur(8px)",
                            boxShadow: "0 8px 32px rgba(193,123,60,0.3)"
                          }}
                        >
                          <Play size={32} fill="var(--accent)" color="var(--accent)" className="ml-1" />
                        </motion.div>
                      </div>
                      
                      {/* Caption Overlay */}
                      <div className="p-4 md:p-6 w-full">
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
                        }}>
                          {currentVideo.caption}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
"""

import re
content = re.sub(r'<video[\s\S]*?</AnimatePresence>', new_video_section.strip(), content)

# Now fix the framing wrapper to be perfectly symmetrical reel size
# Replace "w-full max-w-[800px] mx-auto py-8"
content = content.replace('className="w-full max-w-[800px] mx-auto py-8"', 'className="w-full max-w-[900px] mx-auto py-4 md:py-8"')

# Replace the inner structural container
old_inner = """      {/* Video Display Container */}
      <div className="relative flex items-center justify-center">
        
        {/* Left Arrow Button */}
        <button
          onClick={prevVideo}
          aria-label="Previous Video"
          className="absolute left-0 lg:-left-16 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--surface)] text-[var(--secondary)] hover:scale-105 active:scale-95 transition-transform"
"""

new_inner = """      {/* Video Display Container */}
      <div className="relative flex items-center justify-center w-full gap-4 md:gap-12">
        
        {/* Left Arrow Button */}
        <button
          onClick={prevVideo}
          aria-label="Previous Video"
          className="hidden md:flex z-10 w-12 h-12 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text)] hover:scale-105 active:scale-95 transition-transform shrink-0"
"""
content = content.replace(old_inner, new_inner)

# Fix right arrow button wrapper
old_right = """        {/* Right Arrow Button */}
        <button
          onClick={nextVideo}
          aria-label="Next Video"
          className="absolute right-0 lg:-right-16 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--surface)] text-[var(--secondary)] hover:scale-105 active:scale-95 transition-transform"
"""
new_right = """        {/* Right Arrow Button */}
        <button
          onClick={nextVideo}
          aria-label="Next Video"
          className="hidden md:flex z-10 w-12 h-12 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text)] hover:scale-105 active:scale-95 transition-transform shrink-0"
"""
content = content.replace(old_right, new_right)

# Change the aspect ratio and frame width
old_frame = 'className="relative w-full aspect-[9/16] sm:aspect-[4/5] md:aspect-video rounded-[var(--radius-sm)] overflow-hidden"'
new_frame = 'className="relative w-full max-w-[320px] md:max-w-[360px] aspect-[9/16] rounded-[var(--radius-sm)] overflow-hidden mx-auto"'
content = content.replace(old_frame, new_frame)

# Clean up click target which is no longer needed
click_target = """                {/* Click target when playing to pause */}
                {isPlaying && (
                  <div className="absolute inset-0 cursor-pointer" onClick={togglePlay} />
                )}"""
content = content.replace(click_target, "")

with open("src/components/VideoCarousel.tsx", "w") as f:
    f.write(content)
