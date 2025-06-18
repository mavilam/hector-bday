
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface Gift {
  id: number;
  image: string;
  initialText: string;
  revealedText: string;
}

const gifts: Gift[] = [
  {
    id: 1,
    image: "https://25hours-hotels.com/wp-content/uploads/sites/39/2024/09/25hours_copenhagen_neighbourhoof_louisiana.jpg",
    initialText: "¿Una escapada artística?",
    revealedText: "¡Vamos al Louisiana! Un viaje en tren y entradas para que pasemos un día increíble de arte, arquitectura y naturaleza junto al mar."
  },
  {
    id: 2,
    image: "https://cdn.prod.website-files.com/67d0588eac8e396eee987f1b/680644ab9d9b82b39592a124_side-view.jpg",
    initialText: "¿La llave de la ciudad?",
    revealedText: "Una suscripción anual a Donkey Republic. Así siempre tendrás tu bicicleta naranja lista para explorar cada rincón de Copenhague sin límites."
  },
  {
    id: 3,
    image: "https://images.squarespace-cdn.com/content/v1/63d7aa2819640424ad372e8e/1677504155951-KIMF0PCLITFAP7BKEPX2/Harry%2527s_Place_BF3I0435_export.jpg",
    initialText: "¿El mejor bocado de CPH?",
    revealedText: "Un auténtico Flæskestegssandwich del legendario Harry's Place. ¡Considerado el mejor de la ciudad, con chicharrón crujiente y todos los acompañamientos!"
  }
];

const GiftCarousel = () => {
  const [unlockedGifts, setUnlockedGifts] = useState<Set<number>>(new Set());

  const unlockGift = (giftId: number) => {
    setUnlockedGifts(prev => new Set([...prev, giftId]));
  };

  const isUnlocked = (giftId: number) => unlockedGifts.has(giftId);
  const allGiftsUnlocked = unlockedGifts.size === gifts.length;

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Header */}
      <div className="h-screen flex flex-col items-center justify-center snap-start px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-danish-red-500 mb-4 font-montserrat">
            ¡Un regalo para ti!
          </h1>
          <p className="text-lg md:text-xl text-danish-red-700 mb-12 font-medium">
            Desliza hacia arriba para descubrir tus sorpresas
          </p>
          <div className="animate-bounce-gentle">
            <ArrowUp className="w-8 h-8 text-danish-red-500 mx-auto" />
          </div>
        </div>
      </div>

      {/* Gift Slides */}
      {gifts.map((gift, index) => (
        <div
          key={gift.id}
          className="h-screen flex flex-col items-center justify-center snap-start px-6 py-8"
        >
          <div className="w-full max-w-sm mx-auto">
            {/* Gift Image */}
            <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={gift.image}
                alt={`Regalo ${gift.id}`}
                className={`w-full h-64 object-cover transition-all duration-500 ease-out ${
                  isUnlocked(gift.id) ? 'blur-none' : 'blur-xl'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Gift Text */}
            <div className="text-center mb-8">
              <p className="text-lg font-medium text-danish-red-800 leading-relaxed">
                {isUnlocked(gift.id) ? gift.revealedText : gift.initialText}
              </p>
            </div>

            {/* Unlock Button */}
            {!isUnlocked(gift.id) && (
              <div className="text-center">
                <Button
                  onClick={() => unlockGift(gift.id)}
                  className="bg-danish-red-500 hover:bg-danish-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Desbloquear
                </Button>
              </div>
            )}

            {/* Navigation hint for unlocked gifts */}
            {isUnlocked(gift.id) && index < gifts.length - 1 && (
              <div className="text-center mt-8">
                <div className="animate-bounce-gentle">
                  <ArrowUp className="w-6 h-6 text-danish-red-400 mx-auto" />
                </div>
                <p className="text-sm text-danish-red-500 mt-2">¡Sigue deslizando hacia arriba para más sorpresas!</p>
              </div>
            )}

            {/* Navigation hint for last gift when all are unlocked */}
            {isUnlocked(gift.id) && index === gifts.length - 1 && allGiftsUnlocked && (
              <div className="text-center mt-8">
                <div className="animate-bounce-gentle">
                  <ArrowUp className="w-6 h-6 text-danish-red-400 mx-auto" />
                </div>
                <p className="text-sm text-danish-red-500 mt-2">¡Desliza hacia arriba para ver el mensaje final!</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Final Message Slide */}
      {allGiftsUnlocked && (
        <div className="h-screen flex flex-col items-center justify-center snap-start px-6 py-8">
          <div className="w-full max-w-sm mx-auto text-center animate-fade-in">
            <div className="bg-danish-red-50 rounded-2xl p-8 shadow-2xl border border-danish-red-200">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-danish-red-800 font-bold text-2xl mb-4">
                ¡Esas son todas tus sorpresas!
              </h2>
              <p className="text-danish-red-600 text-lg leading-relaxed">
                ¡Espero que te hayan gustado tanto como a mí me gustó prepararlas para ti! ❤️
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCarousel;
