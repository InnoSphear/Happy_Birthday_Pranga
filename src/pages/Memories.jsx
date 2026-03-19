import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Heart, ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryMedia, quotes } from "../data/assets";
import { motion, AnimatePresence } from "framer-motion";

function MediaItem({ src }) {
    const isVideo = src.endsWith('.mp4');
    const className = "w-full object-cover rounded-xl filter brightness-[0.8] saturate-[0.85] group-hover:saturate-125 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700 ease-out";
    
    return isVideo ? (
        <video src={src} className={className} autoPlay loop muted playsInline />
    ) : (
        <img src={src} alt="Memory" className={className} loading="lazy" />
    );
}

export default function Memories() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const openItem = (index) => setActiveIndex(index);
  const closeItem = () => setActiveIndex(null);
  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev + 1) % galleryMedia.length);
  };
  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev - 1 + galleryMedia.length) % galleryMedia.length);
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % galleryMedia.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + galleryMedia.length) % galleryMedia.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const activeSrc = activeIndex !== null ? galleryMedia[activeIndex] : null;
  const activeQuote = activeIndex !== null ? quotes[activeIndex % quotes.length] : "";

  return (
    <div className="relative w-full min-h-screen bg-[#050301] flex flex-col items-center">
      
      {/* Royal Palace & Magic Ambient Background for Gallery */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 sepia-[0.3]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590766940554-638c116c2763?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      <div className="fixed inset-0 bg-gradient-to-br from-[#090501]/90 via-[#1f1104]/80 to-[#090501]/95 pointer-events-none"></div>

      <header className="w-full flex justify-between items-center p-4 md:p-8 z-20 sticky top-0 bg-[#090501]/70 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-1 md:gap-2 text-[#d4af37] font-cinzel hover:text-white transition-colors group text-sm md:text-base border border-transparent hover:border-[#d4af37]/50 rounded-full px-3 py-1 md:px-4 md:py-2"
        >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" /> 
            <span className="hidden sm:inline">Back</span>
        </button>
        
        <div className="flex-1 flex flex-col items-center">
            <h1 className="text-xl md:text-3xl font-cinzel tracking-widest text-[#d4af37] text-center flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                <Sparkles className="w-5 h-5 text-[#ff4b4b]" />
                The Memories Vault
                <Sparkles className="w-5 h-5 text-[#ff4b4b]" />
            </h1>
            <p className="text-[#ffb3b3] font-serif italic text-xs md:text-sm tracking-widest mt-1">Happy Birthday Pranga</p>
        </div>
        
        <div className="w-6 md:w-16"></div> {/* Spacer to keep center alignment perfect */}
      </header>

      {/* Happy Birthday Floating Watermark */}
      <div className="fixed bottom-10 right-10 z-0 pointer-events-none opacity-[0.03] select-none rotate-[-10deg]">
        <h2 className="text-6xl md:text-8xl font-cinzel text-white leading-none tracking-tighter">
            HAPPY<br/>BIRTHDAY<br/>PRANGA
        </h2>
      </div>

      <main className="w-full max-w-[1600px] px-3 md:px-12 py-8 md:py-16 z-10 columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-8 space-y-4 md:space-y-8">
        {galleryMedia.map((src, index) => (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             whileInView={{ opacity: 1, scale: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, delay: (index % 5) * 0.1 }}
             key={index} 
             className="relative break-inside-avoid rounded-2xl p-1 bg-gradient-to-b from-[#d4af37]/40 to-[#d4af37]/5 group hover:from-[#d4af37] hover:to-[#ffb3b3] transition-all duration-700 cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.3)]"
             onClick={() => openItem(index)}
           >
              <div className="relative overflow-hidden rounded-xl bg-black">
                  <MediaItem src={src} />
                  
                  {/* Glassmorphic Overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#341d08]/90 via-[#341d08]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 pointer-events-none">
                     <Heart className="w-6 h-6 text-[#ff4b4b] mb-2 drop-shadow-[0_0_8px_rgba(255,75,75,1)]" fill="currentColor"/>
                     <p className="font-serif italic text-xs md:text-sm text-[#fffbe0] drop-shadow-md">
                        "{quotes[index % quotes.length]}"
                     </p>
                  </div>
              </div>
           </motion.div>
        ))}
      </main>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.button
              aria-label="Close"
              onClick={closeItem}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 w-[92%] max-w-5xl bg-[#0b0702] border border-[#d4af37]/40 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-[#ffb3b3]/10 pointer-events-none"></div>

              <div className="relative flex flex-col lg:flex-row gap-0">
                <div className="relative w-full lg:w-3/5 bg-black">
                  {activeSrc && activeSrc.endsWith(".mp4") ? (
                    <video src={activeSrc} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={activeSrc} alt="Memory" className="w-full h-full object-cover" />
                  )}
                </div>

                <div className="relative w-full lg:w-2/5 p-6 md:p-10 flex flex-col justify-center gap-4">
                  <p className="text-[#d4af37] uppercase tracking-[0.35em] text-xs font-cinzel">
                    The Vault
                  </p>
                  <p className="font-serif italic text-[#fff1c1] text-xl md:text-2xl leading-relaxed">
                    "{activeQuote}"
                  </p>
                  <p className="text-[#ffb3b3] text-xs uppercase tracking-[0.3em]">
                    Happy Birthday Pranga
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button onClick={closeItem} className="w-10 h-10 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/20 transition" aria-label="Close modal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute inset-y-0 left-2 flex items-center">
                <button onClick={showPrev} className="w-10 h-10 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/20 transition" aria-label="Previous">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button onClick={showNext} className="w-10 h-10 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/20 transition" aria-label="Next">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
