import { isSameDay, isWithinInterval, isSameMonth, format, isWeekend, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { SPECIAL_DAYS } from './specialDays';

export default function DayCell({ day, currentMonth, startDate, endDate, notes, onClick }) {
    const isStart = startDate && isSameDay(day, startDate);
    const isEnd = endDate && isSameDay(day, endDate);
    const isSelected = isStart || isEnd;
    const isBetween = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
    const isCurrentMonth = isSameMonth(day, currentMonth);
    const isWeekDayEnd = isWeekend(day);
    const isToday = isSameDay(day, new Date());
    const specialDay = SPECIAL_DAYS[format(day, 'MM-dd')];

    let hasNote = false;
    if (notes) {
        const allNotes = Object.values(notes).flat();
        hasNote = allNotes.some(note => {
            if (!note.start) return false;
            const nStart = parseISO(note.start);
            if (note.end) {
                const nEnd = parseISO(note.end);
                return isWithinInterval(day, { start: nStart, end: nEnd }) || isSameDay(day, nStart) || isSameDay(day, nEnd);
            }
            return isSameDay(day, nStart);
        });
    }

    let baseStyles = "relative flex items-center justify-center w-full aspect-square rounded-full text-sm font-medium transition-colors cursor-default ";

    if (!isCurrentMonth) {
        baseStyles += "text-white/30 ";
    } else if (isSelected) {
        baseStyles += "bg-white text-indigo-600 shadow-lg ";
    } else if (isBetween) {
        baseStyles += "bg-white/20 text-white ";
    } else {
        if (isWeekDayEnd) {
            baseStyles += "text-red-400 font-bold hover:bg-white/10 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)] ";
        } else {
            baseStyles += "text-white hover:bg-white/10 ";
        }
    }

    if (isToday && !isSelected) {
        baseStyles += "ring-2 ring-indigo-400 ";
    }

    return (
        <motion.div
            whileHover={!isSelected && isCurrentMonth ? { scale: 1.1 } : {}}
            className={`${baseStyles} group`}
            aria-label={format(day, 'PPPP')}
            onClick={() => onClick && onClick(day)}
        >
            <span className="z-10">{format(day, 'd')}</span>

            {specialDay && isCurrentMonth && (
                <>
                    <span className="absolute -top-1 -right-1 text-[10px] leading-none z-30">{specialDay.emoji}</span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg bg-slate-900/95 border border-white/10 text-white text-[10px] whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
                        {specialDay.emoji} {specialDay.name}
                    </div>
                </>
            )}

            {hasNote && (
                <div className="absolute bottom-1.5 md:bottom-2 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] z-20" />
            )}

            {isBetween && !isSelected && (
                <div className="absolute inset-0 bg-white/10 rounded-full scale-95 transform" />
            )}
        </motion.div>
    );
}
