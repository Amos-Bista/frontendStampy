import { LogOut } from "lucide-react";
import { navigation } from "./navigation";
import SidebarItem from "./sidebarItems";
import { useNavigate } from "react-router-dom";



const Sidebar = () => {

    const navigate = useNavigate();


    const handleLogout = () => {
        // Clear authentication/session data
        localStorage.removeItem("authToken");
        localStorage.removeItem("businessId");
        localStorage.removeItem("businessUser");

        // Close sidebar

        // Redirect to login
        navigate("/");
    };


    return (
        <aside className="hidden w-64 border-r bg-white lg:flex lg:flex-col">

            <div className="border-b p-6">

                <h1 className="text-2xl font-bold text-blue-600">
                    Stampy
                </h1>

            </div>

            <nav className="flex-1 space-y-2 p-4">

                {navigation.map((item) => (
                    <SidebarItem
                        key={item.path}
                        {...item}
                    />
                ))}

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
            </nav>
        </aside>
    );
};

export default Sidebar;