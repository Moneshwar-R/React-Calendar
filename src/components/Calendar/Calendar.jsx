import Header from './Header';
import CalendarGrid from './CalendarGrid';
import { motion, AnimatePresence } from 'framer-motion';

export default function Calendar({
    currentMonth, startDate, endDate, nextMonth, prevMonth, handleDateClick, setStartDate, setEndDate, notes, isRangeMode, setIsRangeMode
}) {

    return (
        <div className="w-full rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative">
            <Header currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />

            <div style={{ perspective: '1200px' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentMonth.toISOString()}
                        initial={{ rotateX: -90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: 90, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        style={{ originY: 0 }}
                    >
                        <CalendarGrid
                            currentMonth={currentMonth}
                            startDate={startDate}
                            endDate={endDate}
                            handleDateClick={handleDateClick}
                            notes={notes}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => {
                        if (isRangeMode) {
                            setIsRangeMode(false);
                            setStartDate(null);
                            setEndDate(null);
                        } else {
                            setIsRangeMode(true);
                            setStartDate(null);
                            setEndDate(null);
                        }
                    }}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg hover:scale-105 ${
                        isRangeMode
                            ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30'
                            : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30'
                    }`}
                >
                    {isRangeMode ? 'Cancel Selection' : 'Select Date Range'}
                </button>
            </div>

        </div>
    );
}
