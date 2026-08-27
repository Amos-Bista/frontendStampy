import React, { memo } from 'react';

export const PaperToAppIllustration: React.FC = memo(() => (
    <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center">
        {/* Stack of Paper Loyalty Cards */}
        <div className="absolute left-2 bottom-6 w-32 h-20 bg-white rounded-lg border-2 border-slate-700 shadow-md transform -rotate-6 flex flex-col p-2 justify-between">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-[#ff3b4e]" />
                <div className="w-3 h-3 rounded-full bg-[#ff3b4e]" />
            </div>
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
            </div>
        </div>

        {/* Curved Arrow Vector */}
        <svg className="absolute top-4 left-24 w-24 h-16 text-slate-700 stroke-current fill-none" viewBox="0 0 100 60">
            <path d="M 10 50 Q 50 5 90 25" strokeWidth="2" strokeDasharray="4 2" />
            <polygon points="90,25 82,20 84,29" fill="currentColor" />
        </svg>

        {/* Phone Graphic with Stamp Card */}
        <div className="absolute right-4 w-28 h-48 bg-white rounded-2xl border-2 border-slate-800 p-2 shadow-lg flex flex-col items-center">
            <div className="w-8 h-1 bg-slate-800 rounded-full mb-2" />
            <div className="w-12 h-6 border border-dashed border-slate-400 rounded flex items-center justify-center text-[7px] text-slate-400 mb-3">
                YOUR LOGO
            </div>
            <div className="grid grid-cols-3 gap-1.5 w-full px-1">
                <div className="w-5 h-5 rounded-full bg-[#ff3b4e] mx-auto" />
                <div className="w-5 h-5 rounded-full bg-[#ff3b4e] mx-auto" />
                <div className="w-5 h-5 rounded-full bg-[#ff3b4e] mx-auto" />
                <div className="w-5 h-5 rounded-full border border-slate-300 mx-auto" />
                <div className="w-5 h-5 rounded-full border border-slate-300 mx-auto" />
                <div className="w-5 h-5 rounded-full border border-slate-300 mx-auto" />
            </div>
        </div>
    </div>
));

PaperToAppIllustration.displayName = 'PaperToAppIllustration';