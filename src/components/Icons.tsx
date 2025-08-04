import type { FC } from 'react';

// --- UI Icons  ---
export const UserIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const MusicNoteIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l10-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm10-13l-10 3" />
    </svg>
);

export const HomeIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);


// --- NEW & IMPROVED INSTRUMENT ICONS ---

export const PianoIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75zM8.25 19.5V9.75h-3v9.75h3zm4.5 0V9.75h-3v9.75h3zm4.5 0V9.75h-3v9.75h3z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25h.01M12.75 8.25h.01M17.25 8.25h.01"/>
    </svg>
);

export const GuitarIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V7.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 7.5v6.553a2.25 2.25 0 001.632 2.163l1.32.377a1.803 1.803 0 00.99-3.467l-2.31-.66a2.25 2.25 0 01-1.632-2.163V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0119.5 7.5v1.053" />
    </svg>
);

export const DrumsIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.735l-7.662 7.662a2.25 2.25 0 01-3.182 0l-1.5-1.5a2.25 2.25 0 010-3.182l7.662-7.662M18.375 12.735l-1.5-1.5m1.5 1.5l-1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5.25l1.5-1.5m-1.5 1.5l-1.5 1.5" />
    </svg>
);

export const CelloIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.083c-.803.232-1.523.62-2.132 1.158a9.728 9.728 0 00-4.243 8.133 2.25 2.25 0 004.28 1.033 9.728 9.728 0 008.133-4.243c.538-.609.926-1.33 1.158-2.132" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.083 14.25c.232.803.62 1.523 1.158 2.132a9.728 9.728 0 008.133 4.243 2.25 2.25 0 001.033-4.28 9.728 9.728 0 00-4.243-8.133c-.609-.538-1.33-.926-2.132-1.158" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l1.5-1.5" />
    </svg>
);

export const TromboneIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6.75l-4.5 4.5m0 0l-4.5-4.5m4.5 4.5v9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5h.01M9 12h.01M13.5 9h.01M18 13.5h.01M18 9h.01" />
    </svg>
);