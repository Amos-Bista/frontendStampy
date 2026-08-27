import type { ReactNode } from 'react';

export interface TopFeature {
    id: string;
    title: string;
    description: string;
    iconType: 'phone' | 'gears' | 'circle';
}

export interface WhyCardItem {
    id: string;
    title: string;
    description: ReactNode;
    iconType: 'customerData' | 'marketing' | 'gamification' | 'integrations';
}