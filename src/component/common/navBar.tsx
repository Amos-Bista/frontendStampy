import { Logo } from './logo'



const NAV_ITEMS = [
    { label: 'Solutions', hasDropdown: true },
    { label: 'Case Studies', hasDropdown: false },
    { label: 'Blog', hasDropdown: false },
];

const NavBar = () => {
    return (
        <div>
            <header className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between relative z-10">
                <Logo className="h-7 sm:h-8" />

                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    {NAV_ITEMS.map((item) => (
                        <a key={item.label} href={`#${item.label.toLowerCase()}`} className="hover:opacity-80 transition-opacity flex items-center gap-1">
                            {item.label}
                            {item.hasDropdown && <span className="text-xs">▾</span>}
                        </a>
                    ))}
                </nav>

                <a href="/signin">
                    <button

                        className="bg-white text-slate-900 font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs hover:bg-slate-100 transition-colors shadow-sm hover:cursor-pointer">
                        Sign In
                    </button>
                </a>
            </header>
        </div>
    )
}

export default NavBar