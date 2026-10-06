import { useEffect, useState } from "react";
import type { Column } from "../common/resuableTable";
import ReusableTable from "../common/resuableTable";


interface Feature {
    _id: string;
    name: string;
    key: string;
    description: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

const FeatureTableSuperAdmin = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFeatures();
    }, []);

    async function fetchFeatures() {
        try {
            setLoading(true);

            const token = localStorage.getItem("superAdminToken");

            if (!token) {
                throw new Error("Authentication token not found");
            }

            const API_URL = import.meta.env.VITE_API_URL;

            const response = await fetch(
                `${API_URL}/api/v1/features/get`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            console.log("Get features:", result);

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to fetch features"
                );
            }

            // API response:
            // data: [feature, feature, feature]
            setFeatures(result.data);

        } catch (error) {
            console.error("Failed to fetch features:", error);
        } finally {
            setLoading(false);
        }
    }

    const columns: Column<Feature>[] = [
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
            key: "key",
            title: "Key",
            render: (row) => (
                <span className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">
                    {row.key}
                </span>
            ),
        },
        {
            key: "description",
            title: "Description",
            render: (row) => (
                <span className="text-gray-600">
                    {row.description}
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
                    {row.isActive ? "Active" : "Inactive"}
                </span>
            ),
        },
        {
            key: "createdAt",
            title: "Created",
            render: (row) =>
                row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString()
                    : "-",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Features
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Manage features available in the Stampy platform.
                </p>
            </div>

            <ReusableTable
                columns={columns}
                data={features}
                loading={loading}
                emptyMessage="No features found"
            />
        </div>
    );
};

export default FeatureTableSuperAdmin;