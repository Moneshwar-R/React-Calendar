import { useState } from 'react';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotesPanel({ notes, addNote, deleteNote, currentMonth, startDate, endDate, activeNote, selectNote }) {
    const [inputText, setInputText] = useState("");

    const allNotes = Object.values(notes || {}).flat();
    const currentMonthStart = startOfMonth(currentMonth);
    const currentMonthEnd = endOfMonth(currentMonth);

    const monthlyNotes = allNotes.filter(note => {
        if (!note.start) return false;
        const nStart = parseISO(note.start);
        const nEnd = note.end ? parseISO(note.end) : nStart;
        return nStart <= currentMonthEnd && nEnd >= currentMonthStart;
    });

    const handleSave = () => {
        if (!startDate || !inputText.trim()) return;
        addNote(inputText);
        setInputText("");
    };

    return (
        <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col overflow-hidden">
            <h3 className="text-white text-lg font-semibold mb-3 tracking-wide flex justify-between items-center shrink-0">
                <span>Notes - {format(currentMonth, 'MMMM yyyy')}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/80">{monthlyNotes.length} saved</span>
            </h3>

            <div className="flex-1 overflow-y-auto mb-4 pr-1 space-y-3 custom-scrollbar">
                {monthlyNotes.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="h-full flex items-center justify-center"
                    >
                        <span className="text-white/40 font-light text-sm text-center">No notes yet for this month.</span>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        {monthlyNotes.map((note, idx) => {
                            const isActive = activeNote && activeNote.start === note.start && activeNote.end === note.end && activeNote.text === note.text;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 24 }}
                                    key={`${note.start}-${note.end}-${note.text}-${idx}`}
                                    onClick={() => selectNote(note)}
                                    className={`relative p-3 rounded-2xl shadow-sm border border-white/10 transition-all cursor-pointer ${isActive
                                        ? 'bg-indigo-600 shadow-lg shadow-indigo-500/40'
                                        : 'bg-slate-800/80 hover:bg-slate-700/80 hover:shadow-md'
                                        }`}
                                >
                                    <div className={`text-xs font-semibold mb-1 ${isActive ? 'text-indigo-100' : 'text-indigo-300'}`}>
                                        {note.start} {note.end ? ` → ${note.end}` : ''}
                                    </div>
                                    <p className={`text-sm leading-relaxed whitespace-pre-wrap break-words pr-6 ${isActive ? 'text-white' : 'text-white/90'}`}>{note.text}</p>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNote(note); }}
                                        className={`absolute top-2.5 right-2.5 p-1 rounded-full transition-colors ${isActive ? 'hover:bg-indigo-500 text-indigo-200 hover:text-white' : 'hover:bg-slate-600 text-white/50 hover:text-white'}`}
                                        aria-label="Delete note"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                )}
            </div>

            <div className="mt-auto shrink-0 flex flex-col gap-2">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={startDate ? "Write a new note..." : "Select a start date to add notes"}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-white/40"
                    disabled={!startDate}
                />
                <button
                    onClick={handleSave}
                    disabled={!startDate || !inputText.trim()}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 shadow-md"
                >
                    Save Note
                </button>
            </div>
        </div>
    );
}
