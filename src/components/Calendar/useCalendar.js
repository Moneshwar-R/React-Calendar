import { useState, useEffect } from 'react';
import { addMonths, subMonths, isBefore, isSameDay, format, parseISO } from 'date-fns';

export function useCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeNote, setActiveNote] = useState(null);
    const [isRangeMode, setIsRangeMode] = useState(false);

    // Load structured notes from localStorage
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem('calendar_structured_notes');
            if (saved) return JSON.parse(saved);
        } catch { }
        return {};
    });

    useEffect(() => {
        localStorage.setItem('calendar_structured_notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = (text) => {
        if (!startDate || !text.trim()) return;
        const monthKey = format(startDate, 'yyyy-MM');
        const startStr = format(startDate, 'yyyy-MM-dd');
        const endStr = endDate ? format(endDate, 'yyyy-MM-dd') : null;

        setNotes(prev => {
            const monthNotes = prev[monthKey] || [];
            return {
                ...prev,
                [monthKey]: [...monthNotes, { start: startStr, end: endStr, text }]
            };
        });
    };

    const selectNote = (note) => {
        if (activeNote && activeNote.start === note.start && activeNote.end === note.end && activeNote.text === note.text) {
            setActiveNote(null);
            setStartDate(null);
            setEndDate(null);
        } else {
            setActiveNote(note);
            setStartDate(parseISO(note.start));
            setEndDate(note.end ? parseISO(note.end) : null);
        }
    };

    const deleteNote = (note) => {
        setNotes(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(key => {
                next[key] = next[key].filter(n => !(n.start === note.start && n.end === note.end && n.text === note.text));
            });
            return next;
        });

        if (activeNote && activeNote.start === note.start && activeNote.end === note.end && activeNote.text === note.text) {
            setActiveNote(null);
            setStartDate(null);
            setEndDate(null);
        }
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const handleDateClick = (day) => {
        if (!isRangeMode) return;
        if (!startDate || (startDate && endDate)) {
            setStartDate(day);
            setEndDate(null);
        } else {
            if (isBefore(day, startDate)) {
                setEndDate(startDate);
                setStartDate(day);
            } else if (isSameDay(day, startDate)) {
                setStartDate(null);
            } else {
                setEndDate(day);
                setIsRangeMode(false);
            }
        }
    };

    return {
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
    };
}
