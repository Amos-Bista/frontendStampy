import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import OfferCard, { type Offer } from '../component/cards/offerCard';

const API_URL = import.meta.env.VITE_API_URL;

const OfferQR = () => {
    // Read route parameters
    const { businessId, offerId } = useParams<{ businessId: string; offerId: string }>();


    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (offerId) {
            fetchOfferDetails();
        }
    }, [offerId]);

    async function fetchOfferDetails() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${API_URL}/api/v1/offers/${offerId}`);
            setOffer(data.data);
            console.log("Fetched offer:", data.data);
        } catch (err) {
            console.error("Failed to fetch offer details:", err);
        } finally {
            setLoading(false);
        }
    }

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="p-8 text-center text-gray-500">
                Offer details not found.
            </div>
        );
    }

    // const APP_URL = import.meta.env.PHONE_APP_URL || window.location.origin;
    // Generate the customer claim link encoded inside the QR Code
    const targetBusinessId = businessId || offer.businessId;
    const claimUrl = `${window.location.origin}/stamp/${targetBusinessId}/${offer._id}`;
    // const claimUrl = `${APP_URL}/stamp/${targetBusinessId}/${offer._id}`;
    // const claimUrl = `http://192.168.254.14:5173/stamp/${targetBusinessId}/${offer._id}`;



    return (
        <div className="mx-auto max-w-5xl p-6">
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">

                {/* Left Column: Offer Card Preview */}
                <div className="flex flex-col items-center">
                    <h2 className="mb-4 self-start text-xl font-bold text-gray-800 dark:text-white">
                        Offer Preview
                    </h2>
                    <div className="w-full max-w-sm">
                        <OfferCard offer={offer} />
                    </div>
                </div>

                {/* Right Column: Generated QR Code */}
                <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Offer QR Code
                    </h2>
                    <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
                        Customers can scan this code with their camera to claim this stamp.
                    </p>

                    {/* QR Display Container */}
                    <div className="my-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-inner">
                        <QRCode value={claimUrl} size={200} level="H" />
                    </div>

                    {/* Encoded URL */}
                    <p className="w-full truncate rounded-lg bg-gray-50 p-2.5 text-center font-mono text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        {claimUrl}
                    </p>

                    {/* Action Buttons */}
                    <button
                        onClick={handlePrint}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95"
                    >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                        </svg>
                        Print QR Code
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OfferQR;