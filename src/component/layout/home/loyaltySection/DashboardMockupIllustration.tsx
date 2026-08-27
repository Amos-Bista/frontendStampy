import React, { memo } from 'react';

export const DashboardMockupIllustration: React.FC = memo(() => (
    <div className="relative w-full max-w-[380px] aspect-[4/3] flex items-center justify-center">
        {/* Merchant Web Dashboard Container */}
        <div className="absolute left-0 top-2 w-[280px] h-[190px] bg-white rounded-xl border-2 border-slate-700 shadow-xl overflow-hidden flex">
            {/* Sidebar */}
            <div className="w-16 bg-[#ff3b4e] p-2 flex flex-col gap-2 text-[6px] text-white font-bold">
                <div className="w-full h-3 bg-white/20 rounded mb-2" />
                <div className="w-full h-2 bg-white/30 rounded" />
                <div className="w-full h-2 bg-white/20 rounded" />
                <div className="w-full h-2 bg-white/20 rounded" />
            </div>

            {/* Main Analytics Canvas */}
            <div className="flex-1 p-3 bg-slate-50 flex flex-col justify-between">
                <div className="text-[8px] font-bold text-slate-700">Activity</div>

                {/* Bar Chart Representation */}
                <div className="flex items-end justify-between h-16 px-2 gap-1.5">
                    <div className="w-2.5 h-[60%] bg-[#ff3b4e] rounded-t-sm" />
                    <div className="w-2.5 h-[85%] bg-[#ff3b4e] rounded-t-sm" />
                    <div className="w-2.5 h-[45%] bg-[#ff3b4e] rounded-t-sm" />
                    <div className="w-2.5 h-[95%] bg-[#ff3b4e] rounded-t-sm" />
                    <div className="w-2.5 h-[70%] bg-[#ff3b4e] rounded-t-sm" />
                    <div className="w-2.5 h-[40%] bg-[#ff3b4e] rounded-t-sm" />
                </div>

                {/* Metrics Footer Badges */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-200 text-center text-[7px] text-slate-600 font-semibold">
                    <div>👥 908</div>
                    <div>🎁 6K</div>
                    <div>Stamp 25K</div>
                </div>
            </div>
        </div>

        {/* Overlapping Mobile App */}
        <div className="absolute right-2 bottom-0 w-24 h-44 bg-white rounded-2xl border-2 border-slate-800 p-2 shadow-2xl flex flex-col items-center z-10">
            <div className="w-6 h-1 bg-slate-800 rounded-full mb-2" />
            <div className="w-10 h-4 bg-slate-900 rounded mb-2" />
            <div className="grid grid-cols-3 gap-1 w-full px-1 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#ff3b4e] mx-auto" />
                <div className="w-4 h-4 rounded-full bg-[#ff3b4e] mx-auto" />
                <div className="w-4 h-4 rounded-full bg-[#ff3b4e] mx-auto" />
            </div>
            <div className="w-full h-4 bg-[#ff3b4e] rounded text-[6px] text-white font-bold flex items-center justify-center mt-auto">
                STAMP ME
            </div>
        </div>
    </div>
));

DashboardMockupIllustration.displayName = 'DashboardMockupIllustration';