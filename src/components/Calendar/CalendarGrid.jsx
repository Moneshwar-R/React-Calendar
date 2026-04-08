import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, addDays } from 'date-fns';
import DayCell from './DayCell';

export default function CalendarGrid({ currentMonth, startDate, endDate, handleDateClick, notes }) {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDateToDisplay = startOfWeek(monthStart);
    const endDateToDisplay = endOfWeek(monthEnd);

    const days = eachDayOfInterval({
        start: startDateToDisplay,
        end: endDateToDisplay,
    });

    // Ensure exactly 42 slots (6 weeks) are populated to guarantee uniform grid sizing across all possible months
    while (days.length < 42) {
        days.push(addDays(days[days.length - 1], 1));
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full">
            <div className="grid grid-cols-7 mb-4 text-center">
                {weekDays.map((dayLabel, idx) => (
                    <div key={idx} className={`text-xs font-semibold tracking-wider uppercase mb-2 ${idx === 0 || idx === 6 ? 'text-red-400 drop-shadow-md' : 'text-white/60'}`}>
                        {dayLabel}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 sm:gap-2">
                {days.map((day, idx) => (
                    <DayCell
                        key={idx}
                        day={day}
                        currentMonth={currentMonth}
                        startDate={startDate}
                        endDate={endDate}
                        onClick={handleDateClick}
                        notes={notes}
                    />
                ))}
            </div>
        </div>
    );
}
