import React, { memo } from 'react';

export const RocketIllustration: React.FC = memo(() => (
    <div className="w-14 h-14 mx-auto mb-4 relative flex items-center justify-center">
        <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
            {/* Rocket Body */}
            <path
                d="M32 8C32 8 46 18 46 36L32 50L18 36C18 18 32 8 32 8Z"
                fill="white"
                stroke="#1e293b"
                strokeWidth="3"
                strokeLinejoin="round"
            />
            {/* Nose Cone */}
            <path
                d="M32 8C32 8 40 14 43 22H21C24 14 32 8 32 8Z"
                fill="#ff3b4e"
                stroke="#1e293b"
                strokeWidth="3"
            />
            {/* Porthole */}
            <circle cx="32" cy="30" r="5" fill="#ff3b4e" stroke="#1e293b" strokeWidth="2.5" />
            {/* Left Fin */}
            <path d="M18 36L10 44V50L18 46V36Z" fill="#ff3b4e" stroke="#1e293b" strokeWidth="3" />
            {/* Right Fin */}
            <path d="M46 36L54 44V50L46 46V36Z" fill="#ff3b4e" stroke="#1e293b" strokeWidth="3" />
            {/* Flame Trails */}
            <path d="M28 50L24 58L32 53L40 58L36 50H28Z" fill="#f59e0b" />
            {/* Speed Lines */}
            <path d="M12 24L6 28" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            {/* Speed Line right */}
            <path d="M52 24L58 28" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </svg>
    </div>
));

RocketIllustration.displayName = 'RocketIllustration';