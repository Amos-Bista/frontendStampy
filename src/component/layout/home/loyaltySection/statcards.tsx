import React, { memo } from 'react';
import type { StatItem } from './types';

export const StatCard: React.FC<Omit<StatItem, 'id'>> = memo(({ value, label }) => (
    <div className="flex flex-col items-center text-center p-4">
        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#e52e42] tracking-tight mb-2">
            {value}
        </span>
        <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide">
            {label}
        </span>
    </div>
));

StatCard.displayName = 'StatCard';