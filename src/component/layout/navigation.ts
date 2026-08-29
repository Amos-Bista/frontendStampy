import {
    LayoutDashboard,
    ScanLine,
    Gift,
    Users,
    Ticket,
    Building2,
    Settings,
} from "lucide-react";

export const navigation = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Scan QR",
        path: "/scan",
        icon: ScanLine,
    },
    {
        title: "Offers",
        path: "/offers",
        icon: Gift,
    },
    {
        title: "Customers",
        path: "/customers",
        icon: Users,
    },
    {
        title: "Stamp History",
        path: "/stamps",
        icon: Ticket,
    },
    {
        title: "Business Profile",
        path: "/profile",
        icon: Building2,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: Settings,
    },

];