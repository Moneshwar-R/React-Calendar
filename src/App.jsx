import { useCalendar } from './components/Calendar/useCalendar';
import Calendar from './components/Calendar/Calendar';
import NotesPanel from './components/Notes/NotesPanel';
import HeroImage from './components/UI/HeroImage';
import SeasonParticles from './components/UI/SeasonParticles';
import { motion } from 'framer-motion';

export default function App() {
  const {
    currentMonth,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    notes,
    addNote,
    deleteNote,
    activeNote,
    selectNote,
    nextMonth,
    prevMonth,
    handleDateClick,
    isRangeMode,
    setIsRangeMode
  } = useCalendar();

  const month = currentMonth ? currentMonth.getMonth() : new Date().getMonth();
  let season = '';
  if (month === 11 || month === 0 || month === 1) season = 'winter';
  else if (month >= 2 && month <= 4) season = 'spring';
  else if (month === 5 || month === 6) season = 'summer';
  else if (month === 7 || month === 8) season = 'rainy';
  else season = 'autumn';

  return (
    <div className="relative min-h-screen lg:h-screen lg:overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white font-sans flex items-center justify-center p-4 sm:p-4 lg:p-8">
      {/* Global Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-50">
          <SeasonParticles season={season} />
      </div>

      <div className="relative z-10 max-w-6xl w-full h-full max-h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-stretch py-2 lg:py-0">

        {/* Left Column (Hero Image + Notes) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col gap-6 lg:h-full lg:max-h-full overflow-hidden"
        >
          <div className="flex-1 min-h-0 relative rounded-3xl group">
            <HeroImage currentMonth={currentMonth} />
            <div className="absolute inset-0 ring-1 ring-white/20 rounded-3xl pointer-events-none group-hover:ring-white/40 transition-all duration-500"></div>
          </div>
          <div className="shrink-0 h-[300px] lg:h-[350px]">
            <NotesPanel notes={notes} addNote={addNote} deleteNote={deleteNote} activeNote={activeNote} selectNote={selectNote} currentMonth={currentMonth} startDate={startDate} endDate={endDate} />
          </div>
        </motion.div>

        {/* Right Column (Calendar Grid) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-7 flex flex-col items-center justify-center lg:h-full lg:max-h-full"
        >
          <div className="w-full xl:w-11/12 mx-auto">
            <Calendar
              currentMonth={currentMonth}
              startDate={startDate}
              endDate={endDate}
              nextMonth={nextMonth}
              prevMonth={prevMonth}
              handleDateClick={handleDateClick}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              notes={notes}
              isRangeMode={isRangeMode}
              setIsRangeMode={setIsRangeMode}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
