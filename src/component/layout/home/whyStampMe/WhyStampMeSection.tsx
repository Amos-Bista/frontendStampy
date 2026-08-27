import React from 'react';
import { TOP_FEATURES, WHY_CARDS } from './constants';
import { WhyCard } from './WhyCard';
import { TopFeatureCard } from './TopFeatureCard';

export const WhyStampMeSection: React.FC = () => {
    return (
        <section className="w-full font-sans overflow-hidden">
            {/* Top Banner (Angled Pink Tinted Background) */}
            <div className="bg-[#fff0f2] pt-12 pb-16  sm:px-6 relative">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-54 items-start">
                    {TOP_FEATURES.map((feature) => (
                        <TopFeatureCard key={feature.id} {...feature} />
                    ))}
                </div>
            </div>

            {/* Bottom Cards & Call To Action */}
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    {/* Section Heading */}
                    <div className="text-center my-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
                            Why Stamp Me?
                        </h2>
                        <p className="text-lg sm:text-sm text-slate-500 font-medium">
                            We're more than just a loyalty card app...
                        </p>
                    </div>

                    {/* 4 Feature Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
                        {WHY_CARDS.map((card) => (
                            <WhyCard key={card.id} {...card} />
                        ))}
                    </div>

                    {/* CTA Button */}
                    <button className="bg-[#ff3b4e] text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm hover:bg-[#e03344] transition-colors shadow-sm">
                        Visit the Stamp Me website
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhyStampMeSection;