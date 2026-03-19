import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Heart, Crown, Quote } from 'lucide-react';
import { Howl } from 'howler';
import { audios, quotes } from '../data/assets';

// Simple Floating Particles for elegant 2D effect
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#d4af37] rounded-full shadow-[0_0_10px_rgba(212,175,55,1)]"
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: -100,
            x: `calc(${Math.random() * 100}vw)`,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default function Home({ isAuthenticated }) {
  const navigate = useNavigate();
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishQuote, setWishQuote] = useState('');
  const [showBurst, setShowBurst] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const soundRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/');
        return;
    }

    if (!soundRef.current) {
        // Initialize Happy Birthday Audio
        soundRef.current = new Howl({
          src: [audios.happy],
          loop: true,
          volume: 0.5,
          html5: true, 
          onloaderror: (id, err) => console.log('Audio load error:', err),
          onplayerror: (id, err) => {
            soundRef.current.once('unlock', () => {
              soundRef.current.play();
            });
          }
        });
    }
    
    // Resume audio context inside browser interactions if blocked
    soundRef.current.play();

    return () => {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.unload();
            soundRef.current = null;
        }
    };
  }, [isAuthenticated, navigate]);

  const handleCandleBlow = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setWishQuote(randomQuote);
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 2200);
    }
  };

  const handleParallaxMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleParallaxTouch = (e) => {
    if (!e.touches?.length) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <div className="relative w-full h-screen bg-[#090909] overflow-hidden">
      
      {/* Majestic Palace Background with Ambient Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/056/067/135/small/cheerful-celebration-blue-background-photo.jpg')" }}
          />
          {/* Elegant royal vignette / dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#0f0701]"></div>
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="lux-orb orb-1"></div>
          <div className="lux-orb orb-2"></div>
          <div className="lux-orb orb-3"></div>
      </div>

      {/* Elegant 2D Particles replacing the 3D scene */}
      <div className="absolute inset-0 z-10">
         <FloatingParticles />
      </div>

      {/* Confetti + Sparkle Burst */}
      <AnimatePresence>
        {showBurst && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={`c-${i}`} className="confetti-piece" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 0.3}s` }} />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`s-${i}`} className="sparkle-piece" style={{ left: `${Math.random() * 100}%`, top: `${40 + Math.random() * 40}%`, animationDelay: `${Math.random() * 0.4}s` }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2D Interactive Candle & Cake Stand */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 sm:pb-40 md:pb-32 z-20 pointer-events-none">
          <div className="relative flex flex-col items-center cursor-pointer pointer-events-auto group mt-10" onClick={handleCandleBlow}>
              
              {/* The Flame (Clickable) */}
              <div className="relative w-full flex justify-center h-10 mb-1 z-30">
                  <AnimatePresence>
                      {!candlesBlown && (
                          <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: [1, 1.25, 1], rotate: [0, 3, -3, 0] }}
                              exit={{ scale: 0, opacity: 0, y: -30 }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="w-10 h-16 bg-gradient-to-t from-white via-yellow-400 to-red-500 rounded-[50%_50%_20%_20%] absolute bottom-[-10px] blur-[1px] shadow-[0_0_60px_10px_rgba(255,160,0,0.9)] origin-bottom group-hover:scale-110 transition-transform"
                          >
                             <div className="absolute inset-x-0 bottom-[-5px] h-6 bg-blue-500 rounded-full blur-[4px] opacity-60"></div>
                             <div className="absolute inset-0 bg-white rounded-full blur-[8px] opacity-40 scale-50"></div>
                          </motion.div>
                      )}
                  </AnimatePresence>
              </div>

              {/* The Candle Body */}
              <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-8 h-24 bg-gradient-to-r from-gray-100 via-white to-gray-300 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.6)] relative z-20 border border-gray-100"
              >
                  {/* The Wick */}
                  <div className="w-1.5 h-4 bg-gray-900 absolute -top-4 left-1/2 -translate-x-[50%] rounded-t-full"></div>
                  {/* Wax Drips */}
                  <div className="w-2.5 h-8 bg-white absolute top-0 -left-1 rounded-full shadow-sm"></div>
                  <div className="w-2 h-10 bg-white absolute top-0 right-[-2px] rounded-full shadow-sm"></div>
              </motion.div>

              {/* Elegant Royal 2D Stand */}
              <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="w-40 sm:w-64 h-4 rounded-t-xl bg-gradient-to-b from-[#ebd171] to-[#a68625] shadow-[0_10px_20px_rgba(0,0,0,1)] mt-[-2px] border-b-2 border-yellow-900 z-10"
              >
                 <div className="w-full h-[1px] bg-white opacity-40"></div>
              </motion.div>
              <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="w-32 sm:w-48 h-8 rounded-b-3xl bg-gradient-to-b from-[#8a6d1c] to-[#3a2c08] shadow-inner flex justify-center z-10"
              >
              </motion.div>

          </div>
      </div>

      {/* Foreground UI overlays */}
      <div 
        className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col items-center"
        onMouseMove={handleParallaxMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onTouchMove={handleParallaxTouch}
        onTouchEnd={() => setTilt({ x: 0, y: 0 })}
      >
        
        {/* Decorative Royal Motif */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6"
        ></motion.div>

        <motion.h1 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            style={{ transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)` }}
            className="text-4xl sm:text-5xl md:text-7xl font-cinzel text-center text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#ffdf70] to-[#b89528] drop-shadow-[0_4px_15px_rgba(0,0,0,1)] px-4 leading-tight tracking-wider"
        >
            Happy Birthday<br/><span className="text-3xl sm:text-4xl md:text-6xl text-[#ff4b4b] tracking-[0.2em] font-bold drop-shadow-[0_2px_10px_rgba(255,75,75,0.6)]">Pranga</span>
        </motion.h1>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-6"
        ></motion.div>
        
        <AnimatePresence>
            {!candlesBlown && (
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                    transition={{ duration: 1 }}
                    className="mt-6 md:mt-8 text-xs md:text-sm text-[#ffd700] font-serif italic tracking-widest bg-black/50 backdrop-blur-md px-8 py-3 rounded-full border border-[#d4af37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] text-center mx-4"
                >
                    <motion.span 
                        animate={{ opacity: [0.5, 1, 0.5] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        Tap the candle flame to blow it and make a wish...
                    </motion.span>
                </motion.p>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {candlesBlown && wishQuote && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mt-6 md:mt-8 px-6 md:px-10 py-4 md:py-6 rounded-2xl border border-[#d4af37]/50 bg-black/50 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] max-w-3xl text-center"
                >
                    <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
                        <Crown className="w-5 h-5" />
                        <span className="font-cinzel tracking-[0.35em] text-xs md:text-sm">ROYAL BLESSING</span>
                        <Crown className="w-5 h-5" />
                    </div>
                    <p className="font-serif italic text-[#fff1c1] text-base md:text-xl leading-relaxed">
                        "{wishQuote}"
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Royal Folders Navigation - Unveiled after the wish */}
      <AnimatePresence>
        {candlesBlown && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-[50%] z-30 flex flex-col sm:flex-row gap-5 sm:gap-10 items-center w-full justify-center px-4"
          >
            {/* Gallery Portal */}
            <button 
                onClick={() => navigate('/memories')} 
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xl border border-[#d4af37]/50 hover:border-[#ffd700] rounded-2xl transition-all duration-700 hover:transform hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] w-[85%] sm:w-48 h-28 sm:h-48"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl m-2 pointer-events-none group-hover:m-1 transition-all duration-700"></div>
                
                <Camera className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4 text-[#ffd700] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] group-hover:scale-110 transition-transform duration-500" />
                <span className="font-cinzel text-white group-hover:text-[#ffd700] transition-colors duration-500 text-sm sm:text-xl tracking-[0.2em] font-bold">The Vault</span>
            </button>

            {/* My Love Portal */}
            <button 
                onClick={() => navigate('/mylove')} 
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xl border border-[#ff4b4b]/50 hover:border-[#ff2a2a] rounded-2xl transition-all duration-700 hover:transform hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_40px_rgba(255,75,75,0.4)] w-[85%] sm:w-48 h-28 sm:h-48 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff4b4b]/20 to-[#900000]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl m-2 pointer-events-none group-hover:m-1 transition-all duration-700"></div>
                
                {/* Heart Beat Animation inside */}
                <motion.span 
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="mb-2 sm:mb-4 z-10 drop-shadow-[0_0_20px_rgba(255,42,42,1)]"
                >
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff4b4b]" fill="currentColor" />
                </motion.span>
                
                <span className="font-cinzel text-white group-hover:text-[#ffb3b3] transition-colors duration-500 text-sm sm:text-xl tracking-[0.2em] font-bold z-10 text-center">My Love</span>
            </button>

            {/* Quote Vault Portal */}
            <button 
                onClick={() => navigate('/quotes')} 
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xl border border-[#ffffff]/30 hover:border-[#ffffff]/60 rounded-2xl transition-all duration-700 hover:transform hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)] w-[85%] sm:w-48 h-28 sm:h-48"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl m-2 pointer-events-none group-hover:m-1 transition-all duration-700"></div>
                
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-transform duration-500" />
                <span className="font-cinzel text-white group-hover:text-white transition-colors duration-500 text-sm sm:text-xl tracking-[0.2em] font-bold text-center">Quote Vault</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
