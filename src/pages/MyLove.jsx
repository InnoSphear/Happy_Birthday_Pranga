import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Play, Pause, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { Howl } from "howler";
import { myLoveMedia, quotes, audios } from "../data/assets";

function MotionMedia({ src, className, ...props }) {
    const isVideo = src.endsWith('.mp4');
    return isVideo ? (
        <motion.video src={src} className={className} autoPlay loop muted playsInline {...props} />
    ) : (
        <motion.img src={src} className={className} loading="lazy" {...props} />
    );
}

export default function MyLove() {
  const navigate = useNavigate();
  // We use actual Math.random or sequential. We will keep sequential but start at a random index to feel unique.
  const [currentIdx, setCurrentIdx] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundTrack, setSoundTrack] = useState(null);

  const soundRef = useRef(null);

  useEffect(() => {
    // Start at a random image to ensure variety every visit
    setCurrentIdx(Math.floor(Math.random() * myLoveMedia.length));

    if (!soundRef.current) {
        soundRef.current = new Howl({
          src: [audios.emotional],
          loop: true,
          volume: 0.6,
          html5: true,
          onloaderror: (id, err) => console.log('Audio load error:', err),
          onplayerror: (id, err) => {
            soundRef.current.once('unlock', () => {
              soundRef.current.play();
            });
          }
        });
        setSoundTrack(soundRef.current);
    }
    
    soundRef.current.play();

    // Loop through sequentially every 7 seconds
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % myLoveMedia.length);
    }, 7000);

    return () => {
      if (soundRef.current) {
          soundRef.current.stop();
          soundRef.current.unload();
          soundRef.current = null;
      }
      clearInterval(interval);
    };
  }, []);

  const toggleAudio = () => {
    if (soundTrack) {
        if (isPlaying) {
            soundTrack.pause();
        } else {
            soundTrack.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % myLoveMedia.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + myLoveMedia.length) % myLoveMedia.length);
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * myLoveMedia.length);
    setCurrentIdx(randomIdx);
  };

  const quote = quotes[currentIdx % quotes.length];
  const mediaSrc = myLoveMedia[currentIdx];

  return (
    <div className="relative w-full h-screen bg-[#050000] overflow-hidden flex flex-col font-sans">
      
      {/* Background elegant crossfade transition */}
      <AnimatePresence initial={false}>
        <MotionMedia 
            key={`${currentIdx}-bg`}
            src={mediaSrc}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover filter blur-[8px] saturate-[0.8] z-0"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#340b0b]/60 to-[#000000]/90 z-0 pointer-events-none"></div>

      {/* Giant "Happy Birthday Pranga" ambient text in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden mix-blend-color-dodge opacity-[0.08]">
         <h1 className="text-[12vw] font-cinzel leading-none text-center text-white whitespace-nowrap">
            HAPPY BIRTHDAY<br/>PRANGA
         </h1>
      </div>

      {/* Header Controls */}
      <header className="absolute top-0 w-full flex justify-between items-center p-4 md:p-8 z-30">
        <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-[#ff4b4b] font-cinzel hover:text-white transition-colors group text-sm md:text-base border border-transparent hover:border-[#ff4b4b]/50 rounded-full px-3 py-1 md:px-4 md:py-2 backdrop-blur-sm"
        >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        <div className="flex items-center gap-2 md:gap-3">
            <button onClick={handlePrev} className="w-10 h-10 rounded-full glass border-[#ff4b4b]/40 text-[#ff4b4b] flex items-center justify-center hover:bg-[#ff4b4b]/20 transition shadow-[0_0_20px_rgba(255,75,75,0.2)] backdrop-blur-md" aria-label="Previous memory">
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={handleNext} className="w-10 h-10 rounded-full glass border-[#ff4b4b]/40 text-[#ff4b4b] flex items-center justify-center hover:bg-[#ff4b4b]/20 transition shadow-[0_0_20px_rgba(255,75,75,0.2)] backdrop-blur-md" aria-label="Next memory">
                <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={handleShuffle} className="w-10 h-10 rounded-full glass border-[#ff4b4b]/40 text-[#ff4b4b] flex items-center justify-center hover:bg-[#ff4b4b]/20 transition shadow-[0_0_20px_rgba(255,75,75,0.2)] backdrop-blur-md" aria-label="Shuffle memory">
                <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={toggleAudio} className="w-12 h-12 rounded-full glass border-[#ff4b4b]/40 text-[#ff4b4b] flex items-center justify-center hover:bg-[#ff4b4b]/20 transition shadow-[0_0_20px_rgba(255,75,75,0.3)] backdrop-blur-md" aria-label="Toggle music">
                {isPlaying ? <Pause className="w-5 h-5" fill="currentColor"/> : <Play className="w-5 h-5" fill="currentColor"/>}
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-20 w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 p-6 md:p-12 pt-24 pb-12 overflow-y-auto overflow-x-hidden md:overflow-hidden mix-blend-lighten">
        
        {/* Majestic 3D Floating Polaroid */}
        <div className="w-full md:w-1/2 flex justify-center perspective-1000 order-2 md:order-1 shrink-0 mt-4 md:mt-0">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${currentIdx}-img`}
                    initial={{ opacity: 0, rotateY: 20, rotateX: 10, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, rotateY: 0, rotateX: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: -20, rotateX: -10, y: -30, scale: 0.9 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="relative w-[320px] h-[450px] sm:w-[450px] sm:h-[600px] md:w-[480px] md:h-[650px] rounded-lg overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,1)] hover:shadow-[0_20px_70px_rgba(255,75,75,0.4)] transition-shadow duration-1000 group preserve-3d bg-white p-3 sm:p-4 pb-16 sm:pb-24" // Polaroid styling
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#900000]/10 to-transparent z-10 pointer-events-none transition-opacity duration-1000"></div>
                    
                    <div className="w-full h-full relative overflow-hidden rounded-[4px] bg-black">
                        <MotionMedia 
                            src={mediaSrc} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[15s] ease-out brightness-95 contrast-110" 
                        />
                    </div>
                    
                    {/* Polaroid Text & Border magic */}
                    <div className="absolute bottom-4 sm:bottom-6 left-0 w-full text-center z-20 pointer-events-none">
                        <p className="font-serif italic text-[#333333] text-lg sm:text-2xl tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                            Happy Birthday Pranga
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Emotional Typography Display */}
        <div className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-10 order-1 md:order-2">
            
            <div className="relative">
                <Heart className="w-10 h-10 md:w-16 md:h-16 text-[#ff4b4b] drop-shadow-[0_0_25px_rgba(255,75,75,1)] animate-pulse" fill="none"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-4 h-4 md:w-8 md:h-8 text-white opacity-80" fill="currentColor"/>
                </div>
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${currentIdx}-quote`}
                    initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                    transition={{ duration: 1.4, delay: 0.4 }}
                    className="flex flex-col gap-4 cursor-pointer select-none"
                    onClick={handleShuffle}
                >
                    <p 
                        className="font-serif italic text-2xl md:text-4xl lg:text-5xl leading-tight text-[#ffebcd] font-light max-w-[95%] md:max-w-xl mx-auto md:mx-0 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]"
                    >
                        "{quote}"
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#ffb3b3] opacity-80">
                        Tap the quote for a new wish
                    </p>
                    <p className="text-[#ff4b4b] uppercase tracking-[0.3em] text-xs font-bold mt-2">
                        Happy Birthday Pranga - Love Always
                    </p>
                </motion.div>
            </AnimatePresence>

            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "150px" }}
                transition={{ duration: 2, delay: 1 }}
                className="h-[2px] bg-gradient-to-r from-[#ff4b4b] via-[#ffb3b3] to-transparent mt-2 mx-auto md:mx-0"
            ></motion.div>
        </div>

      </main>

    </div>
  );
}
