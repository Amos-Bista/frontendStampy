import { navigation } from "./navigation";
import SidebarItem from "./sidebarItems";

const Sidebar = () => {
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

            </nav>
        </aside>
    );
};

export default Sidebar;