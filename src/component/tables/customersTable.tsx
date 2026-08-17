import { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable, { type Column } from "../common/resuableTable";

const API_URL = import.meta.env.VITE_API_URL;

interface Customer {
    _id: string;
    fullName: string;
    phone: string;
    email: string;
    profileImage: string;
    totalStamp: number;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function CustomersTable() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        try {
            setLoading(true);

            const token = localStorage.getItem("authToken");

            if (!token) {
                throw new Error("Authentication token not found");
            }

            const response = await fetch(
                `${API_URL}/api/v1/stamps/business/customers`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            console.log(
                "Get Customers According to the business:",
                result
            );

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to fetch customers"
                );
            }

            // IMPORTANT
            setCustomers(result.data.customers);

        } catch (error) {
            console.error("Failed to fetch customers:", error);
        } finally {
            setLoading(false);
        }
    }

    const columns: Column<Customer>[] = [
        {
            key: "fullName",
            title: "Customer Name",
            render: (customer) =>
                customer.fullName ? (
                    customer.fullName
                ) : (
                    <span className="text-gray-400">N/A</span>
                ),
        },
        {
            key: "phone",
            title: "Phone",
        },
        {
            key: "email",
            title: "Email",
            render: (customer) =>
                customer.email ? (
                    customer.email
                ) : (
                    <span className="text-gray-400">-</span>
                ),
        },
        {
            key: "totalStamp",
            title: "Total Stamps",
        },
        {
            key: "isVerified",
            title: "Verified",
            render: (customer) => (
                <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${customer.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {customer.isVerified ? "Verified" : "Pending"}
                </span>
            ),
        },
        {
            key: "isBlocked",
            title: "Status",
            render: (customer) => (
                <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${customer.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {customer.isBlocked ? "Blocked" : "Active"}
                </span>
            ),
        },
        {
            key: "createdAt",
            title: "Joined",
            render: (customer) =>
                new Date(customer.createdAt).toLocaleDateString(),
        },
        {
            key: "actions",
            title: "Actions",
            render: (customer) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => console.log("Edit", customer._id)}
                        className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => console.log("Delete", customer._id)}
                        className="rounded-lg bg-red-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Customers
                </h2>
                <p className="text-sm text-gray-500">
                    Manage all registered customers.
                </p>
            </div>

            <ReusableTable
                columns={columns}
                data={customers}
                loading={loading}
                emptyMessage="No customers found."
            />
        </div>
    );
}