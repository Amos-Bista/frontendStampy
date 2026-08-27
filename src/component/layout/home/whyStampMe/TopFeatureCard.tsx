import React, { memo } from 'react';
import { IconPhone, IconGears, IconCircle } from './FeatureIcons';
import type { TopFeature } from './types';

export const TopFeatureCard: React.FC<TopFeature> = memo(({ title, description, iconType }) => {
    const renderIcon = () => {
        switch (iconType) {
            case 'phone':
                return <IconPhone className="w-12 h-12 text-slate-800" />;
            case 'gears':
                return <IconGears className="w-12 h-12 text-slate-800" />;
            case 'circle':
                return <IconCircle className="w-12 h-12 text-slate-800" />;
        }
    };

    return (
        <div className="flex flex-col items-center text-center px-4 max-w-xs mx-auto">
            <div className="mb-3 p-2 text-slate-800">{renderIcon()}</div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1.5">{title}</h3>
            <p className="text-lg text-slate-600 leading-relaxed">{description}</p>
        </div>
    );
});

TopFeatureCard.displayName = 'TopFeatureCard';