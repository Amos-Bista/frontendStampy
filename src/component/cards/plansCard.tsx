import { useEffect, useState } from "react";

interface BillingCycle {
    _id: string;
    name: string;
    slug: string;
    duration: number;
    durationUnit: string;
    isActive: boolean;
    sortOrder: number;
}

interface Feature {
    _id: string;
    name: string;
    key: string;
    description: string;
    isActive: boolean;
    isPublic: boolean;
    sortOrder: number;
}

interface Resource {
    _id: string;
    name: string;
    key: string;
    description: string;
    unit: string;
    isActive: boolean;
    isPublic: boolean;
    sortOrder: number;
}

interface PlanPrice {
    billingCycleId: BillingCycle | null;
    amount: number;
    currency: string;
    _id: string;
}

interface PlanLimit {
    resourceId: Resource | null;
    value: number;
    _id: string;
}

interface SubscriptionPlan {
    _id: string;
    name: string;
    slug: string;
    description: string;
    prices: PlanPrice[];
    featureIds: Feature[];
    limits: PlanLimit[];
    isActive: boolean;
    isPublic: boolean;
    sortOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

interface SubscriptionApiResponse {
    success: boolean;
    message: string;
    data: SubscriptionPlan[];
}

const PlansCard = () => {
    const [plans, setPlans] = useState<
        SubscriptionPlan[]
    >([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        fetchPlans();
    }, []);

    async function fetchPlans() {
        try {
            setLoading(true);
            setError("");

            const API_URL =
                import.meta.env.VITE_API_URL;
            const token = localStorage.getItem("superAdminToken");

            const response = await fetch(
                `${API_URL}${token ? "/api/v1/subscriptions/plans/get/" : "/api/v1/subscriptions/plans/get/website"}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response:", response);

            const result: SubscriptionApiResponse =
                await response.json();

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ||
                    "Failed to fetch subscription plans"
                );
            }

            const activePlans = (
                result.data || []
            )
                .filter(
                    (plan) =>
                        plan.isActive &&
                        plan.isPublic
                )
                .sort(
                    (a, b) =>
                        a.sortOrder -
                        b.sortOrder
                );

            setPlans(activePlans);
        } catch (error) {
            console.error(
                "Failed to fetch plans:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load plans"
            );
        } finally {
            setLoading(false);
        }
    }

    const formatPrice = (
        amount: number
    ) => {
        return amount.toLocaleString();
    };

    const getPrimaryPrice = (
        plan: SubscriptionPlan
    ) => {
        if (
            !plan.prices ||
            plan.prices.length === 0
        ) {
            return null;
        }

        return [...plan.prices]
            .filter(
                (price) =>
                    price.billingCycleId !==
                    null
            )
            .sort((a, b) => {
                const aOrder =
                    a.billingCycleId
                        ?.sortOrder ?? 999;

                const bOrder =
                    b.billingCycleId
                        ?.sortOrder ?? 999;

                return (
                    aOrder - bOrder
                );
            })[0];
    };

    const getBillingText = (
        price: PlanPrice
    ) => {
        if (!price.billingCycleId) {
            return "";
        }

        const cycle =
            price.billingCycleId;

        if (
            cycle.duration === 1
        ) {
            return `/${cycle.durationUnit.toLowerCase()}`;
        }

        return `/${cycle.duration} ${cycle.durationUnit.toLowerCase()}s`;
    };

    const getPlanFeatures = (
        plan: SubscriptionPlan
    ) => {
        return (plan.featureIds || [])
            .filter(
                (feature) =>
                    feature &&
                    feature.isActive &&
                    feature.isPublic
            )
            .sort(
                (a, b) =>
                    a.sortOrder -
                    b.sortOrder
            );
    };

    const getPlanLimits = (
        plan: SubscriptionPlan
    ) => {
        return (plan.limits || []).filter(
            (limit) =>
                limit &&
                limit.resourceId
        );
    };

    if (loading) {
        return (
            <section className="bg-slate-50 px-4 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-gray-200" />

                        <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="h-[520px] animate-pulse rounded-3xl bg-gray-200"
                                />
                            )
                        )}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-slate-50 px-4 py-16">
                <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                        !
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Unable to load plans
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={fetchPlans}
                        className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    if (plans.length === 0) {
        return (
            <section className="bg-slate-50 px-4 py-16">
                <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900">
                        No plans available
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        There are currently no
                        subscription plans available.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700">
                        Simple Pricing
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Choose the right plan
                        for your business
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                        Start with the features you
                        need and upgrade as your
                        business grows.
                    </p>
                </div>

                {/* Plans */}
                <div
                    className={`grid gap-6 ${plans.length === 1
                        ? "mx-auto max-w-md"
                        : plans.length === 2
                            ? "mx-auto max-w-4xl md:grid-cols-2"
                            : "lg:grid-cols-3"
                        }`}
                >
                    {plans.map(
                        (plan, index) => {
                            const price =
                                getPrimaryPrice(
                                    plan
                                );

                            const features =
                                getPlanFeatures(
                                    plan
                                );

                            const limits =
                                getPlanLimits(
                                    plan
                                );

                            const isPopular =
                                index === 1 &&
                                plans.length >
                                1;

                            return (
                                <div
                                    key={
                                        plan._id
                                    }
                                    className={`relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${isPopular
                                        ? "ring-2 ring-indigo-600"
                                        : "ring-gray-200"
                                        }`}
                                >
                                    {/* Popular badge */}
                                    {isPopular && (
                                        <div className="absolute right-5 top-5">
                                            <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                                                Popular
                                            </span>
                                        </div>
                                    )}

                                    {/* Card Header */}
                                    <div className="p-7 sm:p-8">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {
                                                plan.name
                                            }
                                        </h3>

                                        <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                                            {plan.description ||
                                                "Everything you need to manage your business."}
                                        </p>

                                        {/* Price */}
                                        <div className="mt-7">
                                            {price ? (
                                                <div className="flex items-end gap-1">
                                                    <span className="text-sm font-semibold text-gray-500">
                                                        {
                                                            price.currency
                                                        }
                                                    </span>

                                                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                                                        {formatPrice(
                                                            price.amount
                                                        )}
                                                    </span>

                                                    <span className="mb-1 text-sm text-gray-500">
                                                        {getBillingText(
                                                            price
                                                        )}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="text-3xl font-bold text-gray-900">
                                                    Contact
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            className={`mt-7 w-full rounded-xl px-5 py-3 text-sm font-semibold transition ${isPopular
                                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                                : "bg-gray-900 text-white hover:bg-gray-800"
                                                }`}
                                        >
                                            Get Started
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-100" />

                                    {/* Features */}
                                    <div className="flex-1 p-7 sm:p-8">
                                        {features.length >
                                            0 && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-900">
                                                        Features
                                                    </h4>

                                                    <ul className="mt-4 space-y-3">
                                                        {features.map(
                                                            (
                                                                feature
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        feature._id
                                                                    }
                                                                    className="flex items-start gap-3"
                                                                >
                                                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                                        ✓
                                                                    </span>

                                                                    <span className="text-sm text-gray-600">
                                                                        {
                                                                            feature.name
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                        {/* Limits */}
                                        {limits.length >
                                            0 && (
                                                <div
                                                    className={
                                                        features.length >
                                                            0
                                                            ? "mt-8 border-t border-gray-100 pt-7"
                                                            : ""
                                                    }
                                                >
                                                    <h4 className="text-sm font-semibold text-gray-900">
                                                        Plan
                                                        limits
                                                    </h4>

                                                    <div className="mt-4 space-y-3">
                                                        {limits.map(
                                                            (
                                                                limit
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        limit._id
                                                                    }
                                                                    className="flex items-center justify-between gap-4 text-sm"
                                                                >
                                                                    <span className="text-gray-600">
                                                                        {
                                                                            limit
                                                                                .resourceId
                                                                                ?.name
                                                                        }
                                                                    </span>

                                                                    <span className="font-semibold text-gray-900">
                                                                        {limit.value ===
                                                                            -1
                                                                            ? "Unlimited"
                                                                            : `${limit.value.toLocaleString()} ${limit
                                                                                .resourceId
                                                                                ?.unit ||
                                                                            ""
                                                                            }`}
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {features.length ===
                                            0 &&
                                            limits.length ===
                                            0 && (
                                                <div className="flex h-full items-center justify-center py-10 text-center">
                                                    <p className="text-sm text-gray-400">
                                                        Plan
                                                        details
                                                        coming
                                                        soon.
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
};

export default PlansCard;