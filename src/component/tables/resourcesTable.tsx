
import { useEffect, useState } from "react";
import type { Column } from "../common/resuableTable";
import ReusableTable from "../common/resuableTable";

interface Resource {
    _id: string;
    name: string;
    key: string;
    description: string;
    unit: string;
    isActive: boolean;
    isPublic: boolean;
    sortOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

const ResourcesTableSuperAdmin = () => {
    const [resources, setResources] = useState<Resource[]>(
        []
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchResources();
    }, []);

    async function fetchResources() {
        try {
            setLoading(true);

            const token =
                localStorage.getItem("superAdminToken");

            if (!token) {
                throw new Error(
                    "Authentication token not found"
                );
            }

            const API_URL =
                import.meta.env.VITE_API_URL;

            const response = await fetch(
                `${API_URL}/api/v1/resources/get/`,
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
                "Get resources:",
                result
            );

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "Failed to fetch resources"
                );
            }

            // API response:
            // data: [resource, resource, resource]
            setResources(result.data);
        } catch (error) {
            console.error(
                "Failed to fetch resources:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    const columns: Column<Resource>[] = [
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
                    {row.description || "-"}
                </span>
            ),
        },

        {
            key: "unit",
            title: "Unit",
            render: (row) => (
                <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    {row.unit || "-"}
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
            key: "isPublic",
            title: "Visibility",
            render: (row) => (
                <span
                    className={`rounded - full px - 3 py - 1 text - xs font - medium ${row.isPublic
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                        } `}
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
                    Resources
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Manage resources used to define
                    subscription plan limits.
                </p>
            </div>

            <ReusableTable
                columns={columns}
                data={resources}
                loading={loading}
                emptyMessage="No resources found"
            />
        </div>
    );
};

export default ResourcesTableSuperAdmin;

