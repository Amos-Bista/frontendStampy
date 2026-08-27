// import { StatItem, FeatureItem } from './types';

import type { FeatureItem, StatItem } from "./types";

export const STATS_DATA: readonly StatItem[] = [
    { id: 'stamps', value: '5,203,789', label: 'Stamps Issued' },
    { id: 'rewards', value: '371,469', label: 'Rewards Redeemed' },
    { id: 'rating', value: '4.9', label: 'App Store Rating' },
] as const;

export const FEATURES_DATA: readonly FeatureItem[] = [
    {
        id: 'paper-cards',
        title: 'Technology has finally called time on old paper loyalty cards',
        description:
            'The Stamp Me loyalty app links your loyal customers to their transaction, while also allowing your customers to earn and keep track of their loyalty points directly from their smartphone.',
        imagePosition: 'left',
        illustration: 'paperToApp',
    },
    {
        id: 'powerful-platform',
        title: 'Simple stamp card app, powerful loyalty platform',
        description:
            'The Stamp Me app allows your business to understand, engage and communicate directly with your customers, providing you with valuable data and insights into your loyalty activity.',
        imagePosition: 'right',
        illustration: 'dashboard',
    },
] as const;