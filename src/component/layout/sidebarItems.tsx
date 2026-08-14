import { NavLink } from "react-router-dom";
import clsx from "clsx";

interface Props {
    title: string;
    path: string;
    icon: React.ElementType;
    onClick?: () => void;
}

const SidebarItem = ({
    title,
    path,
    icon: Icon,
    onClick,
}: Props) => {
    return (
        <NavLink
            to={path}
            onClick={onClick}
            className={({ isActive }) =>
                clsx(
                    "flex items-center gap-3 rounded-lg px-4 py-3 transition-all",
                    isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                )
            }
        >
            <Icon size={20} />

            <span>{title}</span>
        </NavLink>
    );
};

export default SidebarItem;