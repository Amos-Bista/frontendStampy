import { memo } from 'react';

export const IconPhone = memo(({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
));
IconPhone.displayName = 'IconPhone';

export const IconGears = memo(({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
));
IconGears.displayName = 'IconGears';

export const IconCircle = memo(({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
    </svg>
));
IconCircle.displayName = 'IconCircle';

// Graphic Vector Illustrations for the Cards
export const CustomerDataIllustration = memo(() => (
    <div className="w-24 h-24 relative flex items-center justify-center">
        <div className="w-14 h-14 bg-teal-100/70 rounded-full flex items-center justify-center border-2 border-slate-700">
            <svg className="w-8 h-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-white rounded-full border-2 border-slate-700 flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="6" />
                <line x1="21" y1="21" x2="15.5" y2="15.5" />
            </svg>
        </div>
    </div>
));
CustomerDataIllustration.displayName = 'CustomerDataIllustration';

export const MarketingIllustration = memo(() => (
    <div className="w-24 h-24 relative flex items-center justify-center">
        <div className="w-14 h-20 bg-pink-100/80 rounded-xl border-2 border-slate-700 p-1 flex flex-col justify-between">
            <div className="w-6 h-1 bg-slate-700 rounded-full mx-auto" />
            <div className="w-full h-3 bg-pink-200 rounded" />
        </div>
        <div className="absolute top-1 -left-1 w-7 h-7 bg-white rounded-lg border-2 border-slate-700 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
        </div>
        <div className="absolute bottom-2 -right-1 w-8 h-8 bg-pink-400 rounded-full border-2 border-slate-700 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
        </div>
    </div>
));
MarketingIllustration.displayName = 'MarketingIllustration';

export const GamificationIllustration = memo(() => (
    <div className="w-24 h-24 relative flex items-center justify-center">
        <div className="w-16 h-16 bg-slate-200/80 rounded-2xl border-2 border-slate-700 flex items-center justify-center relative">
            <svg className="w-10 h-10 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
                <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pb-2">
                <span className="text-yellow-500 text-xs">★</span>
            </div>
        </div>
    </div>
));
GamificationIllustration.displayName = 'GamificationIllustration';

export const IntegrationsIllustration = memo(() => (
    <div className="w-24 h-24 relative flex items-center justify-center">
        <div className="w-full h-full relative">
            <div className="absolute top-2 left-2 w-6 h-6 bg-amber-300 rounded-full border-2 border-slate-700" />
            <div className="absolute top-2 right-2 w-7 h-7 bg-amber-400 rounded-full border-2 border-slate-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-200 rounded-full border-2 border-slate-700" />
            <div className="absolute bottom-2 left-3 w-5 h-5 bg-amber-400 rounded-full border-2 border-slate-700" />
            <div className="absolute bottom-2 right-2 w-7 h-7 bg-amber-300 rounded-full border-2 border-slate-700" />
            <svg className="absolute inset-0 w-full h-full stroke-slate-700 -z-10" strokeWidth="1.5">
                <line x1="20" y1="20" x2="48" y2="48" />
                <line x1="75" y1="20" x2="48" y2="48" />
                <line x1="25" y1="75" x2="48" y2="48" />
                <line x1="75" y1="75" x2="48" y2="48" />
            </svg>
        </div>
    </div>
));
IntegrationsIllustration.displayName = 'IntegrationsIllustration';