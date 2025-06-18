import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface Gift {
  id: number;
  image?: string;
  initialText: string;
  revealedText: string;
  type?: 'gift' | 'final';
}

const gifts: Gift[] = [
  {
    id: 1,
    image: "https://25hours-hotels.com/wp-content/uploads/sites/39/2024/09/25hours_copenhagen_neighbourhoof_louisiana.jpg",
    initialText: "¿Un viaje de un día?",
    revealedText: "¡Vamos al Louisiana Musseum! Un viaje en tren y entradas para pasear ver arte, arquitectura y comer junto al mar.",
    type: 'gift'
  },
  {
    id: 2,
    image: "https://cdn.prod.website-files.com/67d0588eac8e396eee987f1b/680644ab9d9b82b39592a124_side-view.jpg",
    initialText: "¿La llave de la ciudad?",
    revealedText: "Una suscripción semanal a Donkey Republic. No me ha dado tiempo a 'encontrarme' otra bici aún, con esto nos apañamos para tener siempre una disponible.",
    type: 'gift'
  },
  {
    id: 4,
    image: "https://freight.cargo.site/w/3888/q/75/i/e3ade85506ffdd57619f81e45de979a9fdedb078d068bf4fc719807127813a76/image.png",
    initialText: "¿Asia en Dinamarca?",
    revealedText: "Un ramen en Slurp, uno de los mejores ramens de Copenhague. ¡Perfecto para cuando nos llueva!",
    type: 'gift'
  },
  {
    id: 3,
    image: "https://images.squarespace-cdn.com/content/v1/63d7aa2819640424ad372e8e/1677504155951-KIMF0PCLITFAP7BKEPX2/Harry%2527s_Place_BF3I0435_export.jpg",
    initialText: "¿La mejor hamburguesa de CPH?",
    revealedText: "Un  Flæskestegs sandwich de Harry's Place. Aprobado por Obama, la Lonely Planet y por mí. Una hamburguesa de torrezno con pepinillos y salsa de mostaza.",
    type: 'gift'
  },
  // Final message as a separate "gift"
  {
    id: 999,
    initialText: "¡Desbloquea para ver tu mensaje final!",
    revealedText: "",
    type: 'final'
  }
];

const GiftCarousel = () => {
  const [unlockedGifts, setUnlockedGifts] = useState<Set<number>>(new Set());

  const unlockGift = (giftId: number) => {
    setUnlockedGifts(prev => new Set([...prev, giftId]));
  };

  const isUnlocked = (giftId: number) => unlockedGifts.has(giftId);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Header */}
      <div className="h-screen flex flex-col items-center justify-center snap-start px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-danish-red-500 mb-4 font-montserrat">
            ¡Hola! Soy tu regalo de cumpleaños 🎁
          </h1>
          <p className="text-lg md:text-xl text-danish-red-700 mb-12 font-medium">
            Desliza hacia arriba para ver mi contenido.
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
            {/* Only show image for normal gifts */}
            {gift.type !== 'final' && gift.image && (
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
            )}

            {/* Gift Text */}
            <div className="text-center mb-8 whitespace-pre-line">
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

            {/* Navigation hint for unlocked gifts except the last one */}
            {isUnlocked(gift.id) && index < gifts.length - 1 && (
              <div className="text-center mt-8">
                <div className="animate-bounce-gentle">
                  <ArrowUp className="w-6 h-6 text-danish-red-400 mx-auto" />
                </div>
                <p className="text-sm text-danish-red-500 mt-2">¡Sigue deslizando hacia arriba para más cosas!</p>
              </div>
            )}

            {/* Special styling for the final message */}
            {isUnlocked(gift.id) && gift.type === 'final' && (
              <div className="text-center mt-8 animate-fade-in">
                <div className="bg-danish-red-50 rounded-3xl p-10 shadow-2xl border-2 border-danish-red-200 max-w-lg mx-auto">
                  <p className="text-6xl mb-4 leading-none">🇩🇰</p>
                  <p className="text-danish-red-800 font-semibold text-2xl mb-2">
                     Prepara tus outfits y tus Salomon...
                  </p>
                  <p className="text-danish-red-600 text-lg">
                    ¡Te esperamos a finales de julio en CPH!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GiftCarousel;