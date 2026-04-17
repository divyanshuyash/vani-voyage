"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Quote, Star, Sparkles } from "lucide-react";

interface TestimonialVideo {
  id: number;
  src: string;
  caption: string;
  role: string;
  objectPos?: string;
  author: string;
}

const videos: TestimonialVideo[] = [
  { id: 1, src: "/videos/testimonial-1.mp4", caption: "Realizing my true speaking potential.", role: "Senior Director", author: "Sarah J." },
  { id: 2, src: "/videos/testimonial-2.mp4", caption: "Executive clarity and unwavering confidence.", role: "Corporate Lead", objectPos: "50% 15%", author: "David M." },
  { id: 3, src: "/videos/testimonial-3.mp4", caption: "Overcoming public speaking roadblocks completely.", role: "Startup Founder", author: "Elena R." },
  { id: 4, src: "/videos/testimonial-4.mp4", caption: "Mastery in daily corporate communication.", role: "Tech Executive", author: "James T." },
];

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    // Force natively pause all video elements in the carousel
    videos.forEach((_, i) => {
      const vid = document.getElementById(`video-${i}`) as HTMLVideoElement;
      if (vid) {
        vid.pause();
      }
    });
  }, [currentIndex]);

  const togglePlay = () => {
    const vid = document.getElementById(`video-${currentIndex}`) as HTMLVideoElement;
    if (vid) {
      if (isPlaying) {
        vid.pause();
      } else {
        vid.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleDragEnd = (e: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevVideo();
    } else if (info.offset.x < -swipeThreshold) {
      nextVideo();
    }
  };

  // Determine the state of a card relative to the active index
  const getCardProps = (index: number) => {
    const total = videos.length;
    let difference = index - currentIndex;
    
    // Wrap around logic for infinite loop effect
    if (difference < -1) difference += total;
    if (difference > 1) difference -= total;
    
    if (difference === 0) {
      return { 
        x: "0%", scale: 1, zIndex: 10, opacity: 1, rotateY: 0, 
        brightness: 1, blur: 0 
      };
    } else if (difference === 1) {
      return { 
        x: "55%", scale: 0.85, zIndex: 5, opacity: 0.6, rotateY: -15, 
        brightness: 0.4, blur: 4 
      };
    } else if (difference === -1) {
      return { 
        x: "-55%", scale: 0.85, zIndex: 5, opacity: 0.6, rotateY: 15, 
        brightness: 0.4, blur: 4 
      };
    } else {
      // Hidden behind
      return { 
        x: "0%", scale: 0.7, zIndex: 1, opacity: 0, rotateY: 0, 
        brightness: 0, blur: 10 
      };
    }
  };

  const activeVideo = videos[currentIndex];

  return (
    <div className="w-full relative mx-auto py-16 md:py-32 overflow-hidden flex flex-col items-center justify-center">
      
      {/* ═════════════════════════════════════════════════
          AMBIENT APPLE-STYLE GLOW
          ═════════════════════════════════════════════════ */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] rounded-full pointer-events-none mix-blend-multiply"
        style={{ background: "radial-gradient(circle, rgba(193,123,60,0.3) 0%, rgba(245,240,232,0) 70%)", filter: "blur(80px)", zIndex: 0 }}
      />
      
      {/* ═════════════════════════════════════════════════
          3D COVERFLOW TRAY
          ═════════════════════════════════════════════════ */}
      <div 
         className="relative w-full max-w-[1040px] aspect-[4/5] sm:aspect-video flex items-center justify-center z-10 perspective-[1800px]"
      >
        {videos.map((video, index) => {
          const props = getCardProps(index);
          const isActive = index === currentIndex;
          
          return (
            <motion.div
              key={video.id}
              initial={false}
              animate={{
                x: props.x,
                scale: props.scale,
                zIndex: props.zIndex,
                opacity: props.opacity,
                rotateY: props.rotateY,
                filter: `brightness(${props.brightness}) blur(${props.blur}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
                mass: 0.8
              }}
              className={`absolute top-0 left-0 right-0 bottom-0 mx-auto w-[85%] sm:w-[60%] md:w-[70%] max-w-[800px] rounded-[32px] overflow-hidden shadow-2xl ${isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}`}
              style={{
                boxShadow: isActive ? "0 40px 80px -20px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)" : "0 10px 30px rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "black",
              }}
              onClick={() => {
                if (!isActive) setCurrentIndex(index);
              }}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={handleDragEnd}
            >
              <video
                id={`video-${index}`}
                src={video.src}
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{ 
                  objectPosition: video.objectPos || "50% 50%", 
                  transform: isActive ? "scale(1)" : "scale(1.1)" 
                }}
                playsInline
                controls={isActive && isPlaying}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />

              {/* OVERLAY for active video */}
              <AnimatePresence>
                {isActive && !isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-[2px]"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                    onClick={togglePlay}
                  >
                     {/* Premium Hover Play Button */}
                     <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-24 h-24 rounded-full flex justify-center items-center backdrop-blur-md relative overflow-hidden group"
                        style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
                     >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <Play size={40} fill="white" color="white" className="ml-2 drop-shadow-md" />
                     </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </motion.div>
          );
        })}
      </div>

      {/* ═════════════════════════════════════════════════
          STARK APPLE-STYLE SYNCHRONIZED CAPTIONS
          ═════════════════════════════════════════════════ */}
      <div className="mt-12 md:mt-20 flex w-full max-w-[900px] flex-col md:flex-row items-center md:items-end justify-between px-6 z-20 gap-8 h-[120px]">
         
         <div className="flex-1 flex flex-col text-center md:text-left h-full justify-center">
           <Quote size={32} className="text-[var(--accent)] opacity-40 mb-2 mx-auto md:mx-0" />
           <AnimatePresence mode="wait">
             <motion.h3
                key={activeVideo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-display font-semibold leading-tight text-[var(--text)] tracking-tight"
                style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)" }}
             >
               &ldquo;{activeVideo.caption}&rdquo;
             </motion.h3>
           </AnimatePresence>
           
           <AnimatePresence mode="wait">
             <motion.div
                key={activeVideo.id + 'sub'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mt-6"
             >
                <div className="flex items-center gap-1 text-[var(--accent)]" style={{ filter: 'drop-shadow(0 2px 4px rgba(193,123,60,0.2))' }}>
                   {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <div className="h-5 w-px bg-[var(--border)] opacity-60" />
                <div className="flex items-center gap-1.5">
                   <Sparkles size={16} className="text-[var(--accent)]" />
                   <span className="font-body text-[var(--text-dim)] font-bold uppercase tracking-widest text-[0.65rem] md:text-xs">
                     Verified Growth Journey
                   </span>
                </div>
             </motion.div>
           </AnimatePresence>
         </div>

         {/* Elite Symmetrical Navigation Panel */}
         <div className="flex items-center gap-4 shrink-0 h-full flex-col justify-center">
            <div className="flex items-center gap-4">
              <button
                onClick={prevVideo}
                aria-label="Previous"
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all bg-white hover:bg-[var(--accent)] hover:text-white border border-[var(--border)] shadow-sm hover:shadow-xl active:scale-95 text-[var(--text)]"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextVideo}
                aria-label="Next"
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all bg-[var(--text)] text-white hover:bg-[var(--accent)] shadow-xl active:scale-95"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="flex gap-2.5 mt-2">
              {videos.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? 24 : 8,
                    height: 8,
                    background: i === currentIndex ? "var(--text)" : "var(--border)"
                  }}
                />
              ))}
            </div>
         </div>
         
      </div>

    </div>
  );
}
