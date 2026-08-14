import { useEffect, useState } from "react";
import type { Column } from "../common/resuableTable";
import axios from "axios";
import ReusableTable from "../common/resuableTable";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://192.168.254.14:5000";

interface Offer {
    _id: string;
    title: string;
    businessId: string;
    description?: string;
    requiredStamps: number;
    expiryDate?: string;
    isActive: boolean;
}

export default function OffersTable() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Simplified state to hold the selected offer ID string directly
    const [offerId, setOfferId] = useState<string>("");
    console.log("Selected Offer ID:", offerId); // Debugging log

    const navigate = useNavigate();
    const businessId = "6891b4d4f5f5d6c32cde1234";

    // 2. Accept the specific offer ID parameter
    const handleNavigate = (selectedOfferId: string) => {
        setOfferId(selectedOfferId); // Set the ID in state

        // Navigate passing both businessId and the selected offer _id
        // (Adjust the path to match your route definition: e.g. /OfferQR/:businessId/:id)
        navigate(`/OfferQR/${businessId}/${selectedOfferId}`, { state: { offerId: selectedOfferId } });
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    async function fetchOffers() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${API_URL}/api/v1/offers/business/${businessId}`);
            setOffers(data.data);
            console.log("Fetched offers:", data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const columns: Column<Offer>[] = [
        {
            key: "title",
            title: "Title",
        },
        {
            key: "requiredStamps",
            title: "Required Stamps",
        },
        {
            title: "Status",
            key: "isActive",
            render: (offer) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${offer.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {offer.isActive ? "Active" : "Inactive"}
                </span>
            ),
        },
        {
            title: "Expiry",
            key: "expiryDate",
            render: (offer) =>
                offer.expiryDate
                    ? new Date(offer.expiryDate).toLocaleDateString()
                    : "-",
        },
        {
            title: "Actions",
            key: "actions",
            render: (offer) => (
                <div className="flex gap-2">
                    {/* 3. Pass offer._id when clicked */}
                    <button
                        onClick={() => handleNavigate(offer._id)}
                        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 transition-colors"
                    >
                        QR
                    </button>
                    <button className="rounded bg-blue-500 px-3 py-1 text-white">
                        Edit
                    </button>
                    <button className="rounded bg-red-500 px-3 py-1 text-white">
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <ReusableTable
            columns={columns}
            data={offers}
            loading={loading}
            emptyMessage="No offers found."
        />
    );
}