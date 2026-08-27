import React, { memo } from 'react';
import { RocketIllustration } from './RocketIllustration';

export const CtaSection: React.FC = memo(() => (
    <div className="bg-white py-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
            <RocketIllustration />

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight mb-3">
                Ready to grow your business with a<br className="hidden sm:inline" /> digital loyalty card?
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-8">
                Check out the Stamp Me Website today.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#6c5ce7] hover:bg-[#5b4bc4] text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition-colors shadow-sm">
                    Visit website
                </button>
                <button className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition-colors">
                    Request more info
                </button>
            </div>
        </div>
    </div>
));

CtaSection.displayName = 'CtaSection';