import React, { memo } from 'react';

export interface NavItem {
    label: string;
    hasDropdown: boolean;
}

export interface LogoProps {
    className?: string;
}

export interface NotificationCardProps {
    iconBg: string;
    title: string;
    text: string;
    className?: string;
}

export const Logo: React.FC<LogoProps> = memo(({ className = 'h-8' }) => (
    <div className={`flex items-center gap-2 text-white font-bold tracking-tight text-lg sm:text-xl ${className}`}>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-4 border-white flex items-center justify-center relative">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full translate-x-0.5 sm:translate-x-1" />
        </div>
        <span>stampy<span className="text-[10px] sm:text-xs font-semibold uppercase align-super ml-0.5">NP</span></span>
    </div>
));

Logo.displayName = 'Logo';