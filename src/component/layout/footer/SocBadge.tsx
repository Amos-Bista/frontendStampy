import React, { memo } from 'react';

export const SocBadge: React.FC = memo(() => (
    <div className="bg-white rounded p-2 flex items-center gap-2 max-w-[140px] shadow-sm">
        <div className="w-6 h-6 bg-[#00a884] rounded-sm flex items-center justify-center text-white font-bold text-[8px] tracking-tighter shrink-0">
            SOC
        </div>
        <div className="flex flex-col text-[8px] font-bold text-slate-800 leading-tight">
            <span>AICPA</span>
            <span>SOC 2® | Type 2</span>
        </div>
    </div>
));

SocBadge.displayName = 'SocBadge';