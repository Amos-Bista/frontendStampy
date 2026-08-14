import React, { useState } from 'react'
import CreateOffersForm from '../form/createOffersForm'
import OffersTable from '../tables/offersTable';
import CustomersTable from '../tables/customersTable';

const BusinessHome = () => {
    const [showCreateOffer, setShowCreateOffer] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 p-2">
            {!showCreateOffer ? (
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowCreateOffer(true)}
                        className="rounded-xl bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-700 transition"
                    >
                        Create Offer
                    </button>
                </div>
            ) : (
                <CreateOffersForm onClose={() => setShowCreateOffer(false)} />
            )}
            <OffersTable />
            <CustomersTable />
        </div>
    )
}

export default BusinessHome