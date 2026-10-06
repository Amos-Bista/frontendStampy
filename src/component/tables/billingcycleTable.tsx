
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
    createdAt?: string;
    updatedAt?: string;
}

const BillingCycleTableSuperAdmin = () => {
    const [billingCycles, setBillingCycles] = useState<BillingCycle[]>(
        []
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBillingCycles();
    }, []);

    async function fetchBillingCycles() {
        try {
            setLoading(true);

            const token =
                localStorage.getItem("superAdminToken");

            if (!token) {
                throw new Error(
                    "Authentication token not found"
                );
            }

            const API_URL = import.meta.env.VITE_API_URL;

            const response = await fetch(
                `${API_URL}/api/v1/billingcycle/get/ `,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token} `,
                    },
                }
            );

            const result = await response.json();

            console.log(
                "Get billing cycles:",
                result
            );

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "Failed to fetch billing cycles"
                );
            }

            // API response:
            // data: [billingCycle, billingCycle, billingCycle]
            setBillingCycles(result.data);
        } catch (error) {
            console.error(
                "Failed to fetch billing cycles:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    const columns: Column<BillingCycle>[] = [
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
            title: "Name",
            render: (row) => (
                <span className="font-medium text-gray-900">
                    {row.name}
                </span>
            ),
        },

        {
            key: "slug",
            title: "Slug",
            render: (row) => (
                <span className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">
                    {row.slug}
                </span>
            ),
        },

        {
            key: "duration",
            title: "Duration",
            render: (row) => (
                <span className="text-gray-700">
                    {row.duration}{" "}
                    {row.durationUnit.toLowerCase()}
                    {row.duration > 1 ? "s" : ""}
                </span>
            ),
        },

        {
            key: "durationUnit",
            title: "Duration Unit",
            render: (row) => (
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    {row.durationUnit}
                </span>
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
                    className={`rounded - full px - 3 py - 1 text - xs font - medium ${row.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        } `}
                >
                    {row.isActive
                        ? "Active"
                        : "Inactive"}
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
                    Billing Cycles
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Manage billing cycles available for
                    Stampy subscription plans.
                </p>
            </div>

            <ReusableTable
                columns={columns}
                data={billingCycles}
                loading={loading}
                emptyMessage="No billing cycles found"
            />
        </div>
    );
};

export default BillingCycleTableSuperAdmin;

