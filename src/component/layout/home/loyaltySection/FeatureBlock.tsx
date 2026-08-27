import React, { memo } from 'react';
import { DashboardMockupIllustration } from './DashboardMockupIllustration';
import type { FeatureItem } from './types';
import { PaperToAppIllustration } from './papertoAppIllustration';

export const FeatureBlock: React.FC<FeatureItem> = memo(({ title, description, imagePosition, illustration }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 sm:py-16">
        {/* Illustration Container */}
        <div className={`flex justify-center items-center w-full ${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
            {illustration === 'paperToApp' ? <PaperToAppIllustration /> : <DashboardMockupIllustration />}
        </div>

        {/* Text Content Container */}
        <div className={`flex flex-col text-center lg:text-left ${imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4">
                {title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                {description}
            </p>
        </div>
    </div>
));

FeatureBlock.displayName = 'FeatureBlock';