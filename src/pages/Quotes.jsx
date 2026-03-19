import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { quotes } from "../data/assets";

export default function Quotes() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const showNext = () => setCurrentIdx((prev) => (prev + 1) % quotes.length);
  const showPrev = () => setCurrentIdx((prev) => (prev - 1 + quotes.length) % quotes.length);
  const activeQuote = quotes[currentIdx];

  return (
    <div className="relative w-full min-h-screen bg-[#050301] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,215,0,0.12),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,75,75,0.14),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90"></div>

      <header className="relative z-20 w-full flex justify-between items-center p-4 md:p-8">
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-[#d4af37] font-cinzel hover:text-white transition-colors group text-sm md:text-base border border-transparent hover:border-[#d4af37]/50 rounded-full px-3 py-1 md:px-4 md:py-2"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        <div className="flex items-center gap-3 text-[#d4af37]">
          <Sparkles className="w-5 h-5 text-[#ff4b4b]" />
          <span className="font-cinzel tracking-[0.3em] text-xs md:text-sm">QUOTE VAULT</span>
          <Sparkles className="w-5 h-5 text-[#ff4b4b]" />
        </div>
        <div className="w-10"></div>
      </header>

      <main className="relative z-20 w-full flex flex-col items-center gap-8 md:gap-12 px-6 md:px-12 py-12 md:py-20">
        <div className="w-full max-w-4xl flex items-center justify-between">
          <button onClick={showPrev} className="w-12 h-12 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/20 transition" aria-label="Previous quote">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={`quote-${currentIdx}`}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="relative mx-6 md:mx-10 px-6 md:px-10 py-8 md:py-12 rounded-3xl border border-[#d4af37]/50 bg-black/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center"
            >
              <p className="font-serif italic text-[#fff1c1] text-xl md:text-3xl leading-relaxed">
                "{activeQuote}"
              </p>
              <p className="mt-6 text-[#ffb3b3] text-xs uppercase tracking-[0.35em]">
                Happy Birthday Pranga
              </p>
            </motion.div>
          </AnimatePresence>

          <button onClick={showNext} className="w-12 h-12 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/20 transition" aria-label="Next quote">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {quotes.map((q, i) => (
            <button
              key={`mini-${i}`}
              onClick={() => setCurrentIdx(i)}
              className={`text-left p-4 md:p-5 rounded-2xl border transition-all duration-500 ${
                i === currentIdx
                  ? "border-[#d4af37] bg-[#1a1206]/80 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                  : "border-[#d4af37]/30 bg-black/30 hover:border-[#d4af37]/70 hover:bg-black/50"
              }`}
            >
              <p className="font-serif italic text-[#fffbe0] text-sm md:text-base">
                "{q}"
              </p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
