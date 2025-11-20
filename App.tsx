import React, { useState, useEffect, useRef } from 'react';
import { FlowerType, Memory } from './types';
import Flower from './components/Flower';
import { PhotoGallery } from './components/PhotoGallery';
import { Heart, Calendar, X } from 'lucide-react';
import LoveLetterModal from './components/LoveLetterModal';
import bgMusic from "./assets/Bg_Music/jvke her.mp3";

// Load images dynamically
const imageModules = import.meta.glob<{ default: string }>(
  "./assets/Images/Monthsarry_images/*.{jpg,jpeg,png}",
  { eager: true }
);

const images = Object.values(imageModules).map((m) => m.default);

// Static memories
const STATIC_MEMORIES: Memory[] = [
  {
    id: '1',
    flowerType: FlowerType.ROSE,
    color: '#e11d48',
    imageUrl: images[0],
    caption: 'The belated First Monthsarry was the day I saw your smile',
    date: 'First Monthsarry'
  },
  {
    id: '2',
    flowerType: FlowerType.TULIP,
    color: '#f472b6',
    imageUrl: images[6],
    caption: 'Remember this trip? One of my favorite days with you.',
    date: '3rd Monthsarry'
  },
  {
    id: '3',
    flowerType: FlowerType.DAISY,
    color: '#fbbf24',
    imageUrl: images[7],
    caption: 'You always know how to make me smile.',
    date: 'Month 5'
  },
  {
    id: '4',
    flowerType: FlowerType.SUNFLOWER,
    color: '#f59e0b',
    imageUrl: images[1],
    caption: 'Wala nakay tay Pic sa atong 7th monthsarry lang buts okay ramn pud nako',
    date: '7th Monthsarry'
  },
  {
    id: '5',
    flowerType: FlowerType.LILY,
    color: '#9333ea',
    imageUrl: images[8],
    caption: 'Happy 10th Monthsary Langg! I love you more every single day.',
    date: 'Month 10'
  }
];

const App: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Background music reference
  const audioRef = useRef<HTMLAudioElement>(null);

  // Try autoplay on load
  useEffect(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  // Enable autoplay after ANY user interaction (Chrome fix)
  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }

      window.removeEventListener("click", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };

    window.addEventListener("click", tryPlay);
    window.addEventListener("keydown", tryPlay);
    window.addEventListener("touchstart", tryPlay);

    return () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fff1f2] overflow-x-hidden font-sans text-gray-800">

      {/* Hero Section */}
      <header className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-10 pb-20">
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, #fecdd3 1px, transparent 1px)', 
            backgroundSize: '24px 24px',
            transform: `translateY(${scrollY * 0.3}px)`
          }} 
        />
        
        <div className="z-10 animate-fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/80 backdrop-blur-sm rounded-full text-rose-600 text-sm font-bold tracking-wider uppercase mb-6 shadow-sm border border-rose-200">
            <Calendar className="w-4 h-4" />
            <span>Our Love Story</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight drop-shadow-sm">
            Happy 10th <br/>
            <span className="text-rose-600 italic">Monthsary</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto font-light leading-relaxed mb-8">
            Pick a flower from the garden below to see a special memory.
          </p>

          {/* Heart Button */}
          <div className="relative group">
            <button 
              className="p-4 cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none"
              onClick={() => setIsLetterOpen(true)}
              title="Open Letter"
              aria-label="Open Love Letter"
            >
              <Heart className="w-12 h-12 text-rose-400 animate-bounce fill-rose-100 stroke-[1.5px]" />
            </button>
            
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm text-rose-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/80 px-3 py-1 rounded-full shadow-sm pointer-events-none">
              Read my letter 💌
            </span>
          </div>
        </div>
      </header>

      {/* Bouquet Garden */}
      <main className="max-w-4xl mx-auto px-4 -mt-12 z-20 relative pb-32">
        
        <div className="bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-md rounded-[3rem] border border-white/60 shadow-xl p-6 md:p-12 min-h-[400px] relative">
          
          <div className="flex flex-wrap justify-center items-end gap-2 md:gap-8 min-h-[300px] pt-10">
            {STATIC_MEMORIES.map((memory, index) => (
              <div 
                key={memory.id} 
                className="relative group animate-sway origin-bottom"
                style={{ 
                  animationDelay: `${index * 0.3}s`,
                  zIndex: 10 + index 
                }}
              >
                <div 
                  className="relative transition-transform duration-300 group-hover:-translate-y-6 group-hover:scale-110 cursor-pointer"
                  onClick={() => setSelectedMemory(memory)}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
                    Open Me ❤️
                  </div>

                  <Flower 
                    type={memory.flowerType} 
                    color={memory.color} 
                    className="drop-shadow-2xl w-20 h-40 md:w-24 md:h-48"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-rose-100/50 to-transparent rounded-b-[3rem]"></div>
        </div>

        <div className="mt-24">
          <PhotoGallery memories={STATIC_MEMORIES} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-rose-900 text-rose-100 py-10 text-center relative z-10">
        <p className="font-serif text-2xl italic mb-2">10th Monthsarry</p>
        <p className="text-sm opacity-60 uppercase tracking-widest">Happy Monthsarry Lang💘</p>
        <p>© {new Date().getFullYear()} Omar bin Ayob D. Cadingilan. All rights reserved</p>
      </footer>

      {/* Memory Modal */}
      {selectedMemory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/40 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedMemory(null)}
        >
          <div 
            className="bg-white rounded-2xl p-2 md:p-4 shadow-2xl max-w-lg w-full transform transition-all scale-100 relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMemory(null)}
              className="absolute -top-4 -right-4 bg-white text-rose-500 rounded-full p-2 shadow-lg hover:bg-rose-50 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-rose-50 rounded-xl overflow-hidden">
              <div className="relative aspect-[4/5] md:aspect-video w-full overflow-hidden">
                <img 
                  src={selectedMemory.imageUrl} 
                  alt="Our Memory" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg tracking-wide">{selectedMemory.date}</p>
                </div>
              </div>
              
              <div className="p-6 md:p-8 text-center">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-serif text-gray-800 leading-tight mb-2">
                  {selectedMemory.flowerType === FlowerType.LILY ? "Happy Monthsary!" : "I Remember..."}
                </h3>
                <p className="text-gray-600 text-lg italic font-serif leading-relaxed">
                  "{selectedMemory.caption}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoveLetterModal isOpen={isLetterOpen} onClose={() => setIsLetterOpen(false)} />

      {/* Background Music */}
      <audio ref={audioRef} src={bgMusic} loop autoPlay preload="auto" />
    </div>
  );
};

export default App;
