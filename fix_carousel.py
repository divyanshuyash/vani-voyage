with open("src/components/VideoCarousel.tsx", "r") as f:
    content = f.read()

# 1. Fix the width constraint
# Change from max-w-[320px] md:max-w-[360px] aspect-[9/16] to a full page aspect-video cover!
old_frame = 'className="relative w-full max-w-[320px] md:max-w-[360px] aspect-[9/16] rounded-[var(--radius-sm)] overflow-hidden mx-auto"'
new_frame = 'className="relative w-full max-w-[900px] aspect-video rounded-[var(--radius-sm)] overflow-hidden mx-auto"'
content = content.replace(old_frame, new_frame)

# 2. Fix the Video Ref bug
# Remove global videoRef logic
import re
content = re.sub(r'  const videoRef = useRef<HTMLVideoElement>\(null\);\n', '', content)

# Remove the useEffect that touches videoRef
old_effect = """  // Restart video playback config when index changes
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex]);"""
new_effect = """  // Restart play state when index changes
  useEffect(() => {
    setIsPlaying(false);
  }, [currentIndex]);"""
content = content.replace(old_effect, new_effect)

# Remove togglePlay global function
old_toggle = """  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };"""
content = content.replace(old_toggle, "")

# Modify the video and play button to work without global ref
old_video_section = """                <video
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
                    >"""
                    
new_video_section = """                <video
                  id={`video-${currentIndex}`}
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
                      className="absolute inset-0 flex flex-col justify-between rounded-[var(--radius-sm)] cursor-pointer"
                      style={{ background: "linear-gradient(to bottom, rgba(26,22,18,0.1) 0%, rgba(26,22,18,0.7) 100%)" }}
                      onClick={(e) => {
                        const vid = document.getElementById(`video-${currentIndex}`) as HTMLVideoElement;
                        if (vid) {
                          vid.play();
                          setIsPlaying(true);
                        }
                      }}
                    >"""

content = content.replace(old_video_section, new_video_section)

# Allow arrow gaps to shrink on smaller devices if needed. 
content = content.replace('w-full max-w-[900px] mx-auto py-4 md:py-8"', 'w-full max-w-[1040px] mx-auto py-4 md:py-8"')
content = content.replace('flex items-center justify-center w-full gap-4 md:gap-12', 'flex items-center justify-center w-full gap-2 lg:gap-8')

with open("src/components/VideoCarousel.tsx", "w") as f:
    f.write(content)
