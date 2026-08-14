import { Bell, Menu } from "lucide-react";

interface Props {
    onMenuClick: () => void;
}

const Header = ({
    onMenuClick,
}: Props) => {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b px-6 bg-red-200">

            <div className="flex items-center gap-4">

                <button
                    onClick={onMenuClick}
                    className="lg:hidden"
                >
                    <Menu />
                </button>

                <h2 className="text-xl font-semibold ">
                    Dashboard
                </h2>

            </div>

            <div className="flex items-center gap-5">

                <Bell className="cursor-pointer" />

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        A
                    </div>

                    <div className="hidden md:block">

                        <p className="font-medium">
                            Kisan Ko Bazar
                        </p>

                        <p className="text-sm text-gray-500">
                            Business
                        </p>

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;