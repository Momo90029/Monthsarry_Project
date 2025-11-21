import React, { useState, useEffect, useRef } from 'react';
import { X, Heart } from 'lucide-react';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LETTER_CONTENT = `Lalangg,

Happy 10th monthsary to us.
I can’t believe how fast time has passed, yet every moment with you still feels new, warm, and special. These ten months have been filled with a lot of memories laughter, lessons, and comfort that I’ll always treasure. 

Thank you for your patience, your honesty, your trust, and the little things you do that makes me who i am. Thank you for choosing me, for staying with me for the rest 10 months, and for letting me love you in the best ways I know how. 

Even though sometimes mag away jud tang duha you still choose to be my company, im sorry, but if ever di na jud ka nako i understand maybe its the best way to take a space na lng jud.

I may not be perfect, but choosing you is my greatest choice that i have. Maong even though these days is medyo alanganin kay tang duha.

Here’s to our 10th month with you.
I love you lang. 

Sincerly yours,
Lalang;

const LoveLetterModal: React.FC<LoveLetterModalProps> = ({ isOpen, onClose }) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsEnvelopeOpen(false);
      setDisplayedText('');
      setShowCursor(true);
    }
  }, [isOpen]);

  // Typing effect
  useEffect(() => {
    if (isEnvelopeOpen) {
      let i = 0;
      const typingSpeed = 40; // ms per char
      
      const timer = setInterval(() => {
        if (i < LETTER_CONTENT.length) {
          setDisplayedText(LETTER_CONTENT.slice(0, i + 1));
          i++;
          
          // Auto scroll to bottom as it types
          if (scrollRef.current) {
             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        } else {
          clearInterval(timer);
          setShowCursor(false);
        }
      }, typingSpeed);

      return () => clearInterval(timer);
    }
  }, [isEnvelopeOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 z-50 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-md"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-2xl">
        
        {!isEnvelopeOpen ? (
          // --- CLOSED ENVELOPE ---
          <div 
            className="cursor-pointer hover:scale-105 transition-transform duration-500 flex flex-col items-center group"
            onClick={() => setIsEnvelopeOpen(true)}
          >
             <div className="relative w-full max-w-md aspect-[3/2] bg-rose-100 shadow-2xl rounded-lg flex items-center justify-center overflow-hidden border-b-4 border-r-4 border-rose-200/50">
                
                {/* Envelope Flaps (CSS Geometry) */}
                <div className="absolute inset-0 border-[140px] md:border-[180px] border-transparent border-b-rose-200 border-r-rose-200 opacity-40 pointer-events-none"></div>
                
                {/* Top Flap */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-rose-300 shadow-md" 
                     style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}></div>

                {/* Wax Seal / Heart Button */}
                <div className="z-10 bg-rose-600 text-white p-4 rounded-full shadow-lg animate-bounce mt-8 border-4 border-rose-100 group-hover:bg-rose-500 transition-colors">
                  <Heart className="w-10 h-10 fill-current" />
                </div>
             </div>
             <p className="text-white text-xl font-serif mt-6 animate-pulse tracking-wider font-bold bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
               Tap to open your letter...
             </p>
          </div>
        ) : (
          // --- OPENED LETTER ---
          <div className="animate-fade-in relative transform transition-all">
             <div 
               ref={scrollRef}
               className="bg-[#fffdfc] w-full rounded-lg shadow-2xl p-6 md:p-12 min-h-[50vh] max-h-[80vh] overflow-y-auto border-8 border-double border-rose-100 relative"
             >
                {/* Paper Texture Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                     style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3rem' }}>
                </div>

                {/* Letter Content */}
                <div className="relative z-10">
                  <p className="font-serif text-gray-800 text-lg md:text-xl leading-8 md:leading-9 whitespace-pre-wrap">
                    {displayedText}
                    {showCursor && <span className="inline-block w-0.5 h-6 bg-rose-500 ml-1 animate-pulse align-middle"></span>}
                  </p>

                  {/* Footer Signature */}
                  {!showCursor && (
                    <div className="mt-12 flex justify-end animate-fade-in">
                       <div className="text-center">
                          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 mx-auto mb-2" />
                          <p className="font-serif italic text-gray-500 text-lg">Yours always</p>
                       </div>
                    </div>
                  )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveLetterModal;