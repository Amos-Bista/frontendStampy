import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface CustomerStampProgress {
    _id: string;
    offerId: string;
    businessName?: string;
    title: string;
    description?: string;
    image?: string;
    requiredStamps: number;
    currentStamps: number;
    expiryDate?: string | null;
    isCompleted: boolean;
}

export default function CustomerDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerId } = useParams<{ customerId: string }>();

    const [notification, setNotification] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const [stampCards, setStampCards] = useState<CustomerStampProgress[]>([]);
    const [loading, setLoading] = useState(true);

    // Check for notification passed from ClaimStamp redirect
    useEffect(() => {
        if (location.state?.successMessage) {
            setNotification({
                type: "success",
                message: location.state.successMessage,
            });
            window.history.replaceState({}, document.title);
        } else if (location.state?.errorMessage) {
            setNotification({
                type: "error",
                message: location.state.errorMessage,
            });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        if (customerId) {
            fetchCustomerStamps();
        }
    }, [customerId]);

    async function fetchCustomerStamps() {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.get(`${API_URL}/api/v1/stamps/customer/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const rawStamps: any[] = data.data || [];

            // 🟢 GROUP RAW STAMPS BY offerId
            const groupedMap = new Map<string, CustomerStampProgress>();

            rawStamps.forEach((stamp) => {
                // Handle both populated object or string ID
                const offerObj = typeof stamp.offerId === "object" ? stamp.offerId : null;
                const businessObj = typeof stamp.businessId === "object" ? stamp.businessId : null;

                const offerKey = offerObj?._id || stamp.offerId || "default_offer";

                if (!groupedMap.has(offerKey)) {
                    groupedMap.set(offerKey, {
                        _id: offerKey,
                        offerId: offerKey,
                        businessName: businessObj?.businessName || businessObj?.name || stamp.businessName || "Partner Business",
                        title: offerObj?.title || stamp.title || "Stamp Loyalty Card",
                        description: offerObj?.description || stamp.description || "Collect stamps to earn your reward.",
                        requiredStamps: offerObj?.requiredStamps || offerObj?.totalStamps || stamp.requiredStamps || 5,
                        currentStamps: 1,
                        expiryDate: offerObj?.expiryDate || stamp.expiryDate || null,
                        isCompleted: false,
                    });
                } else {
                    const existing = groupedMap.get(offerKey)!;
                    existing.currentStamps += 1;
                    existing.isCompleted = existing.currentStamps >= existing.requiredStamps;
                }
            });

            const groupedCards = Array.from(groupedMap.values());
            setStampCards(groupedCards);
            console.log("Aggregated Stamp Cards:", groupedCards);
        } catch (err) {
            console.error("Failed to load customer stamps", err);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("customerId");
        navigate("/login");
    };

    // Quick Stat Calculations
    const totalStampsEarned = stampCards.reduce(
        (acc, card) => acc + card.currentStamps,
        0
    );
    const rewardsReady = stampCards.filter(
        (card) => card.currentStamps >= card.requiredStamps
    ).length;

    return (
        <div className="min-h-screen bg-gray-50 pb-12 dark:bg-gray-950">
            {/* Top Navbar */}
            <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
                    <div className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-md shadow-blue-500/20">
                            🎟️
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            StampPass
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 pt-6">
                {/* NOTIFICATION BANNER */}
                {notification && (
                    <div
                        className={`mb-6 flex items-center justify-between rounded-2xl p-4 shadow-lg transition-all ${notification.type === "success"
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200"
                            : "border border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/80 dark:text-rose-200"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">
                                {notification.type === "success" ? "🎉" : "⚠️"}
                            </span>
                            <p className="text-sm font-semibold">{notification.message}</p>
                        </div>
                        <button
                            onClick={() => setNotification(null)}
                            className="rounded-lg p-1 text-xs font-bold opacity-60 hover:opacity-100"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Welcome & Stats Summary Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                            Welcome Back! 👋
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Here are your active loyalty cards and reward progress.
                        </p>
                    </div>

                    {/* Quick Stats Badges */}
                    <div className="flex gap-3">
                        <div className="flex flex-1 flex-col rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:w-32">
                            <span className="text-xs font-medium text-gray-400">
                                Total Stamps
                            </span>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                {totalStampsEarned}
                            </span>
                        </div>

                        <div className="flex flex-1 flex-col rounded-2xl border border-amber-100 bg-amber-50/50 p-3.5 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/30 sm:w-32">
                            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                Rewards Ready
                            </span>
                            <span className="text-xl font-bold text-amber-700 dark:text-amber-300">
                                🎁 {rewardsReady}
                            </span>
                        </div>
                    </div>
                </div>

                {/* LOYALTY CARDS GRID */}
                <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                    Your Loyalty Cards
                </h2>

                {loading ? (
                    <div className="flex h-48 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                    </div>
                ) : stampCards.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
                        <span className="text-4xl">📱</span>
                        <h3 className="mt-3 text-base font-semibold text-gray-800 dark:text-white">
                            No Stamps Claimed Yet
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Scan a QR code at any participating merchant to collect your first stamp!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {stampCards.map((card) => {
                            const isReadyToRedeem = card.currentStamps >= card.requiredStamps;

                            return (
                                <div
                                    key={card._id}
                                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900 ${isReadyToRedeem
                                        ? "border-amber-300 ring-2 ring-amber-400/30 dark:border-amber-700"
                                        : "border-gray-100 dark:border-gray-800"
                                        }`}
                                >
                                    {/* Card Header */}
                                    <div>
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                                    {card.businessName}
                                                </span>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {card.title}
                                                </h3>
                                            </div>

                                            {isReadyToRedeem && (
                                                <span className="animate-bounce rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                                                    🎁 Ready!
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* Visual Stamps Grid */}
                                    <div className="my-6">
                                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
                                            <span>Progress</span>
                                            <span>
                                                {card.currentStamps} / {card.requiredStamps} Stamps
                                            </span>
                                        </div>

                                        {/* Stamp Circles */}
                                        <div className="grid grid-cols-5 gap-2.5 rounded-2xl bg-gray-50 p-3.5 dark:bg-gray-800/50">
                                            {Array.from({ length: card.requiredStamps }).map(
                                                (_, index) => {
                                                    const isStamped = index < card.currentStamps;
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`flex aspect-square items-center justify-center rounded-xl transition-all duration-300 ${isStamped
                                                                ? "bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/30 scale-100"
                                                                : "border-2 border-dashed border-gray-300 bg-white text-gray-300 dark:border-gray-700 dark:bg-gray-900"
                                                                }`}
                                                        >
                                                            {isStamped ? (
                                                                <span className="animate-pulse text-base">
                                                                    ⭐
                                                                </span>
                                                            ) : (
                                                                <span className="font-mono text-xs font-medium">
                                                                    {index + 1}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Action Footer */}
                                    <div>
                                        {isReadyToRedeem ? (
                                            <button className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all hover:from-amber-600 hover:to-amber-700 active:scale-95">
                                                🎉 Redeem Free Reward
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-between text-xs text-gray-400">
                                                <span>
                                                    {card.requiredStamps - card.currentStamps} more needed
                                                </span>
                                                <span>
                                                    {card.expiryDate
                                                        ? `Expires ${new Date(card.expiryDate).toLocaleDateString()}`
                                                        : "No expiry"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}