import { X } from "lucide-react";
import { navigation } from "./navigation";
import SidebarItem from "./sidebarItems";

interface Props {
    open: boolean;
    onClose: () => void;
}

const MobileSidebar = ({
    open,
    onClose,
}: Props) => {
    return (
        <>
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300 lg:hidden ${open
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b p-5">

                    <h1 className="text-xl font-bold text-blue-600">
                        Stampy
                    </h1>

                    <button onClick={onClose}>
                        <X />
                    </button>

                </div>

                <nav className="space-y-2 p-4">

                    {navigation.map((item) => (
                        <SidebarItem
                            key={item.path}
                            {...item}
                            onClick={onClose}
                        />
                    ))}

                </nav>
            </aside>
        </>
    );
};

export default MobileSidebar;