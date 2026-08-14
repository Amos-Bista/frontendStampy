
export interface Offer {
    _id: string;
    businessId: string;
    title: string;
    description?: string;
    image?: string;
    requiredStamps: number;
    expiryDate?: string | null;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface OfferCardProps {
    offer: Offer;
    onQrClick?: (offer: Offer) => void;
    onEdit?: (offer: Offer) => void;
    onDelete?: (offer: Offer) => void;
}

export default function OfferCard({
    offer,
    onQrClick,
    onEdit,
    onDelete,
}: OfferCardProps) {
    const { title, description, image, requiredStamps, expiryDate, isActive } =
        offer;

    // Format date helper
    const formattedExpiry = expiryDate
        ? new Date(expiryDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "No Expiry";

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
            {/* Top Banner / Image Section */}
            <div className="relative h-44 w-full overflow-hidden bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-white/80">
                        <svg
                            className="h-12 w-12 stroke-current opacity-80"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M21 11.25l-9-6-9 6m18 0v-1.5A2.25 2.25 0 0018.75 6H5.25A2.25 2.25 0 003 8.25v1.5"
                            />
                        </svg>
                        <span className="mt-1 text-xs font-medium tracking-wide">
                            {title}
                        </span>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-sm ${isActive
                            ? "bg-emerald-500/90 text-white"
                            : "bg-rose-500/90 text-white"
                            }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white animate-pulse" : "bg-white/60"
                                }`}
                        />
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                {/* Stamp Badge */}
                <div className="absolute bottom-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                        🎟️ {requiredStamps} {requiredStamps === 1 ? "Stamp" : "Stamps"}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {title}
                </h3>

                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {description || "No description provided."}
                </p>

                {/* Metadata Grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3 text-xs dark:border-gray-800">
                    <div>
                        <span className="text-gray-400 block">Required</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                            {requiredStamps} Stamp{requiredStamps > 1 ? "s" : ""}
                        </span>
                    </div>

                    <div>
                        <span className="text-gray-400 block">Expiry Date</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                            {formattedExpiry}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex items-center justify-between gap-2 border-t border-gray-100 bg-gray-50/50 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
                <button
                    onClick={() => onQrClick?.(offer)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
                >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v3h-2v-3zm3 3h3v5h-2v-3h-1v-2zm-3 2h2v3h-2v-3zm-3-2h2v5h-2v-5z" />
                    </svg>
                    QR Code
                </button>

                <button
                    onClick={() => onEdit?.(offer)}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete?.(offer)}
                    className="rounded-xl border border-transparent bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 transition-all hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/60"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}