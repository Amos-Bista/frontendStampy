import React, { memo } from 'react';
import type { FooterColumn } from './types';

export const FooterNavGroup: React.FC<FooterColumn> = memo(({ title, links }) => (
    <div className="flex flex-col gap-2.5 text-left">
        <h4 className="text-3xl font-bold text-white tracking-wide mb-1">{title}</h4>
        <ul className="flex flex-col gap-2">
            {links.map((link) => (
                <li key={link.label}>
                    <a
                        href={link.href}
                        className="text-[12px] text-white/80 hover:text-white transition-colors leading-snug block"
                    >
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    </div>
));

FooterNavGroup.displayName = 'FooterNavGroup';