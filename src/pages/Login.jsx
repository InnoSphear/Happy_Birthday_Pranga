import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function Login({ setIsAuthenticated }) {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Validate: 20th march and 6th july (ignore years)
    const checkDate = (dString, targetMonth, targetDay) => {
      if (!dString) return false;
      const [year, month, day] = dString.split('-');
      return parseInt(month, 10) === targetMonth && parseInt(day, 10) === targetDay;
    };

    const isDate1Valid1 = checkDate(date1, 3, 20);
    const isDate1Valid2 = checkDate(date1, 7, 6);
    const isDate2Valid1 = checkDate(date2, 3, 20);
    const isDate2Valid2 = checkDate(date2, 7, 6);

    if ((isDate1Valid1 && isDate2Valid2) || (isDate1Valid2 && isDate2Valid1)) {
        setIsAuthenticated(true);
        navigate('/home');
    } else {
        setError(true);
        setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#090909]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#cfad37] opacity-10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="glass p-10 md:p-14 z-10 w-[90%] max-w-md flex flex-col items-center border border-[#d4af37]/30"
      >
        <div className="mb-6 p-4 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">
          <Lock className="w-8 h-8 text-[#d4af37]" />
        </div>
        
        <h1 className="font-cinzel text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ebd171] mb-2 text-center">
            Restricted Vault
        </h1>
        <p className="text-sm font-light text-gray-400 mb-8 text-center italic font-serif">
          Enter the dates that bind the souls.
        </p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold pl-1">Key I</label>
                <input 
                    type="date" 
                    value={date1} 
                    onChange={e => setDate1(e.target.value)}
                    className="input-premium w-full text-center tracking-widest"
                    required 
                />
            </div>
            
            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold pl-1">Key II</label>
                <input 
                    type="date" 
                    value={date2} 
                    onChange={e => setDate2(e.target.value)}
                    className="input-premium w-full text-center tracking-widest"
                    required 
                />
            </div>

            {error && (
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs text-center font-bold tracking-wider mt-2"
                >
                    Keys are incorrect.
                </motion.p>
            )}

            <button type="submit" className="btn-premium mt-4 w-full group relative overflow-hidden">
                <span className="relative z-10">Unlock Memories</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
        </form>
      </motion.div>
    </div>
  );
}
