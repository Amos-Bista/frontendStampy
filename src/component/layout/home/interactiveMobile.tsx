import { useState, useEffect, useCallback, memo } from 'react';

// -----------------------------------------------------------------------------
// TYPES & CONSTANTS
// -----------------------------------------------------------------------------
interface MousePosition {
    x: number; // Normalized -1 to 1
    y: number; // Normalized -1 to 1
}

const STAMP_DATES = ['12/03', '12/03', '12/03', '12/03', '12/03', '12/03'];

// -----------------------------------------------------------------------------
// SVG ICONS (Direct vector implementation for exact fidelity)
// -----------------------------------------------------------------------------
const GiftIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
));
GiftIcon.displayName = 'GiftIcon';

const PlusIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
));
PlusIcon.displayName = 'PlusIcon';

const ProfileIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
));
ProfileIcon.displayName = 'ProfileIcon';

const InfoIcon = memo(({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
));
InfoIcon.displayName = 'InfoIcon';

const MessageBubbleIcon = memo(() => (
    <div className="w-5 h-5 rounded-full bg-[#34c759] flex items-center justify-center text-white shrink-0 shadow-sm">
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
        </svg>
    </div>
));
MessageBubbleIcon.displayName = 'MessageBubbleIcon';

const StampMeLogoIcon = memo(() => (
    <div className="w-5 h-5 rounded-full bg-[#ff3b4e] flex items-center justify-center text-white shrink-0 shadow-sm relative">
        <div className="w-2.5 h-2.5 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full translate-x-0.5" />
        </div>
    </div>
));
StampMeLogoIcon.displayName = 'StampMeLogoIcon';

// -----------------------------------------------------------------------------
// INTERNAL CARD STAMP GRID COMPONENT
// -----------------------------------------------------------------------------
const LoyaltyCard = memo(() => (
    <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100/80 text-center relative z-10 w-[240px]">
        {/* Vendor Logo Header */}
        <div className="bg-black text-white py-2 px-3 rounded-xl inline-block mx-auto mb-3 shadow-md">
            <span className="font-extrabold text-[11px] tracking-widest block leading-none uppercase">FITZROVIA</span>
            <span className="text-[5px] tracking-widest block opacity-70 mt-0.5 uppercase">CAFÉ & RESTAURANT</span>
        </div>

        {/* Title */}
        <h3 className="font-black text-slate-800 text-[11px] leading-tight tracking-tight uppercase mb-4">
            BUY 9 COFFEES GET 10TH<br />FREE
        </h3>

        {/* Exact 3x3 Stamp Grid Layout */}
        <div className="grid grid-cols-3 gap-y-3 gap-x-2 mb-4 px-1">
            {/* First 6 Stamps with dates */}
            {STAMP_DATES.map((date, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff5a6b] to-[#ff2a3f] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] flex items-center justify-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-white/30" />
                    </div>
                    <span className="text-[8px] text-gray-400 mt-0.5 font-medium">{date}</span>
                </div>
            ))}

            {/* 7th Stamp (Filled, no date) */}
            <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff5a6b] to-[#ff2a3f] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-white/30" />
                </div>
            </div>

            {/* 8th Stamp (Empty Slot) */}
            <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50/50" />
            </div>

            {/* 9th Stamp (Gift Card Reward Icon) */}
            <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full border-2 border-[#ff3b4e] flex items-center justify-center text-[#ff3b4e]">
                    <GiftIcon className="w-4 h-4 stroke-[2]" />
                </div>
            </div>
        </div>

        {/* Card Action Row */}
        <div className="flex items-center justify-between pt-1 gap-2">
            <button className="flex-1 bg-[#ff2a3f] text-white font-black text-xs py-2 px-3 rounded-lg tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all">
                STAMP ME
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1 transition-colors" aria-label="Card details">
                <InfoIcon className="w-4 h-4" />
            </button>
        </div>
    </div>
));
LoyaltyCard.displayName = 'LoyaltyCard';

// -----------------------------------------------------------------------------
// MAIN INTERACTIVE COMPONENT
// -----------------------------------------------------------------------------
export default function InteractivePhoneHero() {
    const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

    // Mouse tracking with window relative normalized positioning (-1 to 1)
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        setMousePos({ x, y });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Dynamic transforms based on mouse coordinates
    const phoneRotateX = 14 - mousePos.y * 12;
    const phoneRotateY = -14 + mousePos.x * 14;
    const phoneRotateZ = -4 + mousePos.x * 2;

    // Differential displacement for floating notifications (3D parallax effect)
    const notif1X = mousePos.x * 24;
    const notif1Y = mousePos.y * 18;

    const notif2X = mousePos.x * 36;
    const notif2Y = mousePos.y * 28;

    return (
        <div className=" w-full bg-[#ff3b4e] flex items-center justify-center  p-6 select-none perspective-[1200px]">
            <div
                className="relative transition-transform duration-200 ease-out transform-style-3d"
                style={{
                    transform: `rotateX(${phoneRotateX}deg) rotateY(${phoneRotateY}deg) rotateZ(${phoneRotateZ}deg)`,
                }}
            >
                {/* ------------------- PHONE MOCKUP FRAME ------------------- */}
                <div className="relative z-10 bg-slate-900 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-slate-800 w-[275px]">
                    {/* Outer Phone Bezel & Hardware Buttons */}
                    <div className="absolute -left-[6px] top-24 w-[3px] h-8 bg-slate-700 rounded-l" />
                    <div className="absolute -left-[6px] top-36 w-[3px] h-12 bg-slate-700 rounded-l" />
                    <div className="absolute -left-[6px] top-52 w-[3px] h-12 bg-slate-700 rounded-l" />
                    <div className="absolute -right-[6px] top-32 w-[3px] h-16 bg-slate-700 rounded-r" />

                    {/* Screen Display */}
                    <div className="bg-white rounded-[34px] overflow-hidden pt-3 pb-4 px-3 flex flex-col items-center relative min-h-[500px]">
                        {/* Top iOS Status Bar */}
                        <div className="w-full flex justify-between items-center px-3 text-[10px] font-semibold text-slate-800 pt-0.5 mb-1 z-20">
                            <div className="flex items-center gap-1">
                                <span>12:15</span>
                                <span className="text-[8px]">◄ Search</span>
                            </div>

                            {/* Camera Notch */}
                            <div className="w-20 h-4 bg-slate-900 rounded-b-xl flex justify-center items-center gap-1.5 px-2">
                                <div className="w-2 h-2 rounded-full bg-slate-800" />
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                            </div>

                            {/* Status Icons */}
                            <div className="flex items-center gap-1 text-[9px]">
                                <span>📶</span>
                                <span>🔋</span>
                            </div>
                        </div>

                        {/* In-App Header Navigation Icons */}
                        <div className="w-full flex items-center justify-between px-2 text-slate-700 my-2 z-10">
                            <GiftIcon className="w-4 h-4" />
                            <PlusIcon className="w-4 h-4" />
                            <ProfileIcon className="w-4 h-4" />
                        </div>

                        {/* Central Card Container */}
                        <div className="my-auto py-2">
                            <LoyaltyCard />
                        </div>

                        {/* Bottom Screen Carousel Dots */}
                        <div className="flex gap-1.5 my-3 z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b4e]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        </div>

                        {/* iOS Home Indicator Bar */}
                        <div className="w-28 h-1 bg-slate-900 rounded-full mt-auto" />
                    </div>
                </div>

                {/* ------------------- FLOATING NOTIFICATION 1 ------------------- */}
                <div
                    className="absolute -right-36 top-28 z-30 transition-transform duration-300 ease-out"
                    style={{
                        transform: `translate3d(${notif1X}px, ${notif1Y}px, 50px)`,
                    }}
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/40 w-[240px]">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                                <MessageBubbleIcon />
                                <span className="font-extrabold text-[10px] text-slate-800 uppercase tracking-wider">MESSAGES</span>
                            </div>
                            <span className="text-[9px] text-gray-400 font-medium">now</span>
                        </div>
                        <p className="text-slate-700 text-[10px] leading-tight font-medium pl-6">
                            Happy Birthday from Fitzrovia!<br />
                            Here's a 25% off dining voucher for you.
                        </p>
                    </div>
                </div>

                {/* ------------------- FLOATING NOTIFICATION 2 ------------------- */}
                <div
                    className="absolute -right-28 bottom-32 z-30 transition-transform duration-300 ease-out"
                    style={{
                        transform: `translate3d(${notif2X}px, ${notif2Y}px, 80px)`,
                    }}
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/40 w-[240px]">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                                <StampMeLogoIcon />
                                <span className="font-extrabold text-[10px] text-slate-800 uppercase tracking-wider">STAMP ME</span>
                            </div>
                            <span className="text-[9px] text-gray-400 font-medium">now</span>
                        </div>
                        <p className="text-slate-700 text-[10px] leading-tight font-medium pl-6">
                            Congratulations! You earned a FREE<br />
                            COFFEE at Fitzrovia!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}