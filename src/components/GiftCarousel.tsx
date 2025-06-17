
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
    initialText: "An artistic getaway?",
    revealedText: "We're going to the Louisiana! A train trip and tickets for us to spend an incredible day of art, architecture, and nature by the sea."
  },
  {
    id: 2,
    image: "https://cdn.prod.website-files.com/67d0588eac8e396eee987f1b/680644ab9d9b82b39592a124_side-view.jpg",
    initialText: "The key to the city?",
    revealedText: "An annual subscription to Donkey Republic. So you'll always have your orange bike ready to explore every corner of Copenhagen without limits."
  },
  {
    id: 3,
    image: "https://images.squarespace-cdn.com/content/v1/63d7aa2819640424ad372e8e/1677504155951-KIMF0PCLITFAP7BKEPX2/Harry%2527s_Place_BF3I0435_export.jpg",
    initialText: "The best bite in CPH?",
    revealedText: "An authentic Flæskestegssandwich from the legendary Harry's Place. Considered the best in the city, with crispy crackling and all the trimmings!"
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
            A gift for you!
          </h1>
          <p className="text-lg md:text-xl text-danish-red-700 mb-12 font-medium">
            Swipe up to discover your surprises
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
                alt={`Gift ${gift.id}`}
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
                  Unlock
                </Button>
              </div>
            )}

            {/* Navigation hint for unlocked gifts */}
            {isUnlocked(gift.id) && index < gifts.length - 1 && (
              <div className="text-center mt-8">
                <div className="animate-bounce-gentle">
                  <ArrowUp className="w-6 h-6 text-danish-red-400 mx-auto" />
                </div>
                <p className="text-sm text-danish-red-500 mt-2">Keep swiping up for more surprises!</p>
              </div>
            )}

            {/* Final message */}
            {isUnlocked(gift.id) && index === gifts.length - 1 && (
              <div className="text-center mt-8 animate-fade-in">
                <div className="bg-danish-red-50 rounded-2xl p-6 shadow-lg border border-danish-red-200">
                  <p className="text-danish-red-800 font-semibold text-lg mb-2">
                    🎉 That's all your surprises!
                  </p>
                  <p className="text-danish-red-600">
                    Hope you loved them as much as I loved preparing them for you! ❤️
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
