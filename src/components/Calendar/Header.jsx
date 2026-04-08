import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export default function Header({ currentMonth, prevMonth, nextMonth }) {
    return (
        <div className="flex items-center justify-between px-2 mb-6">
            <h2 className="text-2xl font-semibold text-white tracking-wide">
                {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
                <button
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white/80 hover:text-white"
                    aria-label="Previous Month"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white/80 hover:text-white"
                    aria-label="Next Month"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
