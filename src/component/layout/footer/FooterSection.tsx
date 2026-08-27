import React, { memo } from 'react';
import { FOOTER_NAVIGATION } from './constants';
import { FooterNavGroup } from './FooterNavGroup';
import { SocBadge } from './SocBadge';
import { Logo } from '../../common/logo';

export const FooterSection: React.FC = memo(() => (
    <footer className="relative w-full text-white overflow-hidden font-sans mt-12">
        {/* Angled Top Edge Divider */}
        <div
            className="w-full h-12 bg-gradient-to-r from-[#4c1d95] via-[#a21caf] to-[#ff3b4e]"
            style={{ clipPath: 'polygon(0 0, 100% 85%, 100% 100%, 0 100%)' }} />

        {/* Gradient Background Container */}
        <div className="bg-gradient-to-r from-[#4c1d95] via-[#a21caf] to-[#ff3b4e] pt-8 pb-12 px-6 sm:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto my-12">
                {/* Navigation Grid & SOC Badge */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10 items-start">
                    {FOOTER_NAVIGATION.map((column) => (
                        <FooterNavGroup key={column.title} {...column} />
                    ))}

                    <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex lg:justify-end items-start pt-2 lg:pt-0">
                        <SocBadge />
                    </div>
                </div>

                {/* Bottom Bar (Logo, Privacy & Copyright) */}
                <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] text-white/70">
                    <div className="flex items-center gap-6">
                        <Logo className="h-6" />
                        <a href="#privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                    </div>

                    <p>© {new Date().getFullYear()} Stamp Loyalty Solutions</p>
                </div>
            </div>
        </div>
    </footer>
));

FooterSection.displayName = 'FooterSection';