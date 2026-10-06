import { useEffect, useState } from "react";
import type { Column } from "../common/resuableTable";
import ReusableTable from "../common/resuableTable";

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

interface SubscriptionPrice {
    billingCycleId: BillingCycle | null;
    amount: number;
    currency: string;
    _id: string;
}

interface SubscriptionLimit {
    resourceId: Resource | null;
    value: number;
    _id: string;
}

interface SubscriptionPlan {
    _id: string;
    name: string;
    slug: string;
    description: string;
    prices: SubscriptionPrice[];
    featureIds: Feature[];
    limits: SubscriptionLimit[];
    isActive: boolean;
    isPublic: boolean;
    sortOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

const SubscriptionTableSuperAdmin = () => {
    const [plans, setPlans] = useState<
        SubscriptionPlan[]
    >([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);

    async function fetchSubscriptionPlans() {
        try {
            setLoading(true);

            const token =
                localStorage.getItem(
                    "superAdminToken"
                );

            if (!token) {
                throw new Error(
                    "Authentication token not found"
                );
            }

            const API_URL =
                import.meta.env.VITE_API_URL;

            const response = await fetch(
                `${API_URL}/api/v1/subscriptions/plans/get/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result =
                await response.json();

            console.log(
                "Get subscription plans:",
                result
            );

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ||
                    "Failed to fetch subscription plans"
                );
            }

            setPlans(result.data || []);
        } catch (error) {
            console.error(
                "Failed to fetch subscription plans:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    const columns: Column<SubscriptionPlan>[] =
        [
            {
                key: "_id",
                title: "ID",
                render: (row) => (
                    <span className="font-mono text-xs text-gray-500">
                        {row._id}
                    </span>
                ),
            },

            {
                key: "name",
                title: "Plan",
                render: (row) => (
                    <div>
                        <div className="font-semibold text-gray-900">
                            {row.name}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                            {row.slug}
                        </div>
                    </div>
                ),
            },

            {
                key: "description",
                title: "Description",
                render: (row) => (
                    <span className="text-gray-600">
                        {row.description || "-"}
                    </span>
                ),
            },

            {
                key: "prices",
                title: "Prices",
                render: (row) => (
                    <div className="space-y-1">
                        {row.prices &&
                            row.prices.length > 0 ? (
                            row.prices.map(
                                (price) => (
                                    <div
                                        key={
                                            price._id
                                        }
                                        className="whitespace-nowrap"
                                    >
                                        <span className="font-semibold text-gray-900">
                                            {
                                                price.currency
                                            }{" "}
                                            {price.amount.toLocaleString()}
                                        </span>

                                        <span className="ml-1 text-xs text-gray-500">
                                            /
                                            {price
                                                .billingCycleId
                                                ? price
                                                    .billingCycleId
                                                    .name
                                                : "N/A"}
                                        </span>
                                    </div>
                                )
                            )
                        ) : (
                            <span className="text-gray-400">
                                No price
                            </span>
                        )}
                    </div>
                ),
            },

            {
                key: "featureIds",
                title: "Features",
                render: (row) => (
                    <div className="flex max-w-xs flex-wrap gap-1">
                        {row.featureIds &&
                            row.featureIds.length > 0 ? (
                            row.featureIds.map(
                                (feature) => (
                                    <span
                                        key={
                                            feature._id
                                        }
                                        className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700"
                                    >
                                        {
                                            feature.name
                                        }
                                    </span>
                                )
                            )
                        ) : (
                            <span className="text-gray-400">
                                No features
                            </span>
                        )}
                    </div>
                ),
            },

            {
                key: "limits",
                title: "Limits",
                render: (row) => (
                    <div className="space-y-1">
                        {row.limits &&
                            row.limits.length > 0 ? (
                            row.limits.map(
                                (limit) => (
                                    <div
                                        key={
                                            limit._id
                                        }
                                        className="whitespace-nowrap text-sm"
                                    >
                                        <span className="font-medium text-gray-800">
                                            {limit
                                                .resourceId
                                                ? limit
                                                    .resourceId
                                                    .name
                                                : "Unknown"}
                                        </span>

                                        <span className="ml-1 text-gray-500">
                                            :
                                            {limit.value ===
                                                -1
                                                ? " Unlimited"
                                                : ` ${limit.value.toLocaleString()}${limit
                                                    .resourceId
                                                    ?.unit
                                                    ? ` ${limit.resourceId.unit}`
                                                    : ""
                                                }`}
                                        </span>
                                    </div>
                                )
                            )
                        ) : (
                            <span className="text-gray-400">
                                No limits
                            </span>
                        )}
                    </div>
                ),
            },

            {
                key: "sortOrder",
                title: "Sort Order",
                render: (row) => (
                    <span className="text-gray-700">
                        {row.sortOrder}
                    </span>
                ),
            },

            {
                key: "isActive",
                title: "Status",
                render: (row) => (
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${row.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {row.isActive
                            ? "Active"
                            : "Inactive"}
                    </span>
                ),
            },

            {
                key: "isPublic",
                title: "Visibility",
                render: (row) => (
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${row.isPublic
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {row.isPublic
                            ? "Public"
                            : "Private"}
                    </span>
                ),
            },

            {
                key: "createdAt",
                title: "Created",
                render: (row) =>
                    row.createdAt
                        ? new Date(
                            row.createdAt
                        ).toLocaleDateString()
                        : "-",
            },
        ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Subscription Plans
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Manage subscription plans,
                    pricing, features, and resource
                    limits.
                </p>
            </div>

            <ReusableTable
                columns={columns}
                data={plans}
                loading={loading}
                emptyMessage="No subscription plans found"
            />
        </div>
    );
};

export default SubscriptionTableSuperAdmin;