import React from 'react';
import { FeatureBlock } from './FeatureBlock';
import { STATS_DATA, FEATURES_DATA } from './constants';
import { StatCard } from './statcards';

export const LoyaltyStatsSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-12  font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Top Metrics Banner */}
                <div className=" grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16 sm:mb-24 pb-12 border-b border-slate-100">
                    {STATS_DATA.map((stat) => (
                        <StatCard key={stat.id} value={stat.value} label={stat.label} />
                    ))}
                </div>

                {/* Alternating Feature Content */}
                <div className="flex flex-col gap-8 sm:gap-12">
                    {FEATURES_DATA.map((feature) => (
                        <FeatureBlock
                            key={feature.id}
                            id={feature.id}
                            title={feature.title}
                            description={feature.description}
                            imagePosition={feature.imagePosition}
                            illustration={feature.illustration}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LoyaltyStatsSection;