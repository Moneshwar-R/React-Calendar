export default function SeasonParticles({ season }) {
    let particles = null;

    if (season === 'rainy') {
        particles = Array.from({ length: 40 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 0.6 + Math.random() * 0.4;
            return (
                <div
                    key={`rain-${i}`}
                    className="absolute w-px bg-gradient-to-b from-transparent to-white/70 animate-rain z-0"
                    style={{
                        left: `${left}%`,
                        top: `-100px`,
                        height: `${30 + Math.random() * 40}px`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`
                    }}
                />
            );
        });
    } else if (season === 'winter') {
        particles = Array.from({ length: 35 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 3 + Math.random() * 4;
            const size = 3 + Math.random() * 4;
            return (
                <div
                    key={`snow-${i}`}
                    className="absolute rounded-full bg-white/90 animate-snow z-0"
                    style={{
                        left: `${left}%`,
                        top: `-20px`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`
                    }}
                />
            )
        });
    } else if (season === 'autumn') {
        particles = Array.from({ length: 25 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 4 + Math.random() * 4;
            const size = 8 + Math.random() * 8;
            const colors = ['bg-orange-500', 'bg-yellow-500', 'bg-red-500', 'bg-orange-600'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
                <div
                    key={`leaf-${i}`}
                    className={`absolute animate-leaf rounded-tl-full rounded-br-md ${color} opacity-80 z-0`}
                    style={{
                        left: `${left}%`,
                        top: `-20px`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`
                    }}
                />
            )
        });
    } else if (season === 'spring') {
        particles = Array.from({ length: 30 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 4;
            const duration = 3 + Math.random() * 4;
            const size = 6 + Math.random() * 8;
            const colors = ['bg-pink-300', 'bg-rose-300', 'bg-pink-200'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
                <div
                    key={`petal-${i}`}
                    className={`absolute animate-petal rounded-full ${color} opacity-80 z-0`}
                    style={{
                        left: `${left}%`,
                        top: `-20px`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`
                    }}
                />
            )
        });
    } else if (season === 'summer') {
        particles = (
            <>
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/40 via-orange-400/20 to-transparent animate-summer-glow mix-blend-overlay z-0"></div>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={`heatwave-${i}`}
                        className="absolute inset-0 animate-heatwave z-0"
                        style={{
                            background: 'linear-gradient(180deg, transparent 0%, rgba(255,200,100,0.15) 50%, transparent 100%)',
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: '4s'
                        }}
                    />
                ))}
            </>
        );
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 overflow-hidden w-full h-full block">
            {particles}
        </div>
    );
}
