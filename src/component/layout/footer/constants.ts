import type { FooterColumn } from "./types";

export const FOOTER_NAVIGATION: readonly FooterColumn[] = [
    {
        title: 'Solutions',
        links: [
            { label: 'Extract Receipt Analyser', href: '#receipt-analyser' },
            { label: 'Stamp Me Loyalty App', href: '#loyalty-app' },
            { label: 'Custom Solutions', href: '#custom-solutions' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Stamp Loyalty', href: '#about' },
            { label: 'Contact', href: '#contact' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Case Studies', href: '#case-studies' },
            { label: 'Blog', href: '#blog' },
        ],
    },
    {
        title: 'Socials',
        links: [
            { label: 'Facebook', href: 'https://facebook.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
        ],
    },
] as const;