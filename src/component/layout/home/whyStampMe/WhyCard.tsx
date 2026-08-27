import React, { memo } from 'react';
import {
    CustomerDataIllustration,
    MarketingIllustration,
    GamificationIllustration,
    IntegrationsIllustration,
} from './FeatureIcons';
import type { WhyCardItem } from './types';

export const WhyCard: React.FC<WhyCardItem> = memo(({ title, description, iconType }) => {
    const renderIllustration = () => {
        switch (iconType) {
            case 'customerData':
                return <CustomerDataIllustration />;
            case 'marketing':
                return <MarketingIllustration />;
            case 'gamification':
                return <GamificationIllustration />;
            case 'integrations':
                return <IntegrationsIllustration />;
        }
    };

    return (
        <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-4">{renderIllustration()}</div>
            <h4 className="text-base font-bold text-slate-900 mb-2">{title}</h4>
            <p className="text-xs text-slate-600 leading-normal">{description}</p>
        </div>
    );
});

WhyCard.displayName = 'WhyCard';