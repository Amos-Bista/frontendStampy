import { memo } from 'react';
import { Logo } from '../../common/logo';
import NavBar from '../../common/navBar';
import InteractivePhoneHero from './interactiveMobile';

// -----------------------------------------------------------------------------
// STATIC DATA HOISTING
// -----------------------------------------------------------------------------


const STAMP_COUNT = 9;

// -----------------------------------------------------------------------------
// OPTIMIZED & RESPONSIVE SUB-COMPONENTS
// -----------------------------------------------------------------------------



type NotificationCardProps = {
    iconBg: string;
    title: string;
    text: string;
    className?: string;
};


const NotificationCard = memo(({ iconBg, title, text, className = "" }: NotificationCardProps) => (
    <div className={`bg-white/95 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 shadow-xl max-w-[200px] sm:max-w-[240px] text-xs border border-white/20 ${className}`}>
        <div className="flex items-center justify-between text-gray-400 mb-1">
            <div className="flex items-center gap-1.5 font-semibold text-[9px] sm:text-[10px] tracking-wider text-gray-600 uppercase">
                <span className={`w-2 h-2 rounded-full ${iconBg}`} />
                {title}
            </div>
            <span className="text-[8px] sm:text-[9px]">now</span>
        </div>
        <p className="text-gray-800 text-[10px] sm:text-[11px] leading-snug font-medium">{text}</p>
    </div>
));
NotificationCard.displayName = 'NotificationCard';

const StampGrid = memo(() => (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-4 px-1 sm:px-2">
        {Array.from({ length: STAMP_COUNT }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ff3b4e] shadow-inner flex items-center justify-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/20" />
                </div>
                <span className="text-[8px] text-gray-400 mt-1 font-mono">12/03</span>
            </div>
        ))}
        {/* 10th Free Reward Slot */}
        <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-dashed border-[#ff3b4e] flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-[#ff3b4e]">
                FREE
            </div>
            <span className="text-[8px] text-gray-400 mt-1 font-mono">10th</span>
        </div>
    </div>
));
StampGrid.displayName = 'StampGrid';

const PhoneMockup = memo(() => (
    <div className="relative mx-auto w-full max-w-[250px] sm:max-w-[280px] my-4 lg:my-0">
        {/* Phone Frame */}
        <div className="relative z-10 bg-slate-900 rounded-[36px] sm:rounded-[40px] p-2.5 sm:p-3 shadow-2xl border-4 border-slate-800">
            <div className="bg-white rounded-[28px] sm:rounded-[30px] overflow-hidden pt-5 sm:pt-6 pb-4 px-3 flex flex-col items-center shadow-inner">
                {/* Notch */}
                <div className="absolute top-4 sm:top-5 w-20 sm:w-24 h-3.5 sm:h-4 bg-slate-900 rounded-b-xl" />

                {/* App Content */}
                <div className="w-full text-center mt-3">
                    <div className="bg-slate-900 text-white py-0.5 px-2.5 rounded text-[8px] sm:text-[9px] font-bold inline-block uppercase tracking-wider mb-2">
                        Fitzrovia
                    </div>
                    <h3 className="text-[11px] sm:text-xs font-extrabold text-slate-800 leading-tight">
                        BUY 9 COFFEES GET 10TH<br />FREE
                    </h3>

                    <StampGrid />

                    <button className="w-full bg-[#ff3b4e] text-white py-2 rounded-lg font-bold text-xs shadow-md active:scale-95 transition-transform">
                        STAMP ME
                    </button>
                </div>

                {/* Carousel indicators */}
                <div className="flex gap-1 mt-3 sm:mt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b4e]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                </div>
            </div>
        </div>

        {/* Floating Overlays tuned for mobile viewports */}
        <NotificationCard
            title="MESSAGES"
            iconBg="bg-green-500"
            text="Happy Birthday from Fitzrovia! Here's a 25% off dining voucher for you."
            className="absolute top-8 -right-4 sm:-right-12 lg:-right-16 z-20 scale-90 sm:scale-100 origin-left"
        />
        <NotificationCard
            title="STAMP ME"
            iconBg="bg-red-500"
            text="Congratulations! You earned a FREE COFFEE at Fitzrovia!"
            className="absolute bottom-10 -left-4 sm:-left-12 lg:-right-20 lg:left-auto z-20 scale-90 sm:scale-100 origin-right lg:origin-left"
        />
    </div>
));
PhoneMockup.displayName = 'PhoneMockup';

// -----------------------------------------------------------------------------
// MAIN HERO COMPONENT
// -----------------------------------------------------------------------------
export default function HeroSection() {
    return (
        <div className="relative bg-[#ff3b4e] text-white overflow-hidden font-sans">
            {/* Header */}
            {/* <header className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between relative z-10">
                <Logo className="h-7 sm:h-8" />

                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    {NAV_ITEMS.map((item) => (
                        <a key={item.label} href={`#${item.label.toLowerCase()}`} className="hover:opacity-80 transition-opacity flex items-center gap-1">
                            {item.label}
                            {item.hasDropdown && <span className="text-xs">▾</span>}
                        </a>
                    ))}
                </nav>

                <button className="bg-white text-slate-900 font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs hover:bg-slate-100 transition-colors shadow-sm">
                    Get in touch
                </button>
            </header> */}
            <NavBar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-20 sm:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
                {/* Left Column Text */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                    <Logo className="h-9 sm:h-10 mb-4 sm:mb-6" />

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 sm:mb-6">
                        A simple and modern alternative to the traditional stamp card
                    </h1>

                    <p className="text-white/90 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg">
                        Our loyalty platform provides small businesses with all the tools and technology needed to strengthen customer loyalty, increase customer retention and grow.
                    </p>

                    <button className="w-full sm:w-auto bg-white text-slate-900 font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md">
                        Visit our Stamp Me website
                    </button>
                </div>

                {/* Right Column Phone Mockup */}
                <div className="relative flex justify-center items-center w-full px-2 sm:px-4">
                    {/* <PhoneMockup /> */}
                    <InteractivePhoneHero />
                </div>
            </main>

            {/* Slanted Bottom Edge */}
            <div
                className="w-full h-12 sm:h-16 bg-white"
                style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
            />
        </div>
    );
}