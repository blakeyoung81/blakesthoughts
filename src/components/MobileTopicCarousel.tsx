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
    // Use actual filename with spaces - Vercel handles this correctly for static files
    const imageUrl = `/images/topics/${currentTopic}.png`;
    
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
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
            
            {/* Title at top */}
            <div className={`absolute top-4 sm:top-8 left-0 right-0 z-20 text-center transition-opacity duration-500 ${fadeClass} px-6`}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-1 sm:mb-2">
                    Blake's Thoughts
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 drop-shadow-md">
                    {currentTopic}
                </p>
            </div>
            
            {/* Main image in center - positioned to account for title and dots */}
            <div className={`relative z-10 transition-opacity duration-500 ${fadeClass} w-full flex items-center justify-center`} style={{ 
                paddingTop: 'clamp(100px, 15vh, 140px)', 
                paddingBottom: 'clamp(120px, 18vh, 160px)',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                minHeight: 0,
                flex: 1
            }}>
                <img 
                    src={imageUrl} 
                    alt={currentTopic}
                    className="w-auto h-auto object-contain drop-shadow-2xl"
                    style={{ 
                        width: 'auto',
                        height: 'auto',
                        maxWidth: 'min(90vw, 700px)',
                        maxHeight: 'calc(100vh - clamp(220px, 33vh, 300px))', // Responsive calculation for title + dots
                        objectFit: 'contain',
                        display: 'block'
                    }}
                    onError={(e) => {
                        // Try encoded version if original fails
                        const img = e.currentTarget;
                        if (imageUrl.includes(' ') && !imageUrl.includes('%20')) {
                            const encodedUrl = imageUrl.replace(/ /g, '%20');
                            img.src = encodedUrl;
                        } else {
                            img.src = '/images/topics/Default.png';
                        }
                    }}
                />
            </div>
            
            {/* Dots indicator */}
            <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
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
            <div className={`absolute bottom-20 sm:bottom-24 left-0 right-0 z-20 text-center transition-opacity duration-500 ${fadeClass} px-4`}>
                <p className="text-white/60 text-xs sm:text-sm font-medium animate-pulse">
                    Tap arrows or swipe to explore topics
                </p>
            </div>
        </div>
    );
}