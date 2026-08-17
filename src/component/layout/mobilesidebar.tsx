import { X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication/session data
        localStorage.removeItem("authToken");
        localStorage.removeItem("businessId");
        localStorage.removeItem("businessUser");

        // Close sidebar
        onClose();

        // Redirect to login
        navigate("/");
    };

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
                {/* Header */}
                <div className="flex items-center justify-between border-b p-5">
                    <h1 className="text-xl font-bold text-blue-600">
                        Stampy
                    </h1>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex h-[calc(100vh-81px)] flex-col">
                    <nav className="space-y-2 p-4">
                        {navigation.map((item) => (
                            <SidebarItem
                                key={item.path}
                                {...item}
                                onClick={onClose}
                            />
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="mt-auto border-t p-4">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition-all hover:bg-red-50"
                        >
                            <LogOut size={20} />

                            <span className="font-medium">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default MobileSidebar;