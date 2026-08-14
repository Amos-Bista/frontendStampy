import React from "react";

export interface Column<T> {
    key: keyof T | string;
    title: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface ReusableTableProps<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
}

function ReusableTable<T>({
    columns,
    data = [],
    loading = false,
    emptyMessage = "No data found",
}: ReusableTableProps<T>) {
    if (loading) {
        return (
            <div className="rounded-xl border bg-white p-8 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.title}
                                    className="px-5 py-4 text-left text-sm font-semibold"
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-10 text-center text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.title}
                                            className="px-5 py-4 text-sm"
                                        >
                                            {column.render
                                                ? column.render(row)
                                                : (row[column.key as keyof T] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReusableTable;