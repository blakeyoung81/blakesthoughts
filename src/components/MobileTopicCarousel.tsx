import { useState, useEffect } from 'react';

export function MobileTopicCarousel({ topics = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeClass, setFadeClass] = useState('opacity-100');
    
    // Auto-rotate through topics
    useEffect(() => {
        if (topics.length === 0) return;
        
        const interval = setInterval(() => {
            // Fade out
            setFadeClass('opacity-0');
            
            // Wait for fade out, then change topic and fade in
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % topics.length);
                setFadeClass('opacity-100');
            }, 500);
        }, 3000); // Change every 3 seconds
        
        return () => clearInterval(interval);
    }, [topics]);
    
    if (topics.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
                        Blake's Thoughts
                    </h1>
                    <p className="text-white/80 text-lg">Loading...</p>
                </div>
            </div>
        );
    }
    
    const currentTopic = topics[currentIndex];
    const imageUrl = `/images/topics/${currentTopic}.png`;
    
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 opacity-90"></div>
            
            {/* Topic image with fade effect */}
            <div 
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${fadeClass}`}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.3,
                }}
            ></div>
            
            {/* Main image in center */}
            <div className={`relative z-10 transition-opacity duration-500 ${fadeClass} w-3/4 max-w-md`}>
                <img 
                    src={imageUrl} 
                    alt={currentTopic}
                    className="w-full h-auto drop-shadow-2xl"
                    onError={(e) => {
                        e.currentTarget.src = '/images/topics/Default.png';
                    }}
                />
            </div>
            
            {/* Title at top */}
            <div className={`absolute top-12 left-0 right-0 z-20 text-center transition-opacity duration-500 ${fadeClass} px-6`}>
                <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-2">
                    Blake's Thoughts
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-white/90 drop-shadow-md">
                    {currentTopic}
                </p>
            </div>
            
            {/* Dots indicator */}
            <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center space-x-2">
                {topics.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setFadeClass('opacity-0');
                            setTimeout(() => {
                                setCurrentIndex(index);
                                setFadeClass('opacity-100');
                            }, 500);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'bg-white w-8' 
                                : 'bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Go to ${topics[index]}`}
                    ></button>
                ))}
            </div>
            
            {/* Navigation arrows */}
            <button
                onClick={() => {
                    setFadeClass('opacity-0');
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev - 1 + topics.length) % topics.length);
                        setFadeClass('opacity-100');
                    }, 500);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300"
                aria-label="Previous topic"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            
            <button
                onClick={() => {
                    setFadeClass('opacity-0');
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev + 1) % topics.length);
                        setFadeClass('opacity-100');
                    }, 500);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300"
                aria-label="Next topic"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            
            {/* Tap to explore hint */}
            <div className={`absolute bottom-24 left-0 right-0 z-20 text-center transition-opacity duration-500 ${fadeClass}`}>
                <p className="text-white/60 text-sm font-medium animate-pulse">
                    Tap arrows or swipe to explore topics
                </p>
            </div>
        </div>
    );
}