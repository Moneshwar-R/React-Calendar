import SeasonParticles from './SeasonParticles';

export default function HeroImage({ currentMonth }) {
    // Determine season based on month (0-indexed)
    const month = currentMonth ? currentMonth.getMonth() : new Date().getMonth();

    let season = '';
    let imageUrl = '';
    let title = '';
    let subtitle = '';

    if (month === 11 || month === 0 || month === 1) { // Dec, Jan, Feb
        season = 'winter';
        imageUrl = 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=2669&auto=format&fit=crop';
        title = 'Winter Chill.';
        subtitle = 'Stay cozy and productive.';
    } else if (month >= 2 && month <= 4) { // Mar, Apr, May
        season = 'spring';
        imageUrl = 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=2670&auto=format&fit=crop';
        title = 'Spring Bloom.';
        subtitle = 'Fresh starts and new goals.';
    } else if (month === 5 || month === 6) { // Jun, Jul
        season = 'summer';
        imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop';
        title = 'Summer Vibes.';
        subtitle = 'Chase the sun.';
    } else if (month === 7 || month === 8) { // Aug, Sep (Rainy Season for our purpose)
        season = 'rainy';
        imageUrl = 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop';
        title = 'Rainy Days.';
        subtitle = 'Find focus in the rhythm of rain.';
    } else { // Oct, Nov
        season = 'autumn';
        imageUrl = 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2670&auto=format&fit=crop';
        title = 'Autumn Leaves.';
        subtitle = 'Embrace the change.';
    }

    // Season logic remains, but we remove duplicate particles generation

    return (
        <div className="relative w-full h-full min-h-[200px] rounded-3xl overflow-hidden shadow-2xl bg-slate-800">
            <img
                src={imageUrl}
                alt={`${season} aesthetic theme`}
                key={imageUrl}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 w-full h-full mix-blend-screen drop-shadow-lg">
                <SeasonParticles season={season} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 transition-all duration-500"></div>
            <div className="absolute bottom-6 left-8 z-30">
                <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-2 drop-shadow-lg">
                    {title}
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-light drop-shadow-md leading-relaxed">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}
